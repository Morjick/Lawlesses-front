<template>
  <div>
    <div
      class="layout"
      :class="{
        'layout-mobile': isMobile
      }"
    >
      <Header />
      <div class="layout__pages">
        <NuxtPage />
      </div>
    </div>
    <mobile-navigation />
    <FooterApp />
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const isMobile = ref(false)

watch(width, () => {
  isMobile.value = width.value <= 500
})

onMounted(() => {
  isMobile.value = width.value <= 500
})
</script>

<style lang="scss">
.layout {
  padding: 20px;

  &__pages {
    min-height: calc(100vh - var(--header-height) - var(--footer-height) - 110px);
    margin-top: 20px;

    @media (max-width: 500px) {
      margin-top: 0;
      min-height: calc(100vh - 150px);
    }
  }
}
</style>
