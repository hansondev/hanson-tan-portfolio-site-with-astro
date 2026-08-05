import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import Button from '@/components/blocks/Button';
import { Form } from '@/components/ui/form';
import Field from './FormField';
import { buildZodSchema } from '@/lib/zodSchemaBuilder';
import type { FormField as FormFieldType } from '@/types';

const isDraftPreview = false;
const setDirectusAttr = (_config?: Record<string, unknown>) => undefined;

interface DynamicFormProps {
  fields: FormFieldType[];
  scriptUrl?: string | null;
  blockFormId: string;
  className?: string;
}

export default function DynamicForm({ fields, scriptUrl, blockFormId, className }: DynamicFormProps) {
  const formSchema = buildZodSchema(fields);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/form-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId: blockFormId, data }),
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
    } catch {
      // silent fail
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
        {fields.map((field) => {
          if (!field.name) return null;

          return <Field key={field.id} field={field} control={form.control} />;
        })}
        <Button
          type="submit"
          label="Submit"
          variant="default"
          block
          disabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
