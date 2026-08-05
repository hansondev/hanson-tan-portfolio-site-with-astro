'use client';

import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import SearchModal from '@/components/ui/SearchModal';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { forwardRef } from 'react';

interface NavItem {
  id: string;
  title: string;
  url?: string;
  children?: NavItem[];
}

interface NavigationBarProps {
  navigation: {
    items: NavItem[];
  };
}

const NavigationBar = forwardRef<HTMLElement, NavigationBarProps>(({ navigation }, ref) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleResize = () => setMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    window.addEventListener('popstate', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handleResize);
    };
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-[60] w-full bg-background text-foreground">
      <Container className="flex items-center justify-between p-4">
        <a href="/" className="flex-shrink-0">
          <span className="text-xl font-bold text-sky">Hanson.Tan</span>
        </a>
        <nav className="flex items-center gap-4">
          <SearchModal />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-6">
              {navigation?.items?.map((section) => (
                <NavigationMenuItem key={section.id}>
                  {section.children?.length ? (
                    <>
                      <NavigationMenuTrigger className="font-heading text-nav focus:outline-none">
                        <span className="font-heading text-nav">{section.title}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-background">
                        <ul className="flex flex-col gap-2 p-4 w-[200px] bg-popover">
                          {section.children.map((child) => (
                            <li key={child.id}>
                              <NavigationMenuLink
                                href={child.url || '#'}
                                className="font-heading text-nav block w-full p-2 rounded-md hover:text-accent"
                              >
                                {child.title}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink href={section.url || '#'} className="font-heading text-nav">
                      {section.title}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>

          <div className="flex md:hidden">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  className="dark:text-white dark:hover:text-accent"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="top-full w-screen max-w-full p-6 shadow-md bg-background z-50">
                <div className="flex flex-col gap-4" id="mobile-navigation">
                  {navigation?.items?.map((section) => (
                    <div key={section.id}>
                      {section.children?.length ? (
                        <Collapsible open={openSections[section.id]} onOpenChange={() => toggleSection(section.id)}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full font-heading text-nav hover:text-accent">
                            <span>{section.title}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections[section.id] ? 'rotate-180' : ''}`} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="ml-4 mt-2 flex flex-col gap-2">
                            {section.children.map((child) => (
                              <a key={child.id} href={child.url || '#'} className="font-heading text-nav" onClick={handleLinkClick}>
                                {child.title}
                              </a>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a href={section.url || '#'} className="font-heading text-nav" onClick={handleLinkClick}>
                          {section.title}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
});

NavigationBar.displayName = 'NavigationBar';
export default NavigationBar;
