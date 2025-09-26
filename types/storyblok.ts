import { StoryblokRichTextNode } from "@storyblok/react";

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

// Documento RichText compatible con storyblok-rich-text-react-renderer
export type StoryblokRichTextDocument = {
  type: "doc";
  content: StoryblokRichTextNode[];
};

export type Artist = {
  birthDate: string;
  birthPlace: string;
  deathDate?: string;
  deathPlace?: string;
  name: string;
  photo?: StoryblokAsset;
  bio?: StoryblokRichTextDocument; // campo RichText
  _editable?: string;
  _uid?: string;
  uuid: string;
  full_slug: string;
};
