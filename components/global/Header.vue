<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo" @click="toHomePage">Lowlesses</div>
      <nav class="header__navigation">
        <nuxt-link
          v-for="item in localNavigation"
          :key="item.url"
          :to="item.url"
          :target="item.target ? '_blanc' : '_parent'"
          class="header__item"
        >{{ item.title }}</nuxt-link>
      </nav>
      <div class="header__online">
        <div class="header__online--circle"/>
        <span>1.235</span>
        <client-only>
          <theme-switcher
            :checked="isThemeSwitcherChecked"
            @switch-theme="changeColorTheme"
          />
        </client-only>
      </div>
      <ui-select
        v-model="userLanguage"
        :items="localesList"
        placeholder="Выберите язык"
        @update-element="onUpdateLanguage"
      />
      <client-only>
        <ui-button
          v-if="!isAuth"
          :text="$t('toAuth')"
          style="width: 192px;"
          @click="toAuth"
        />
        <user-switcher />
      </client-only>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { UiSelectItemInterface } from '../ui/UiSelect.vue'

const router = useRouter()
const { t, setLocale } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const colorMode = useColorMode()

const localNavigation = computed(() => [
  {
    title: t('headerMenu.home'),
    url: '/',
    target: false,
  },
  {
    title: t('headerMenu.news'),
    url: '/news',
  },
  {
    title: t('headerMenu.aboutGame'),
    url: '/about-game',
  },
  {
    title: t('headerMenu.forum'),
    url: '/forum',
  },
])

const localesList: UiSelectItemInterface[] = [
  {
    title: 'Русский',
    value: 'ru-RU'
  },
  {
    title: 'English',
    value: 'en-EN'
  },
]

const language = computed((): LanguageListType => appStore.getLanguage)
const userLanguage = computed(() => {
  const element = localesList.find(el => el.value === language.value)

  return element || localesList[0]
})
const isAuth = computed(() => authStore.getIsAuth)
const isThemeSwitcherChecked = computed(() => colorMode.preference === 'light')

const toAuth = () => {
  router.push('/auth')
}

const toHomePage = () => router.push('/')

const onUpdateLanguage = (language: UiSelectItemInterface) => {
  setLocale(String(language.value))
}

const changeColorTheme = (isChecked: boolean) => {
  colorMode.preference = isChecked ? 'light' : 'dark'
}
</script>

<style lang="scss">
.header {
  display: block;
  position: sticky;
  height: var(--header-height);

  background-color: var(--alternative-color);
  box-shadow: 0 0 10px 1px var(--drop-shadow-color);
  border-radius: 10px;
  padding: 20px 40px;

  @media (max-width: 500px) {
    display: none
  }

  &__inner {
    display: flex;
    align-items: center;
  }

  &__logo {
    font-weight: bold;
    font-size: 40px;
    text-shadow: #3840FF 0 0 10px;
    color: var(--primary-color);

    margin-right: 130px;
    cursor: pointer;

    @media (max-width: 500px) {
      font-size: 20px;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    gap: 50px
  }

  &__item {
    color: var(--text-primary-color);
    font-size: 20px;
  }

  &__online {
    display: flex;
    align-items: center;

    margin-left: auto;
    margin-right: 75px;

    &--circle {
      width: 1px;
      height: 1px;

      border-radius: 100%;

      background-color: var(--approove-color);
      box-shadow: 0 0 8px 8px var(--approove-color);

      margin-right: 30px;
    }

    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
