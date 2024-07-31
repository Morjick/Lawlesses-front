<template>
  <div class="settings-page">
    <section class="news-page__header">
      <h1>{{ $t('settings') }}</h1>
      <BreadCrumbs :breadcrumbs="breadCrumbs" />
    </section>
    <div class="settings-page__container">
      <div class="settings-page__sidebar">
        <setting-sidebar
          :navigation="sidebarNavigation"
          @change-tab="onChangeTab"
        />
      </div>
      <section
        v-if="activeTab"
        class="settings-page__content"
      >
        <h1 class="settings-page__title">{{ activeTab.title }}</h1>
        <client-only>
          <perosnal-tab v-if="activeTab.type === 'personal'"/>
        </client-only>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadCrumbsItemInterface } from '~/components/global/BreadCrumbs.vue'
import SettingSidebar from '~/components/pages/settings/Sidebar.vue'
import PerosnalTab from '~/components/pages/settings/tabs/PersonalTab.vue'

export type SettingsSidebarNavigationValueType = 'personal' | 'billing' | 'support' | 'statistik'

export interface SettingsSidebarNavigationItemInterface {
  icon: string
  title: string
  isActive: boolean
  type: SettingsSidebarNavigationValueType
}

const breadCrumbs: BreadCrumbsItemInterface[] = [
  {
    title: 'Настройки',
    href: '/settings',
    isActive: true,
  }
]

const { t: $t } = useI18n()

const sidebarNavigation: Ref<SettingsSidebarNavigationItemInterface[]> = ref([
  {
    title: $t('personalData'),
    icon: 'personal',
    isActive: true,
    type: 'personal',
  },
  {
    title: $t('billing'),
    icon: 'wallet',
    isActive: false,
    type: 'billing',
  },
  {
    title: $t('support'),
    icon: 'question',
    isActive: false,
    type: 'support',
  },
  {
    title: $t('statistik'),
    icon: 'graph',
    isActive: false,
    type: 'statistik',
  },
])

const activeTab = computed(() => sidebarNavigation.value.find((el) => Boolean(el.isActive)))

const onChangeTab = (item :SettingsSidebarNavigationItemInterface) => {
  sidebarNavigation.value = sidebarNavigation.value.map((el) => {
    return {
      ...el,
      isActive: el.title === item.title,
    }
  })
}
</script>

<style lang="scss">
.settings-page {
  &__container {
    display: flex;
    padding: 0 30px 0 20px;

    gap: 50px;
  }

  &__title {
    margin: 0 0 30px 0;
  }
}
</style>
