<template>
  <footer>
    <p>&copy;{{ year }} {{ siteconfig.brand_name }}. All rights reserved.</p>
    <!-- <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link> -->
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import siteconfig from '@/siteconfig.json'

export default Vue.extend({
  name: 'SiteFooter',
  computed: {
    year (): number {
      return new Date().getFullYear();
    }
  },
  data () {
    return {
      siteconfig
    }
  }
})
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

a {
  font-size: 0.75rem;
  color: navy;
}
</style>
