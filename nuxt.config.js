require('dotenv').config()
import siteconfig from './siteconfig.json';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Nottingham Wedding Photography',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'modern-normalize/modern-normalize.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/prismic'
  ],
  prismic: {
    endpoint: 'https://nottinghamweddingphotography.cdn.prismic.io/api/v2',
    apiOptions: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap' // Always declare last
  ],
  robots: {
    UserAgent: '*',
    Allow: '/'
  },
  pwa: {
    meta: {
      ogHost: siteconfig.base_url,
      ogSiteName: siteconfig.brand_name,
      twitterCard: 'summary_large_image'
    }
  },
  sitemap: {
    hostname: siteconfig.base_url,
    exclude: ['/_icons']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
