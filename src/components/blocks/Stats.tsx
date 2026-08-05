import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';
import { cn } from '@/lib/utils';

interface StatItem {
  id: string;
  value: string;
  label: string;
  description?: string;
  sort?: number;
}

interface StatsData {
  id: string;
  tagline?: string;
  headline?: string;
  items?: StatItem[];
}

interface StatsProps {
  data: StatsData;
}

export default function Stats({ data }: StatsProps) {
  const { tagline, headline, items } = data;
  const sortedItems = items ? [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)) : [];
  if (sortedItems.length === 0) return null;

  return (
    <section className="w-full" aria-label={headline || 'Key statistics'}>
      {tagline && <Tagline tagline={tagline} />}
      {headline && <Headline headline={headline} />}
      <div
        className={cn(
          'mt-8 grid gap-6',
          sortedItems.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3',
        )}
      >
        {sortedItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-6 text-center">
            <span className="text-4xl font-bold tracking-tight text-sky md:text-5xl">{item.value}</span>
            <span className="mt-2 text-base font-medium text-[var(--foreground-color)]">{item.label}</span>
            {item.description && <span className="mt-1 text-sm text-[var(--muted-color)]">{item.description}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
