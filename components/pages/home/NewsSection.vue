<template>
  <div
    v-if="homeNews.length"
    class="news-section"
  >
    <news-item
      news-size="L"
      :news="homeNews[0]"
    />

    <div>
      <news-item
        :news="homeNews[1]"
      />
      <news-item
        :news="homeNews[2]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNewsStore } from '~/stores/news.store'
import NewsItem from './NewsItem.vue'

const newsStore = useNewsStore()

const homeNews = computed(() => newsStore.homeNews)
</script>

<style lang="scss" scoped>
.news-section {
  display: flex;
  justify-content: space-between;

  gap: 30px;
  margin: 20px 0 75px;

  @media (max-width: 500px) {
    display: none;
  }
}
</style>
