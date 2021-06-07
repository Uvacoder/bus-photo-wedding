<template>
  <div>
    <Navigation :logo="home.data.logo" />
    <h1>{{ $prismic.asText(home.data.page_title) }}</h1>
    <div class="featured-img">
      <img :src="home.data.featured_image.url" :alt="home.data.featured_image.alt" width="448" height="334" />
    </div>
    <p class="attention">£150 limited time offer</p>
    <hr />
    <section id="about">
      <h2>{{ $prismic.asText(home.data.about_header) }}</h2>
      <prismic-rich-text class="about" :field="home.data.about_text" />
    </section>
    <section id="contact">
      <h2>Contact Us</h2>
      <form class="form" :action="`https://formspree.io/f/${formspreeEndpoint}`" method="post">
        <div class="form__name">
          <v-text-field
            label="Name"
            name="name"
            autocomplete="name"
            v-model="contactForm.name"
            :rules="[() => $v.contactForm.name.required || 'This field is required']"
            required
          />
        </div>
        <div class="form__email">
          <v-text-field
            label="Email"
            name="_replyto"
            autocomplete="email"
            type="email"
            v-model="contactForm.email"
            :rules="[() => $v.contactForm.email.required || 'This field is required', () => $v.contactForm.email.email || 'Enter a valid email address']"
            required
          />
        </div>
        <div class="form__tel">
          <v-text-field
            label="Telephone"
            name="telephone"
            autocomplete="tel"
            type="tel"
            v-model="contactForm.tel"
            :rules="[() => $v.contactForm.tel.required || 'This field is required']"
            required
          />
        </div>
        <div class="form__datetime">
          <v-text-field
            label="Date & time"
            name="datetime"
            v-model="contactForm.datetime"
            :rules="[() => $v.contactForm.datetime.required || 'This field is required']"
            required
          />
        </div>
        <div class="form__guests">
          <v-select
            label="Number of guests"
            name="guests"
            v-model="contactForm.guests"
            :items="['0 - 100', '11 - 30', '31 - 60', '60 - 99', '100+']"
            :rules="[() => $v.contactForm.guests.required || 'This field is required']"
            required
          ></v-select>
        </div>
        <div class="form__location">
          <v-text-field
            label="Location of wedding"
            name="location"
            v-model="contactForm.location"
            :rules="[() => $v.contactForm.location.required || 'This field is required']"
            required
          />
        </div>
        <div class="form__extra">
          <v-textarea
            label="Extra information"
            name="extra"
            v-model="contactForm.extra"
          />
        </div>
        <v-btn
          class="form__submit"
          type="submit"
          elevation="2"
          :disabled="$v.contactForm.$invalid"
          color="primary"
        >Submit</v-btn>
      </form>
    </section>
    <SiteFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import siteconfig from '@/siteconfig.json'

import { email, required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default Vue.extend({
  name: 'Home',
  layout: 'default',
  mixins: [validationMixin],
  validations: {
    contactForm: {
      name: {
        required
      },
      email: {
        email,
        required
      },
      tel: {
        required
      },
      datetime: {
        required
      },
      guests: {
        required
      },
      location: {
        required
      }
    }
  },
  data () {
    return {
      siteconfig,
      contactForm: {
        name: '',
        email: '',
        tel: '',
        datetime: '',
        guests: '',
        location: '',
        extra: ''
      }
    }
  },
  computed: {
    formspreeEndpoint (): string {
      return process.env.FORMSPREE_ENDPOINT!
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
  },
  mounted () {
    // @ts-ignore this.getAutosave does exist
    // this.getAutosave();
  },
  methods: {
    getAutosave (): void {
      const data = sessionStorage.getItem('autosave')
      
      if (data) {
      // @ts-ignore this.contactForm does exist
        this.contactForm = JSON.parse(data)
      }
    },
    autosave (): void {
      // @ts-ignore this.contactForm does exist
      sessionStorage.setItem('autosave', JSON.stringify(this.contactForm))
    },
    touch (formField: string): void {
      return this.$v.contactForm[formField]!.$touch()
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  margin: 1rem;
  margin-top: 0;
  text-align: center;

  @media (min-width: 900px) {
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
  }
}

.featured-img {
  display: flex;
  justify-content: center;

  img {
    width: 28rem;
  }
}

.attention {
  margin: 2rem auto;
  text-align: center;
  font-size: 1.9rem;
  font-weight: 700;
}

hr {
  margin: 2rem 10%;
  margin-bottom: 0;
}

section {
  padding: 1rem;
  max-width: 82rem;
  margin: 2rem auto;

  @media (min-width: 500px) {
    padding: 1rem 2rem;
  }
}

.form {
  display: grid;
  gap: 1rem;
  grid-template-areas: 'name' 'email' 'tel' 'datetime' 'guests' 'location' 'extra' 'submit';
  margin: 0 auto;

  @media (min-width: 550px) {
    grid-template-areas: 'name email' 'tel datetime' 'guests location' 'extra extra' '. submit';
  }

  $formAreas: name, email, tel, datetime, guests, location, extra, submit;
  @each $area in $formAreas {
    &__#{$area} {
      grid-area: $area;
    }
  }

  &__date,
  &__time {
    align-items: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
