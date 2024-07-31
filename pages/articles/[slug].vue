<template>
  <div class="article-page">
    <section class="article-page__header">
      <h1>{{ article?.title }}</h1>
      <BreadCrumbs :breadcrumbs="breadCrumbs" />
    </section>

    <div>
      <div v-if="!isPageLoad">
        <USkeleton
          class="h-[500px]"
        />
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <USkeleton
            class="h-[350px] w-[45%]"
          />
          <USkeleton
            class="h-[350px] w-[50%]"
          />
        </div>
      </div>
      <section
        v-if="article"
        class="article-page__content"
      >
        <div v-html="article.body"/>
      </section>

      <div class="article-page__other">
        <section v-if="article">
          <h1>{{ $t('otherArticles') }}:</h1>
          <div class="article-page__other-articles">
            <other-article
              v-for="item in otherArticles"
              :key="item.id"
              :article="item"
            />
          </div>
        </section>
        <section>
          <h1>{{ comments?.length ? $t('comments') : $t('haventComments') }}:</h1>
          <div class="article-page__comments">
            <articles-comment
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
              @update:comment="getArticle"
            />
            <add-articles-comment
              @send="sendComment"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadCrumbsItemInterface } from '~/components/global/BreadCrumbs.vue'
import type { ArticleItemInterface } from '../forum/[themeId].vue'
import type { ForumThemeInterface } from '~/components/pages/forum/ForumItem.vue'
import ArticlesComment from '~/components/pages/articles/ArticlesComment.vue'
import OtherArticle from '~/components/pages/articles/OtherArticle.vue'
import AddArticlesComment, { type ArticleCommentEmiterInterface } from '~/components/pages/articles/AddArticlesComment.vue'

const route = useRoute()
const config = useRuntimeConfig()
const { $toast } = useNuxtApp()

const article: Ref<ArticleItemInterface | null> = ref(null)
const breadCrumbs: Ref<BreadCrumbsItemInterface[]> = ref([])
const otherArticles: Ref<ArticleItemInterface[]> = ref([])
const isPageLoad = ref(false)

const slug = computed(() => route.params.slug)
const comments = computed(() => article.value?.comments)

const getArticle = async () => {
  const { body } = await fetching(`forum/get-articles/${slug.value}`)

  article.value = body.article
  otherArticles.value = body.otherArticles

  const theme: ForumThemeInterface = body.theme
  const baseURL = config.public.baseURL

  breadCrumbs.value = [
    {
      title: 'Форум',
      href: '/forum',
      isActive: false,
    },
    {
      title: theme.title,
      href: `/forum/${theme.id}`,
      isActive: false,
    },
    {
      title: article.value?.title || '',
      href: `/${article.value?.id || 1}`,
      isActive: true,
    }
  ]

  useSeoMeta({
    title: article.value?.title,
    description: article.value?.description,
    ogTitle: article.value?.title,
    ogDescription: article.value?.description,
    ogImage: `${baseURL}get-image/${theme.avatar}`
  })

  isPageLoad.value = true
}


const sendComment = async (comment: ArticleCommentEmiterInterface) => {
  const data = await fetching(`forum/send-comment`, {
    body: {
      ...comment,
      articleId: article.value?.id,
    },
    method: 'POST',
  })

  if (data.status === 200) {
    $toast.success(data.message)
    getArticle()
  }
}

useAsyncData('get-article', getArticle)
</script>

<style lang="scss">
.article-page {
  &__content {
    padding: 0 30px;
    margin-left: 50px;

    border-left: 1px solid var(--primary-color);

    @media (max-width: 500px) {
      padding: 0 10px;
      margin-left: 25px;
    }
  }

  &__other {
    display: flex;
    justify-content: flex-start;

    gap: 10px;

    @media (max-width: 500px) {
      flex-direction: column;
    }

    section {
      width: 100%;
      max-width: calc(100vw - 45% - 60px);

      @media (max-width: 500px) {
        max-width: 100%;
        padding: 10px;
      }

      &:first-child {
        width: 25%;

        @media (max-width: 500px) {
          order: 1;
          width: 100%;
        }
      }
    }
  }
}
</style>
