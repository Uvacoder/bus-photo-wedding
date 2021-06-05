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
    <section id="contact">
      <h2>Contact Us</h2>
      <form class="form" :action="`https://formspree.io/f/${formspreeEndpoint}`" method="post">
        <div class="form__name">
          <label for="form-name">Name</label>
          <input v-model="contactForm.name" type="text" id="form-name" name="name" autocomplete="name" required @change="autosave" @input="touch('name')" @blur="touch('name')" />
          <p v-if="$v.contactForm.name.$dirty && $v.contactForm.name.$invalid" class="form__error">This field is required</p>
        </div>
        <div class="form__email">
          <label for="form-email">Email</label>
          <input v-model="contactForm.email" type="email" id="form-email" name="_replyto" autocomplete="email" required @change="autosave" @input="touch('email')" @blur="touch('email')" />
          <p v-if="$v.contactForm.email.$dirty && !$v.contactForm.email.required" class="form__error">This field is required</p>
          <p v-if="$v.contactForm.email.$dirty && !$v.contactForm.email.email" class="form__error">Enter a valid email address</p>
        </div>
        <div class="form__tel">
          <label for="form-tel">Telephone</label>
          <input v-model="contactForm.tel" type="tel" id="form-tel" name="telephone" autocomplete="tel" required @change="autosave" @input="touch('tel')" @blur="touch('tel')" />
          <p v-if="$v.contactForm.tel.$dirty && $v.contactForm.tel.$invalid" class="form__error">This field is required</p>
        </div>
        <div class="form__date">
          <label for="form-date">Date of wedding</label>
          <input v-model="contactForm.date" type="date" id="form-date" name="date" required @change="autosave" @input="touch('date')" @blur="touch('date')" />
          <p v-if="$v.contactForm.date.$dirty && $v.contactForm.date.$invalid" class="form__error">This field is required</p>
        </div>
        <div class="form__time">
          <label for="form-time">Time of wedding</label>
          <input v-model="contactForm.time" type="time" id="form-time" name="time" required @change="autosave" @input="touch('time')" @blur="touch('time')" />
          <p v-if="$v.contactForm.time.$dirty && $v.contactForm.time.$invalid" class="form__error">This field is required</p>
        </div>
        <div class="form__guests">
          <label for="form-guests">Number of guests</label>
          <select v-model="contactForm.guests" id="form-guests" name="number_of_guests" required @change="autosave" @input="touch('guests')" @blur="touch('guests')">
            <option value="0-10">0 - 10</option>
            <option value="11-30">11 - 30</option>
            <option value="31-60">31 - 60</option>
            <option value="60-99">60 - 99</option>
            <option value="100+">100+</option>
          </select>
          <p v-if="$v.contactForm.guests.$dirty && $v.contactForm.guests.$invalid" class="form__error">This field is required</p>
        </div>
        <div class="form__location">
          <label for="form-location">Location of wedding</label>
          <input v-model="contactForm.location" type="text" id="form-location" name="location" required @change="autosave" @input="touch('location')" @blur="touch('location')" />
          <p v-if="$v.contactForm.location.$dirty && $v.contactForm.location.$invalid" class="form__error">This field is required</p>
        </div>
        <div class="form__extra">
          <label for="form-extra">Extra information</label>
          <textarea v-model="contactForm.extra" id="form-extra" name="extra" @change="autosave"></textarea>
        </div>
        <button class="form__submit" type="submit" :disabled="$v.contactForm.$invalid">Submit</button>
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
      date: {
        required
      },
      time: {
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
        date: new Date(),
        time: '00:00',
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
    this.getAutosave();
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

hr {
  margin: 2rem;
  margin-bottom: 0;
}

section {
  padding: 1rem;

  @media (min-width: 500px) {
    padding: 1rem 2rem;
  }

  h2,
  .about {
    text-align: center;
  }
}

.form {
  display: grid;
  gap: 1rem;
  grid-template-areas: 'name' 'email' 'tel' 'date' 'time' 'guests' 'location' 'extra' 'submit';
  max-width: 60rem;
  margin: 0 auto;

  @media (min-width: 550px) {
    grid-template-areas: 'name email' 'tel .' 'date time' 'guests location' 'extra extra' '. submit';
  }

  $formAreas: name, email, tel, date, time, guests, location, extra, submit;
  @each $area in $formAreas {
    &__#{$area} {
      grid-area: $area;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  textarea {
    resize: vertical;
  }

  &__error {
    color: crimson;
    margin: 0;
  }
}
</style>
