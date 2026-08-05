import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';
import Text from '@/components/ui/Text';

interface RichTextProps {
  data: {
    id: string;
    tagline?: string;
    headline?: string;
    content?: string;
    alignment?: 'left' | 'center' | 'right';
  };
  className?: string;
}

const RichText = ({ data, className }: RichTextProps) => {
  const { tagline, headline, content, alignment = 'left' } = data;

  return (
    <div className={`mx-auto max-w-[600px] space-y-6 text-${alignment} ${className}`}>
      {tagline && <Tagline tagline={tagline} />}
      {headline && <Headline headline={headline} />}
      {content && <Text content={content} />}
    </div>
  );
};

export default RichText;
