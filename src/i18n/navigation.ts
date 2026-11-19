import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for next/link and next/navigation.
 * <Link href="/contact"> renders /en/contact or /fr/contact depending on the
 * current language — components never hard-code the prefix.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
