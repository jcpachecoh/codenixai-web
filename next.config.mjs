import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

export default withNextIntl({
  experimental: {
    serverActions: {},
  },
  // Remove the invalid webpack configuration
  // webpack: true,
});
