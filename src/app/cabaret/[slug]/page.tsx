import Image from "next/image";
import { storyblokApi } from "../../../lib/storyblok";
import { renderRichText } from "@storyblok/react";

// Funció per generar rutes estàtiques (slugs dels artistes)
export async function generateStaticParams() {
  const sbApi = storyblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "cabaret/",
    version: "draft",
  });

  return data.stories.map((story: any) => ({
    slug: story.slug,
  }));
}

// Pàgina de detall
export default async function ArtistPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  const { slug } = await params;
  const sbApi = storyblokApi();
  const { data } = await sbApi.get(`cdn/stories/cabaret/${slug}`, {
    version: "draft",
  });

  const artist = data.story.content;

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
        {artist.deathDate ? `${artist.deathPlace} (${artist.deathDate})` : "Desconeguda"}
      </p>

      {/* Renderitza cada bloc dins el camp bio */}
      {artist.bio?.map((block: any, idx: number) =>
        block.Bio ? (
          <article
            key={idx}
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: renderRichText(block.Bio) || "" }}
          />
        ) : null
      )}

    </main>
  );
}
