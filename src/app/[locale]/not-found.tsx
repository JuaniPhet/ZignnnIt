import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Shown for unknown URLs inside a language (/en/whatever), in that language.
export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-24">
      <p className="font-display text-7xl font-extrabold text-amber">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl text-foreground">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 bg-primary text-primary-foreground px-6 py-3 font-semibold rounded-xl hover:brightness-110 transition-all"
      >
        {t("back")}
      </Link>
    </main>
  );
}
