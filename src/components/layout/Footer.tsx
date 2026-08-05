'use client';

import { forwardRef } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Container from '@/components/ui/Container';
import SocialIcon from '@/components/ui/SocialIcon';

interface SocialLink {
  service: string;
  url: string;
}

interface NavItem {
  id: string;
  title: string;
  url?: string;
}

interface FooterProps {
  navigation: { items: NavItem[] };
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ navigation }, ref) => {
  return (
    <footer ref={ref} className="bg-gray dark:bg-[var(--background-variant-color)] py-16">
      <Container className="text-foreground dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-8">
          <div className="flex-1">
            <a href="/" className="inline-block transition-opacity hover:opacity-70">
              <span className="text-xl font-bold text-sky">Hanson.Tan</span>
            </a>
            <p className="text-description mt-2">
              AI-Powered Full-Stack Digital Marketing Specialist
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end flex-1">
            <nav className="w-full md:w-auto text-left">
              <ul className="space-y-4">
                {navigation?.items?.map((group) => (
                  <li key={group.title}>
                    <a href={group.url || '#'} className="text-nav font-medium hover:underline">
                      {group.title}
                    </a>
                  </li>
                ))}
                <li><ThemeToggle className="dark:text-white" /></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center text-sm text-[var(--muted-color)]">
          &copy; {new Date().getFullYear()} Hanson Tan Boon Hong — Built with code, AI agents, and performance data.
        </div>
      </Container>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
