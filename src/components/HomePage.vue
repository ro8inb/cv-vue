<script setup lang="ts">
import LinkedinIcon from './icons/IconLinkedin.vue'
import InstagramIcon from './icons/IconInstagram.vue'
import DownloadIcon from './icons/IconDownload.vue'

</script>

<template>
  <div class="greetings text-center">
    <h1>Robin BERDIER</h1>
    <h3>
      Développeur Symfony / Full Stack
    </h3>
    <h2>contact@robinberdier.com</h2>
    <h2>+33 6 09 73 89 98</h2>
    <h2 class="mt-2 font-light">Saint-Etienne - France</h2>
    <div class="flex justify-center my-2 block-social">
      <a href="https://www.linkedin.com/in/robinberdier/" target="_blank" class="text-center">
        <LinkedinIcon transform="scale(1.7)" class="my-2 mx-4" />
      </a>
      <a href="https://www.instagram.com/redwings_and_denim/" target="_blank">
        <InstagramIcon transform="scale(1.7)" class="my-2 mx-4" />
      </a>
      <button @click="downloadAction" title="Télécharger le CV en PDF">
        <DownloadIcon transform="scale(1.7)" class="my-2 mx-4" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { fileURL: '/ROBIN BERDIER.pdf' }
  },
  methods: {
    downloadAction() {
      const link = document.createElement('a');
      link.href = this.fileURL;
      link.target = '_blank'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

@media (max-width: 1024px) {
  .block-social {
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: column;
  }

  .block-social a,
  .block-social button {
    padding-top: 15px;
  }
}
</style>
