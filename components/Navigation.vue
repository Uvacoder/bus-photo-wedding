<template>
  <header>
    <nuxt-link to="/">
      <img :src="logo.url" :alt="logo.alt" />
    </nuxt-link>
    <nav>
      <ul>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navigation',
  props: {
    logo: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 1.5rem;
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

@media (max-width: 500px) {
  header {
    justify-content: center;
  }

  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: rgba(200, 200, 200, 0.5) 0 -0.25rem 0.5rem 0;
    z-index: 1000;
  }

  ul {
    align-items: center;
    display: grid;
    grid-template: 3rem / repeat(2, 1fr);
    height: 3rem;
    justify-content: space-around;
    overflow: hidden;
    width: 100vw;
    margin: 0;
    font-size: 1.3rem;
  }

  li {
    margin: 0 !important;
    height: 100%;
    text-align: center;
    display: grid;
    place-items: center;
  }

  a {
    line-height: 3rem;
    height: 100%;
    width: 100%;
  }
}
</style>
