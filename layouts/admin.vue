<template>
  <div>
    <div class="layout admin-layout">
      <div class="layout__grid">
        <Sidebar />
        <div class="layout__pages">
          <admin-header />

          <div class="layout__content"><NuxtPage /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/global/admin/Sidebar.vue'
</script>

<style lang="scss" scoped>
.layout {
  background: var(--admin-background-color);
  overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;

  &__grid {
    display: flex;
  }

  &__pages {
    max-width: calc(100vw - 300px);
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    padding: 20px 30px;
    margin-left: 330px;
  }

  &__content {
    margin-top: 70px;
  }
}
</style>

<style lang="scss">
.admin-title {
  font-size: 34px;
  font-weight: 800;
}

.admin-page-header {
  display: flex;
  align-items: center;

  margin-bottom: 40px;

  .admin-search {
    margin-left: 60px;
  }

  .ui-button {
    margin-left: auto;
  }

  .flexer {
    display: flex;
    align-items: center;

    margin-left: auto;
    gap: 20px;
  }
}
</style>

