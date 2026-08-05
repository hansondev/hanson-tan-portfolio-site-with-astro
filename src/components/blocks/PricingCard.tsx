import Tagline from '@/components/ui/Tagline';
import Headline from '@/components/ui/Headline';
import PricingCard from '@/components/blocks/PricingCard';

interface PricingCardType {
  id: string;
  title: string;
  description?: string;
  price?: string;
  badge?: string;
  features?: string[];
  button?: {
    id: string;
    label: string | null;
    variant: string | null;
    url: string | null;
  };
  is_highlighted?: boolean;
}

interface PricingCardProps {
  card: PricingCardType;
}

export default function PricingCardComponent({ card }: PricingCardProps) {
  const { title, description, price, badge, features, button, is_highlighted } = card;

  return (
    <div className={`rounded-lg border p-6 flex flex-col gap-4 ${is_highlighted ? 'border-sky ring-1 ring-sky' : 'border-[var(--border-color)]'} bg-[var(--surface-color)]`}>
      {badge && <span className="rounded-full border border-sky px-3 py-1 text-xs text-sky self-start">{badge}</span>}
      <h3 className="text-xl font-semibold text-[var(--foreground-color)]">{title}</h3>
      {description && <p className="text-sm text-[var(--muted-color)]">{description}</p>}
      {price && <p className="text-3xl font-bold text-sky">{price}</p>}
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-color)]">
              <span className="text-sky mt-0.5">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {button?.label && button?.url && (
        <a
          href={button.url}
          className={`mt-auto inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${is_highlighted ? 'bg-sky text-midnight hover:bg-sky/90' : 'border border-navy-border text-light-text hover:border-sky hover:text-sky'}`}
        >
          {button.label}
        </a>
      )}
    </div>
  );
}
