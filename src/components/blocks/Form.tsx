import type { FormField } from '@/types';
import Tagline from '@/components/ui/Tagline';
import FormBuilder from '@/components/forms/FormBuilder';
import Headline from '@/components/ui/Headline';

interface FormBlockProps {
  data: {
    id: string;
    tagline: string | null;
    headline: string | null;
    form: {
      id: string;
      on_success?: 'redirect' | 'message' | null;
      submit_label?: string;
      success_message?: string | null;
      title?: string | null;
      success_redirect_url?: string | null;
      is_active?: boolean | null;
      fields: FormField[];
    };
  };
}

const FormBlock = ({ data }: FormBlockProps) => {
  const { tagline, headline, form } = data;
  if (!form) return null;

  return (
    <section className="mx-auto">
      {tagline && <Tagline tagline={tagline} />}
      {headline && <Headline headline={headline} />}
      <FormBuilder form={form} blockFormId={data.id} className="mt-8" />
    </section>
  );
};

export default FormBlock;
