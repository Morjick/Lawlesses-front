<template>
  <div
    v-if="user"
    class="admin-header"
  >
    <div class="admin-header__inner">
      <div class="admin-header__navigation">
        <div
          class="admin-header__item"
          title="Обращения в тех. поддержку"
        >
          <nuxt-icon name="warning" />
          <div class="admin-header__item--placemark"/>
        </div>
        <div
          class="admin-header__item"
          title="Статьи на модерации"
        >
          <nuxt-icon name="content" />
          <!-- <div class="admin-header__item--placemark"/> -->
        </div>
        <div
          class="admin-header__item"
          title="Комментарии на модерации"
        >
          <nuxt-icon name="chat" />
          <div class="admin-header__item--placemark"/>
        </div>
      </div>
      <ui-avatar
        :url="String(user.avatar)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

const user = computed(() => authStore.getUser)
</script>

<style lang="scss">
.admin-header {
  position: fixed;

  top: 30px;
  left: calc(300px + 30px);
  right: 30px;
  z-index: 100;

  height: 55px;

  background: var(--admin-background-color);
  box-shadow: var(--admin-secondary-shadow);
  border-radius: 5px;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 100%;

    padding: 10px;
    gap: 30px;

    .ui-avatar {
      width: 50px;
      height: 50px;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;

    gap: 20px;
  }

  &__item {
    position: relative;

    cursor: pointer;

    span, svg, path {
      font-size: 28px;
    }

    &--placemark {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;

      width: 15px;
      height: 15px;
      right: -2px;
      top: 0;

      background: red;
      border-radius: 50%;
    }
  }
}
</style>
