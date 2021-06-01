<template>
  <pre>
    {{ home.data }}
  </pre>
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

</style>
