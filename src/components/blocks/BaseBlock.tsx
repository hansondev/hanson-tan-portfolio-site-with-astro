import Form from './Form';
import Gallery from './Gallery';
import Hero from './Hero';
import RichText from './RichText';
import Pricing from './Pricing';
import Stats from './Stats';
import SkillsGrid from './SkillsGrid';
import Process from './Process';

interface BaseBlockProps {
  block: {
    collection: string;
    item: Record<string, unknown>;
  };
}

export default function BaseBlock({ block }: BaseBlockProps) {
  if (!block.collection || !block.item) return null;

  const components: Record<string, React.ElementType> = {
    block_hero: Hero,
    block_gallery: Gallery,
    block_form: Form,
    block_richtext: RichText,
    block_pricing: Pricing,
    block_stats: Stats,
    block_skills: SkillsGrid,
    block_process: Process,
  };

  const Component = components[block.collection];

  return Component ? <Component data={block.item} /> : null;
}
