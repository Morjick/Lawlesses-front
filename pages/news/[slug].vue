<template>
  <div class="news-page">
    <div class="news-page__content">
      <BreadCrumbs :breadcrumbs="breadcrumbs" />
      <h1 class="news-page__title">{{ news.title }}</h1>
      <div v-html="news.body"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadCrumbsItemInterface } from '~/components/global/BreadCrumbs.vue';


const route = useRoute()
const news: Ref<NewsItemInterface> = ref({})

const breadcrumbs: Ref<BreadCrumbsItemInterface[]> = ref([
  {
    title: 'Новости',
    href: 'news',
    isActive: true,
  },
])

const getArticle = async () => {
  const slug = route.params.slug
  const data = await fetching(`news/get-news/${slug}`, { fatal: true })

  if (data.status === 200) {
    const localArticle: NewsItemInterface = data.body.news
    news.value = localArticle

    useSeoMeta({
      title: news.value.title,
      appleMobileWebAppTitle: news.value.title,
      ogTitle: news.value.title,
      description: news.value.description,
      ogDescription: news.value.description,
      ogImage: news.value.avatar,
    })

    breadcrumbs.value = [
      {
        title: 'Новости',
        href: '/news',
        isActive: false,
      },
      {
        title: news.value.title,
        href: news.value.slug,
        isActive: true,
      },
    ]
  } else {
    throw createError({ statusCode: data.status })
  }
}

await useAsyncData('get-article', getArticle)

</script>

<style lang="scss" scoped>
.news-page {
  &__content {
    padding: 0 40px;

    @media (max-width: 500px) {
      padding: 0;
    }
  }

  &__title {
    @media (max-width: 500px) {
      margin-bottom: 10px;
    }
  }
}
</style>
