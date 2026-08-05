import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';

interface ProcessStep {
  id: string;
  title: string;
  description?: string;
  sort?: number;
}

interface ProcessData {
  id: string;
  tagline?: string;
  headline?: string;
  steps?: ProcessStep[];
}

interface ProcessProps {
  data: ProcessData;
}

export default function Process({ data }: ProcessProps) {
  const { tagline, headline, steps } = data;
  const sortedSteps = steps ? [...steps].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)) : [];
  if (sortedSteps.length === 0) return null;

  return (
    <section className="w-full" aria-label={headline || 'My process'}>
      {tagline && <Tagline tagline={tagline} />}
      {headline && <Headline headline={headline} />}
      <ol className="mt-8 relative flex flex-col gap-8 max-w-3xl mx-auto">
        {sortedSteps.map((step, index) => (
          <li key={step.id} className="relative pl-16">
            <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-sky text-midnight text-lg font-bold" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-[var(--foreground-color)]">{step.title}</h3>
            {step.description && <p className="mt-2 text-base leading-relaxed text-[var(--muted-color)]">{step.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
