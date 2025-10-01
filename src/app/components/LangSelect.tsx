"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const LANGS = [
  { code: "ca", label: "Català" },
  { code: "en", label: "English" },
];

export default function LangSelect() {
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  // Idioma actual: se extrae del primer segmento de la ruta (/ca/..., /en/...)
  const currentLang = pathname.split("/")[1] || "ca";

  function handleLangChange(lang: string) {
    if (lang === currentLang) return;

    // Sustituimos el primer segmento (idioma) de la ruta actual
    const segments = pathname.split("/");
    segments[1] = lang; // sustituye el idioma
    const newPath = segments.join("/");

    router.push(newPath);
    setMenu(false);
  }

  return (
    <div className="relative">
      <div
        className="flex items-center w-24 h-8 bg-white text-sm text-gray-700 rounded cursor-pointer px-2 shadow"
        onClick={() => setMenu(!menu)}
      >
        {LANGS.find((l) => l.code === currentLang)?.label || "Català"}
      </div>

      {menu && (
        <ul className="absolute top-9 left-0 w-24 bg-white text-sm text-gray-700 rounded shadow">
          {LANGS.map((lang) => (
            <li
              key={lang.code}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleLangChange(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
