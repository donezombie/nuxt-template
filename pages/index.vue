<template>
  <div>
    <b-button variant="outline-primary" @click="logout">Logout</b-button>
    <div class="container">
      <div>
        <Logo />
        <h1 class="title">
          nuxt-template
        </h1>
        <div class="links">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            class="button--green"
          >
            Documentation
          </a>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mutationTypes from "~/consts/mutationTypes";
export default {
  methods: {
    logout() {
      this.$store.dispatch(`auth/${mutationTypes.AUTH.LOGOUT}`);
    }
  }
};
</script>

<style></style>
