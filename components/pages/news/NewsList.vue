<template>
  <div class="news-list">
    <div class="news-list__container">
      <news-item
        v-for="item in newsList"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :body="item.body"
        :autor="item.autor"
        :slug="item.slug"
        :avatar="item.avatar"
        :public-date="item.publicDate"
      />
    </div>

    <div class="news-list__pagination">
      <news-pagination />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NewsItemInterface } from '~/stores/news.store'
import NewsItem from './NewsItem.vue'
import NewsPagination from './NewsPagination.vue'

const newsStore = useNewsStore()

const newsList: ComputedRef<NewsItemInterface[]> = computed(() => newsStore.getNewsList)
</script>

<style lang="scss">
.news-list {
  &__container {
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;

    // gap: 30px calc(100% - (33% * 3));
    row-gap: 30px;
    column-gap: 3ch;
    margin: 0 auto;
  }
}
</style>
