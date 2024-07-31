<template>
  <div class="admin-page">
    <div class="admin-page__title">Добро пожаловать, {{ user?.username }}</div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['is-admin'],
  layout: 'admin',
})

const authStore = useAuthStore()

const user = computed(() => authStore.getUser)

</script>

<style lang="scss" scoped>
.admin-page {
  &__title {
    font-size: 32px;
    font-weight: 800;
  }
}
</style>
