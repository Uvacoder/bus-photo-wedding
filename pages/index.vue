<template>
  <div>
    <Navigation :logo="home.data.logo" />
    <h1>{{ $prismic.asText(home.data.page_title) }}</h1>
    <div class="featured-img">
      <img :src="home.data.featured_image.url" :alt="home.data.featured_image.alt" />
    </div>
    <hr />
    <section id="about">
      <h2>{{ $prismic.asText(home.data.about_header) }}</h2>
      <prismic-rich-text class="about" :field="home.data.about_text" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import siteconfig from '@/siteconfig.json'

export default Vue.extend({
  name: 'Home',
  layout: 'default',
  data () {
    return {
      siteconfig
    }
  },
  head () {
    return {
      // @ts-ignore
      title: this.home.data.tab_title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          // @ts-ignore
          content: this.home.data.tab_title
        },
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: this.home.data.page_description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          // @ts-ignore
          content: this.home.data.page_description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          // @ts-ignore
          content: this.home.data.og_image.url
        }
      ]
    }
  },
  async asyncData ({ $prismic, error }: any) {
    const home: Record<string, any> = await $prismic.api.getSingle('home')

    if (home) {
      return { home }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  margin: 1rem;
  margin-top: 0;
  text-align: center;
}

.featured-img {
  display: flex;
  justify-content: center;

  img {
    width: 15rem;
  }
}

hr {
  margin: 2rem;
  margin-bottom: 0;
}

section {
  padding: 1rem 2rem;

  h2,
  .about {
    text-align: center;
  }
}
</style>
