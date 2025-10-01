import Image from "next/image";
import Link from "next/link";
import { storyblokApi } from "../../../../lib/storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import type { Artist, BioBlock } from "../../../../../types/storyblok";

export async function generateStaticParams() {
  const sbApi = storyblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "cabaret/",
    version: "draft",
    language: 'ca',
  });

  return data.stories.map((story: { slug: string }) => ({
    slug: story.slug,
    locale: "ca"
  }));
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const sbApi = storyblokApi();
  
  const { data } = await sbApi.get(`cdn/stories/cabaret/${slug}`, {
    version: "draft",
    language: locale,
  });

  const artist: Artist & { bio?: BioBlock} = data.story.content;

  // console.log("DATA STORYBLOK:", JSON.stringify(artist, null, 2));

  return (
    <main className="p-8">
      <Link 
        href={`/${locale}`}
        className="inline-block mb-4 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
       ← {locale === "ca" ? "Tornar" : "Back"}
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        {/* {locale === "ca"
          ? `Nom: ${artist.name}`
          : `Name: ${artist.name}`
        } */}
        {artist.name}
      </h1>

      {artist.photo?.filename && (
        <div className="relative w-full">
            <Image
              src={artist.photo.filename}
              alt={artist.name}
              width={300}
              height={100}
              className="object-cover rounded-2xl"
            />
        </div>
      )}

      <p className="text-lg text-gray-700 mt-12 mb-2">
        <strong>Naixement:</strong> {artist.birthPlace} ({artist.birthDate})
      </p>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Defunció:</strong>{" "}
        {artist.deathDate
          ? `${artist.deathPlace} (${artist.deathDate})`
          : "Desconeguda"}
      </p>

      {/* Renderizar cada bloque RichText */}
      {artist.bio?.map((block) => {
        if (!block.Bio) return null;
        return (
          <article className="prose max-w-none mb-6" key={block._uid}>
            {render(block.Bio)}
          </article>
        );
      })}
    </main>
  );
}
