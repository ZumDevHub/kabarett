import Image from "next/image";
import { storyblokApi } from "../../../lib/storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import type { Artist } from "../../../../types/storyblok";
import type { BioBlock } from "../../../../types/storyblok";

export async function generateStaticParams() {
  const sbApi = storyblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "cabaret/",
    version: "draft",
  });

  return data.stories.map((story: { slug: string }) => ({
    slug: story.slug,
  }));
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sbApi = storyblokApi();
  const { data } = await sbApi.get(`cdn/stories/cabaret/${slug}`, {
    version: "draft",
  });

  const artist: Artist & { bio?: BioBlock} = data.story.content;

  console.log("DATA STORYBLOK:", JSON.stringify(artist, null, 2));

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>

      {artist.photo?.filename && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={artist.photo.filename}
            alt={artist.name}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      <p className="text-lg text-gray-700 mb-2">
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
