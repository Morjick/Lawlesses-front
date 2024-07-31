<template>
  <client-only>
    <div class="mobile-navigation">
      <div class="mobile-navigation__inner">
        <div
          v-for="item in localNavigation"
          :key="item.url"
          :class="{
            active: item.isActive
          }"
          class="mobile-navigation__item"
          @click="pushToPage(item.url)"
        >
          <div class="mobile-navigation__avatar"><nuxt-icon :name="item.icon"/></div>
          <div class="mobile-navigation__title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const localNavigation = computed(() => [
  {
    title: t('headerMenu.home'),
    url: '/',
    target: false,
    icon: 'home-avatar',
    isActive: route.path == '/',
  },
  {
    title: t('headerMenu.news'),
    url: '/news',
    icon: 'news-avatar',
    isActive: route.path.includes('/news')
  },
  {
    title: t('headerMenu.aboutGame'),
    url: '/about-game',
    icon: 'about-avatar',
    isActive: route.path.includes('/about-game')
  },
  {
    title: t('other'),
    url: '/forum',
    icon: 'more-vertical',
    isActive: route.path.includes('/forum')
  },
])

const pushToPage = (url: string) => {
  router.push(url)
}
</script>

<style lang="scss">
.mobile-navigation {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  height: 50px;

  padding: 0 10px;

  background: var(--alternative-color);
  border-top: 1px solid var(--primary-color);

  z-index: 50;

  @media (max-width: 500px) {
    display: block;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    cursor: pointer;

    span, svg, path {
      font-size: 22px;
    }

    &.active {
      span, svg, path, .mobile-navigation__title {
        color: var(--primary-color);
      }
    }
  }

  &__title {
    font-size: 16px;
    text-align: center;
  }
}
</style>
