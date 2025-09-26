import Link from "next/link";
import { storyblokApi } from "../lib/storyblok";
import type { Artist, StoryblokStory } from "../../types/storyblok";
export default async function Home() {
  const sbApi = storyblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "cabaret/",
    version: "draft", // canvia a "published" en prod
  });

  const artists:StoryblokStory<Artist>[] = data.stories;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artistes de Cabaret Alemany</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <li
            key={artist.uuid}
            className="rounded-2xl shadow p-4 bg-white border hover:shadow-lg transition"
          >
            <Link href={`${artist.full_slug}`}>
              <h2 className="text-xl font-semibold">{artist.content.name}</h2>
              <p className="text-sm text-gray-600">
                {artist.content.birthPlace} ({artist.content.birthDate} –{" "}
                {artist.content.deathDate || "?"})
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}