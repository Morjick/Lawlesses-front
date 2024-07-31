<template>
  <div
    class="articles-item"
    @click="pushToArticlePage"
  >
    <div class="articles-item__inner">
      <div class="articles-item__header">
        <ui-user-snippet
          :user="article.autor"
        />

        <span class="articles-item__date">{{ time.date }}</span>
      </div>
      <div class="articles-item__body">
        <h3 class="articles-item__title">{{ article.title }}</h3>
        <p class="articles-item__description text-hidden">{{ article.description }}</p>
      </div>
      <div class="articles-item__footer">
        <div class="tags-list primary">
          <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="articles-item__tabs">
          <div class="articles-item__tab">
            <div class="articles-item__tab--image"><nuxt-icon name="eye-show"/></div>
            <span>{{ Number(article.views) }}</span>
          </div>
          <div class="articles-item__tab">
            <div class="articles-item__tab--image"><nuxt-icon name="chat"/></div>
            <span>{{ Number(article.commentsCount) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocalDate } from '~/libs/global/useLocalDate'
import type { ArticleItemInterface } from '~/pages/forum/[themeId].vue'
import UiUserSnippet from '~/components/ui/UiUserSnippet.vue'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleItemInterface>,
    default: () => {},
  },
})

const router = useRouter()

const time = computed(() => useLocalDate(props.article.createdAt))

const pushToArticlePage = () => {
  router.push(`/articles/${props.article.slug}`)
}
</script>

<style lang="scss">
.articles-item {
  box-shadow: 0 0 15px 1px var(--drop-shadow-color);
  border-radius: 5px;

  margin-bottom: 20px;

  overflow: hidden;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px;
  }

  &__date {
    color: var(--text-secondary-color);
  }

  &__body {
    padding: 10px;
  }

  &__title {
    font-size: 22px;
  }

  &__description {
    margin-top: 5px;
    font-weight: 300;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 10px 10px;
  }

  &__tabs {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  &__tab {
    display: flex;
    align-items: center;

    gap: 5px;
    cursor: pointer;

    img {
      width: 20px;
    }
  }
}
</style>
