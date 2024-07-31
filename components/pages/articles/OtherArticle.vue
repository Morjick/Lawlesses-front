<template>
  <div class="other-article">
    <div class="other-article__title text-hidden">{{ article.title }}</div>
    <div class="other-article__description text-hidden">{{ article.description }}</div>
    <div class="other-article__button">
      <nuxt-link :to="`/articles/${article.slug}`">Читать дальше</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleItemInterface } from '~/pages/forum/[themeId].vue'

defineProps({
  article: {
    type: Object as PropType<ArticleItemInterface>,
    default: () => {},
  },
})
</script>

<style lang="scss">
.other-article {
  width: 100%;

  padding: 10px 0;
  margin-bottom: 10px;

  &__title {
    font-size: 24px;
    font-weight: 800;
  }

  &__description {
    margin: 5px 0;
  }
}
</style>
