import { StoryblokRichTextNode } from "@storyblok/react";
// Story genérico devuelto por Storyblok

export type StoryblokStory<T> = {
  name: string;
  created_at: string;
  published_at?: string;
  id: number;
  uuid: string;
  slug: string;
  full_slug: string;
  content: T;
  [k: string]: unknown; // Storyblok siempre añade más cosas
};

export type StoryblokAsset = {
  id?: number;
  filename?: string; // URL (ex: https://a.storyblok.com/...)
  alt?: string;
  copyright?: string;
  fieldtype?: string;
  focus?: string;
  is_external_url?: boolean;
  meta_data?: Record<string, unknown>;
  name?: string;
  source?: string;
  title?: string;
  [k: string]: unknown; // permite campos adicionales
};

// Documento RichText
export type StoryblokRichTextDocument = {
  type: "doc";
  content: StoryblokRichTextNode[];
};

// Bloque que contiene un campo RichText llamado "Bio"
export type BioBlock = {
  _uid?: string;
  component?: string;
  Bio: StoryblokRichTextDocument;
  [k: string]: unknown; // Storyblok suele meter metadata extra
};

export type Artist = {
  birthDate: string;
  birthPlace: string;
  deathDate?: string;
  deathPlace?: string;
  name: string;
  photo?: StoryblokAsset;
  bio?: BioBlock[]; // 👈 ahora es array de bloques
  _editable?: string;
  _uid?: string;
  uuid: string;
  full_slug: string;
};
