import { storyblokApi } from "../../lib/storyblok";
import { Artist, StoryblokStory } from "../../../types/storyblok";
import ArtistsList from "../components/ArtistsList";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {

  const { locale } = await params;
  const sbApi = storyblokApi();

  if (!["ca", "en"].includes(locale)) {
      throw new Error("Idioma no soportado");
  }

  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "cabaret/",
    version: "draft", // canvia a "published" en prod
    language: locale,
  });
  
  const artists: StoryblokStory<Artist>[] = data.stories;
  
  return (
     <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {locale === "ca" ? "Artistes de Cabaret Alemany" : "Cabaret Artists"}
      </h1>
      <ArtistsList 
        artists={artists} 
        locale={locale}
      />
    </main>
  );
}