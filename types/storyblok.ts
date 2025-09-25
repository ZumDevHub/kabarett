import type { StoryblokRichTextNode } from '@storyblok/react' // (o '@storyblok/richtext')

export type StoryblokAsset = {
  id?: number
  filename?: string           // URL (ex: https://a.storyblok.com/...)
  alt?: string
  copyright?: string
  fieldtype?: string
  focus?: string
  is_external_url?: boolean
  meta_data?: Record<string, unknown>
  name?: string
  source?: string
  title?: string
  // per seguretat, accepta camps addicionals
  [k: string]: unknown
}

/**
 * Artist basat en la teva sortida console.log.
 * bio pot aparèixer com a array de nodes (tal i com has mostrat) o com a document 'doc'.
 */
export type Artist = {
  birthDate: string
  birthPlace: string
  deathDate?: string
  deathPlace?: string
  name: string
  photo?: StoryblokAsset
  // La richtext pot venir com a array (content) o com a node/doc complet.
  bio?: StoryblokRichTextNode[] | StoryblokRichTextNode | { type: 'doc'; content: StoryblokRichTextNode[] }
  // camp editor (storyblok editable) si el tens al registre:
  _editable?: string
  _uid?: string
}