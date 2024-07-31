<template>
  <div class="forum-page">
    <section class="news-page__header">
      <h1>{{ $t('forumPage' )}}</h1>
      <BreadCrumbs :breadcrumbs="breadCrumbs" />
    </section>
    <div class="forum-page__items">
      <forum-item
        v-for="theme in themes"
        :id="theme.id"
        :key="theme.id"
        :title="theme.title"
        :description="theme.description"
        :avatar="theme.avatar"
        :tags="theme.tags"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadCrumbsItemInterface } from '~/components/global/BreadCrumbs.vue'
import ForumItem, { type ForumThemeInterface } from '~/components/pages/forum/ForumItem.vue'

const breadCrumbs: BreadCrumbsItemInterface[] = [
  {
    title: 'Форум',
    href: '/forum',
    isActive: true,
  }
]

const themes: Ref<ForumThemeInterface[]> = ref([])

const getThemes = async () => {
  const { body } = await fetching('forum/get-themes')
  
  themes.value = body.themes
}

useSeoMeta({
  title: 'Форум',
  description: 'Темы для игры Lowlesses',
  ogTitle: 'Форум',
  ogDescription: 'Темы для игры Lowlesses',
})

useAsyncData('get-themes', getThemes)
</script>

<style lang="scss">
// .forum-page {}
</style>
