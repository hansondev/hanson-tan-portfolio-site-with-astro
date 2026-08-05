export interface FormField {
  id: string;
  name?: string | null;
  type?: 'text' | 'textarea' | 'checkbox' | 'checkbox_group' | 'radio' | 'file' | 'select' | 'hidden' | null;
  label?: string | null;
  placeholder?: string | null;
  help?: string | null;
  validation?: string | null;
  width?: '100' | '67' | '50' | '33' | null;
  choices?: Array<{ text: string; value: string }> | null;
  required?: boolean | null;
  sort?: number | null;
}

export interface Post {
  id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  content?: string | null;
  image?: string | null;
  status?: string;
  published_at?: string | null;
  seo?: {
    title?: string;
    meta_description?: string;
    og_image?: string;
  } | null;
}
