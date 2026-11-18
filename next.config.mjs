import createNextIntlPlugin from "next-intl/plugin";

// Points next-intl to the per-request config (locale + messages).
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
