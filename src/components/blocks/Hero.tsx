import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';
import BaseText from '@/components/ui/Text';
import ButtonGroup from '@/components/blocks/ButtonGroup';
import { cn } from '@/lib/utils';

type LayoutOption = 'image_left' | 'image_center' | 'image_right';

interface HeroProps {
  data: {
    id: string;
    tagline: string;
    headline: string;
    description: string;
    layout: LayoutOption;
    image: string;
    button_group?: {
      id: string;
      buttons?: import('@/components/blocks/Button').ButtonProps[];
    };
  };
}

const layoutStyles = {
  image_center: {
    layout: 'items-center text-center',
    content: 'md:w-3/4 xl:w-2/3 items-center',
    image: 'md:w-3/4 xl:w-2/3 h-[400px]',
  },
  image_left: {
    layout: 'md:flex-row-reverse items-center',
    content: 'md:w-1/2 items-start',
    image: 'md:w-1/2 h-[562px]',
  },
  image_right: {
    layout: 'md:flex-row items-center',
    content: 'md:w-1/2 items-start',
    image: 'md:w-1/2 h-[562px]',
  },
};

export default function Hero({ data }: HeroProps) {
  const { layout, tagline, headline, description, image, button_group } = data;
  const styles = layoutStyles[layout] ?? layoutStyles.image_left;
  const hasButtons = !!button_group?.buttons?.length;

  return (
    <section
      className={cn('relative w-full mx-auto flex flex-col gap-6 md:gap-12', styles.layout)}
      aria-label={headline || 'Hero'}
    >
      <div className={cn('flex flex-col gap-4 w-full', styles.content)}>
        <Tagline tagline={tagline} />
        <Headline headline={headline} />
        {description && <BaseText content={description} />}
        {hasButtons && (
          <div className={cn(layout === 'image_center' && 'flex justify-center', 'mt-6')}>
            <ButtonGroup buttons={button_group!.buttons!} />
          </div>
        )}
      </div>
      {image && (
        <div className={cn('relative w-full', styles.image)}>
          <img
            src={image}
            alt={tagline || headline || 'Hero Image'}
            className="object-contain w-full h-full"
          />
        </div>
      )}
    </section>
  );
}
