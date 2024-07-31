<template>
  <div>
    <app-loader v-if="isShowAppLoader"  />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const authStore = useAuthStore()

const isShowAppLoader = ref(true)
const loading = ref(true)

nuxtApp.hook("page:finish", () => {
  loading.value = false
})

watch(loading, () => {
  setTimeout(() => {
    isShowAppLoader.value = false
  }, 700)
})

onMounted(async () => {
  await authStore.checkToken()
  authStore.clearAuthError()
})

useHead({
  titleTemplate: (title) => title ? `${title} - Lowlesses` : 'Lowlesses',
})

useSeoMeta({
  titleTemplate: (title) => title ? `${title} - Lowlesses` : 'Lowlesses',
  description: 'Вот такое описание',
  ogDescription: 'Вот такое описание',
  ogTitle: 'Lowlesses',
  ogType: 'website',
  ogImage: '',
  ogUrl: 'http://localhost:3000',
  appleMobileWebAppTitle: 'Lowlesses',
  appleMobileWebAppStatusBarStyle: 'black',
  appleMobileWebAppCapable: 'yes',
})
</script>

