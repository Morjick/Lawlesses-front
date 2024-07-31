<template>
  <div class="themes-page">
    <div class="admin-page-header">
      <h1 class="admin-title">Темы для форума</h1>
      <admin-search />

      <ui-button
        mode="admin"
        text="Создать тему"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['is-admin'],
  layout: 'admin',
})
</script>

<style lang="scss">
// .themes- {}
</style>
