// next.config.js

/** @type {import('next').NextConfig} */
const localeNames = require('./src/data/localeNames');

const locales = localeNames.map(l => l.value);

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale: 'en-US'
  }
}

module.exports = nextConfig