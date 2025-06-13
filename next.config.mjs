/** @type {import('next').NextConfig} */

// next.config.mjs
const withNextIntl = (await import('next-intl/plugin')).default;

export default withNextIntl('./next-intl.config.js')({
  // your Next.js config here
  i18nRequestConfigPath: './i18n/request.ts',
  experimental: {
    serverActions: {},
  },
});
