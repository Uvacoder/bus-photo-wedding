<template>
  <pre>
    {{ privacyPolicy.data }}
  </pre>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PrivacyPolicy',
  layout: 'default',
  head () {
    return {
      // @ts-ignore
      title: this.privacyPolicy.data.tab_title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          // @ts-ignore
          content: this.privacyPolicy.data.tab_title
        },
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: this.privacyPolicy.data.page_description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          // @ts-ignore
          content: this.privacyPolicy.data.page_description
        }
      ]
    }
  },
  async asyncData ({ $prismic, error }: any) {
    const privacyPolicy: Record<string, any> = await $prismic.api.getSingle('privacy_policy')

    if (privacyPolicy) {
      return { privacyPolicy }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
