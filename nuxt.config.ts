// https://nuxt.com/docs/api/configuration/nuxt-config

import { StructuredDataForGoogleSearch } from './libs/data/StructuredDataForGoogleSearch'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Lowlesses',
      titleTemplate: (title) => `${title ?? ''} - Lowlesses`,
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(StructuredDataForGoogleSearch)
        }
      ],
    },
  },
  ssr: true,
  modules: [
    '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    'nuxt-icons',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
  ],
  eslint: {
    // eslintPath: './.eslintrc.cjs'
    lintOnStart: false
  },
  pinia: {
    storesDirs: ['./stores/**',],
  },
  css: ['./assets/styles/reset.scss', './assets/styles/main.scss', './assets/styles/global-classes.scss', './assets/styles/mixins.scss'],
  i18n: {
    locales: ['ru-RU', 'en-EN'],
    defaultLocale: 'ru-RU',
    vueI18n: './app/locales/i18n.config.ts',
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:9890/',
    },
  },
})