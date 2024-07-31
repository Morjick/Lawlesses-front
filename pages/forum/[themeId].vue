<template>
  <div class="forum-articles">
    <section class="news-page__header">
      <h1>{{ theme?.title }}</h1>
      <BreadCrumbs :breadcrumbs="breadCrumbs" />
    </section>

    <div v-if="!isPageLoaded">
      <USkeleton class="h-[200px]" style="margin-bottom: 10px"/>
      <USkeleton class="h-[200px]" style="margin-bottom: 10px"/>
      <USkeleton class="h-[200px]" style="margin-bottom: 10px"/>
    </div>

    <div v-else class="forum-articles__content">
      <articles-item
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadCrumbsItemInterface } from '~/components/global/BreadCrumbs.vue'
import ArticlesItem from '~/components/pages/forum/ArticlesItem.vue'
import type { ForumThemeInterface } from '~/components/pages/forum/ForumItem.vue'

export interface ArticleCommentInterface {
  id: number
  message: string
  isModerated: boolean
  isEdited: boolean
  publicDate: string
  likes: number
  dislikes: number
  articleId: number
  moderatorId: number | undefined
  autorId: number
  createdAt: string
  updatedAt: string
  autor: UserInterface
  likersID: number[]
  dislikersID: number[]
}

export interface ArticleItemInterface {
  title: string
  description: string
  views: number
  autorId: number
  tags: string[]
  id: number
  slug: string
  createdAt: string
  autor: UserInterface
  commentsCount?: number
  themeId: number
  body: string
  comments: ArticleCommentInterface[]
}

const breadCrumbs: Ref<BreadCrumbsItemInterface[]> = ref([])

const route = useRoute()
const config = useRuntimeConfig()

const pagination: Ref<NewsPaginationInterface> = ref({
  activePage: 1,
  totalCount: 1,
  totalPage: 1,
  isNextPageButtonActive: false,
  isPrevPageButtonActive: false,
})
const articles: Ref<ArticleItemInterface[]> = ref([])
const theme: Ref<ForumThemeInterface | null> = ref(null)
const isPageLoaded = ref(false)

const getArticles = async () => {
  const { themeId } = route.params
  const { body} = await fetching(`forum/get-articles?themeId=${themeId}`)

  articles.value = body.articles
  pagination.value = body.pagination
  theme.value = body.theme
  const baseURL = config.public.baseURL
  isPageLoaded.value = true
  
  breadCrumbs.value = [
    {
      title: 'Форум',
      href: '/forum',
      isActive: false,
    },
    {
      title: theme.value?.title || '',
      href: `/forum/${theme.value?.id || 1}`,
      isActive: true,
    }
  ]

  useSeoMeta({
    title: theme.value?.title,
    description: theme.value?.description,
    ogTitle: theme.value?.title,
    ogDescription: theme.value?.description,
    ogImage: `${baseURL}get-image/${theme.value?.avatar}`,
  })
}

useAsyncData('get-articles', getArticles)
</script>

<style lang="scss">
.forum-articles {
  &__content {
    padding: 0 30px;

    @media (max-width: 500px) {
      padding: 0;
    }
  }
}
</style>
