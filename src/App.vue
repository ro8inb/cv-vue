<script setup lang="ts">

import { RouterView } from 'vue-router'
import Home from './components/HomePage.vue'
import ButtonItem from './components/ButtonItem.vue'
import BioIcon from './components/icons/IconBio.vue'
import ToolingIcon from './components/icons/IconTooling.vue'
import HomeIcon from './components/icons/IconHome.vue'
import ListIcon from './components/icons/IconList.vue'
import { useRoute } from 'vue-router'
const route = useRoute()


const isActiveRoute = (routeName: string) => {
  return route.name === routeName
}



</script>

<template>
  <header class="h-full" v-if="isActiveRoute('check-list-erp') === false">
    <div class="wrapper justify-center">
      <img alt="Image cv" class="logo" src="@/assets/profile-img.jpg" width="150" height="150" />
      <Home />
    </div>
  </header>

  <div class="nav h-full" v-if="isActiveRoute('check-list-erp') === false">
    <ButtonItem route="bio" name="Bio">
      <template #icon>
        <BioIcon />
      </template>
    </ButtonItem>

    <ButtonItem route="skills" name="Compétences">
      <template #icon>
        <ToolingIcon />
      </template>
    </ButtonItem>

    <ButtonItem route="projects" name="Projets">
      <template #icon>
        <ListIcon />
      </template>
    </ButtonItem>
  </div>
  <div class="content">
    <RouterView></RouterView>
  </div>

  <div id="footer" class="flex p-8 justify-center space-x-5">
    <RouterLink to="/" class="justify-center flex "> <HomeIcon transform="scale(1)" :class="isActiveRoute('check-list-erp') === true ? 'text-orange-400' : '' " /></RouterLink>
    <p class="pipe">|</p>
    <p>Copyright &copy; 2024 - Robin BERDIER</p>
    <p class="pipe">|</p>
    <p>contact@robinberdier.com</p>
    <p class="pipe">|</p>
    <p>+33 6 09 73 89 98</p>
  </div>

  <div v-if="isActiveRoute('check-list-erp') === false" class="diagonal-banner bg-orange-400">
    <RouterLink to="/check-list-erp"
    class="banner-link font-semibold text-black py-4 px-16">Évaluez votre ERP</RouterLink>
  </div>
</template>

<style scoped>
img {
    filter: grayscale(100%);
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 50%;
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav a:first-of-type {
  border: 0;
}

.content {
  flex: 1;
}

#footer {
  background-color: var(--color-background-soft);
}


.diagonal-banner {
  position: fixed;
  top: 120px;
  right: -90px;
  transform: rotate(+45deg);
  transform-origin: top right;
  color: white;
  padding: 1rem;
  margin: 3rem;
  z-index: 1000;
  width: 20rem ;
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 0 2rem 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
  }

  #footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .content {
    flex: 1;
    /* Make content take up available space */
    padding-bottom: 10rem;
  }

  .nav {
    justify-content: space-around;
    flex-direction: row;
    padding: 2rem 4rem 0 4rem;
    margin-top: 1rem;
  }

  .wrapper {
    margin-top: 50px;
  }

  #footer {
    position: fixed;
    flex-direction: column;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
  }

  #footer .pipe {
    display: none;
  }

  #footer p {
    margin-left: 0;
    padding-top: 5px;
  }

  .diagonal-banner {
  position: absolute;
  top: 120px;
  left: -90px;
  transform: rotate(-45deg);
  transform-origin: top left;
  color: white;
  padding: 1rem;
  margin: 3rem;
  z-index: 1000;
  width: 20rem ;
  text-align: center;
}
}

</style>
