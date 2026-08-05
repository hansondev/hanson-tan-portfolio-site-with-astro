import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';
import { cn } from '@/lib/utils';

interface SkillCategory {
  id: string;
  name: string;
  items?: string[];
  sort?: number;
}

interface SkillsData {
  id: string;
  tagline?: string;
  headline?: string;
  categories?: SkillCategory[];
}

interface SkillsProps {
  data: SkillsData;
}

const categoryIcons: Record<string, string> = {
  'AI & Automation': '🤖',
  'Performance Marketing': '📊',
  'Analytics & Data': '📈',
  'Web & Infrastructure': '🌐',
};

export default function SkillsGrid({ data }: SkillsProps) {
  const { tagline, headline, categories } = data;
  const sortedCategories = categories ? [...categories].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)) : [];
  if (sortedCategories.length === 0) return null;

  const gridCols = sortedCategories.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <section className="w-full" aria-label={headline || 'Technical skills'}>
      {tagline && <Tagline tagline={tagline} />}
      {headline && <Headline headline={headline} />}
      <div className={cn('mt-8 grid gap-6', gridCols)}>
        {sortedCategories.map((category) => (
          <div key={category.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6">
            <h3 className="text-xl font-semibold text-sky mb-4">
              {categoryIcons[category.name] && <span className="mr-2" role="img" aria-hidden="true">{categoryIcons[category.name]}</span>}
              {category.name}
            </h3>
            {category.items && category.items.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {category.items.map((skill, index) => (
                  <li key={`${category.id}-${index}`} className="rounded-full border border-[var(--border-color)] px-3 py-1 text-sm text-[var(--muted-color)]">{skill}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
