import { notFound } from "next/navigation";

// Catch-all: any unknown path under /en or /fr renders the localized not-found page
// (without it, Next would fall back to its default, untranslated 404).
export default function CatchAllPage() {
  notFound();
}
