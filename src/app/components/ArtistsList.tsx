'use client'

import Link from "next/link";
import type { Artist, StoryblokStory } from "../../../types/storyblok";
import { useState, useEffect } from "react";


export default function ArtistsList({ artists }: {artists: StoryblokStory<Artist>[]}) {

  const [artistsList, setArtistsList] = useState<StoryblokStory<Artist>[]>([]);
  
  // console.log("artistsList: ", artistsList.slice(0,2))

  function findSurname(completeName: string) {
    let surnameIndex = completeName.indexOf(" ") + 1;
    return completeName.slice(surnameIndex)
  }

  useEffect(() => {
    if(!artists) return;
    const sortedList = [...artists].sort((a, b) => (findSurname(a.content.name)).localeCompare(findSurname(b.content.name)))
    setArtistsList(sortedList);
  }, [artists]);

  return (
       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artistsList.map((artist) => (
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
  )
}

  
