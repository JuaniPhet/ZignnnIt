import type { routing } from "@/i18n/routing";
import type messages from "../messages/en.json";

/**
 * Type-safe i18n: `t("hero.title")` is checked against messages/en.json and the
 * locale type comes from the routing config. A typo in a key fails the build.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
