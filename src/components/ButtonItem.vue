<script setup lang="ts">

import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  route: string,
  name: string
}>()

const hover = ref(false);
const data = reactive({ selected: false })

const currentRoute = useRoute();
watch(currentRoute, (route) => {
  data.selected = route.name === props.route
})

</script>

<template>
  <div class="item flex justify-center" :class="data.selected ? 'item-selected' : ''" @mouseover="hover = true" @mouseleave="hover = false">
    <RouterLink :to="$props.route">
      <div class="button">
        <i>
          <slot name="icon"></slot>
        </i>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.item:hover a i,
.item-selected a i {
  border: 2px solid var(--vt-c-text-dark-2);
  color: var(--vt-c-text-dark-2);
}


/* @media (min-width: 1024px) { */
.item {
  margin-top: 0;
  padding: 0.4rem 0 1rem 0;
}

.item-title {
  align-self: center;
  margin-left: 15px;
}

i {
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 50px;
  height: 50px;
}

.item:first-of-type:before {
  display: none;
}

.item:last-of-type:after {
  display: none;
}

/* } */
</style>
