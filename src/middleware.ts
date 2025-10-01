import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ca", "en"];
const defaultLocale = "ca";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si la ruta ya empieza con un locale válido, no hacemos nada
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return;
  }

  // Redirigir a /ca por defecto
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

// Configuración: que corra en todas las rutas menos assets y APIs
export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
