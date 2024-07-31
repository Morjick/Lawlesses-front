<template>
  <div
    v-if="mainUser && Boolean(isAuth)"
    class="user-switcher"
    @click="onSwitcherClick"
  >
    <div class="user-switcher__header">
      <ui-user-snippet
        :user="mainUser"
        status-bar-view="settings"
      />
      <nuxt-icon name="arrow-down" />
    </div>
    <div
      class="user-switcher__body"
      :class="{
        active: isActive,
      }"
    >
      <div
        v-for="user in userList"
        :key="user.id"
        class="user-switcher__item"
        @click="onChangeUser(user)"
      >
        <ui-user-snippet
          :user="user"
        />
      </div>
      <p v-if="!userList.length">{{ $t('youHavnotOtherUsers') }}</p>
      <div
        class="user-switcher__item add-user"
        @click="onAddUserClick"
      >
        <nuxt-icon name="add-user" />
        <span>{{ $t('addUser') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OtherUsersItemInterface } from '~/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const mainUser: ComputedRef<UserInterface | null> = computed(() => authStore.getUser)
const userList: ComputedRef<OtherUsersItemInterface[]> = computed(() => authStore.getOtherUsers)
const isAuth = computed(() => authStore.getIsAuth)

const isActive = ref(false)

const onAddUserClick = () => {
  router.push('/auth?add-user=true')
}

const onChangeUser = (user: OtherUsersItemInterface) => {
  authStore.changeUser(user.id)
}

const onSwitcherClick = () => {
  isActive.value = !isActive.value

  setTimeout(() => isActive.value = false, 1200)
}
</script>

<style lang="scss" scoped>
.user-switcher {
  position: relative;

  z-index: 100;

  &:hover {
    .user-switcher__body {
      opacity: 1;
      transform: translate(0);
      pointer-events: all;
    }
  }

  &__header {
    display: flex;
    align-items: center;

    border-radius: 5px;
    padding: 2px 5px;
    gap: 15px;

    overflow: hidden;
    transition: all .4s;
    cursor: pointer;

    &:hover {
      background: var(--alternative-hover-color);
    }
  }

  &__body {
    position: absolute;
    top: 100%;

    max-width: 100%;

    background: var(--alternative-color);
    border-radius: 5px;
    box-shadow: var(--black-shadow);
    
    overflow: hidden;
    transition: all .4s;

    opacity: 0;
    transform: translateY(-50px);
    pointer-events: none;

    &.active, &:hover {
      opacity: 1;
      transform: translate(0);
      pointer-events: all;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      margin: 10px 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 5px 15px;

    cursor: pointer;
    transition: all .4s;

    &:hover {
      background: var(--alternative-hover-color);
    }

    &.add-user {
      border-top: 1px solid var(--text-primary-color);
    }

    span {
      font-size: 12px;
      font-weight: 800;

      &:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
