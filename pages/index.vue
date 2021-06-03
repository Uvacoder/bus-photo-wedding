<template>
  <Navigation :logo="home.data.logo" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  layout: 'default',
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
header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

img {
  width: 16rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
  text-align: right;
  font-size: 1.5rem;

  li:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  a {
    color: #000;
    font-weight: 400;
    text-decoration: none;

    &:hover {
      font-weight: 700;
    }
  }
}
</style>
