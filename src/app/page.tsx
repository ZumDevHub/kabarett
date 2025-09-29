import { storyblokApi } from "../lib/storyblok";
import { Artist, StoryblokStory } from "../../types/storyblok";
import ArtistsList from "./components/ArtistsList";

export default async function Home() {
  const sbApi = storyblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "cabaret/",
    version: "draft", // canvia a "published" en prod
  });
  
  const artists: StoryblokStory<Artist>[] = data.stories;
  
  return (
     <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artistes de Cabaret Alemany</h1>
      <ArtistsList artists={artists} />
    </main>
  );
}