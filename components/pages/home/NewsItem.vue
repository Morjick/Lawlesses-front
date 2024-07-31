<template>
  <div
    class="news-item"
    :class="{
      sizeM: props.newsSize === 'M',
      sizeL: props.newsSize === 'L',
    }"
  >
    <div class="news-item__header">
      <div class="news-item__title text-hidden">{{ props.news.title }}</div>
      <div class="news-item__date">
        <span class="text-hidden">{{ props.news.date }}</span>
      </div>
    </div>

    <div class="news-item__body">
      <div class="news-item__image" />
      <div class="news-item__content">
        <p class="news-item__text" v-html="props.news.body"/>

        <ui-button
          v-if="!!props.news.href"
          :text="t(props.buttonText)"
          @click="onReadButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { HomeNewsInterface } from '~/stores/news.store';
const { t } = useI18n()

export type HomeNewsItemSizeType = 'M' | 'L'

const props = defineProps({
  buttonText: {
    type: String,
    default: 'toRead'
  },
  newsSize: {
    type: String as PropType<HomeNewsItemSizeType>,
    default: 'M'
  },
  news: {
    type: Object as PropType<HomeNewsInterface>,
    default: () => {}
  }
})

const $router = useRouter()

const imageUrl = ref('')

const onReadButtonClick = () => {
  if (!props.news.href) return

  $router.push(props.news.href)
}

onMounted(() => {
  imageUrl.value = props.news.image
})
</script>

<style lang="scss" scoped>
.news-item {
  max-width: 100%;
  max-height: 250px;

  box-shadow: var(--black-shadow);
  border-radius: 10px;
  overflow: hidden;

  background-color: var(--alternative-color);
  padding: 20px;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  &.sizeL {
    min-height: 540px;
    height: 100%;

    .news-item__text {
      -webkit-line-clamp: 11;

      margin-bottom: 30px;
    }

    .news-item__image {
      width: 50%;
      height: auto;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 30px;
    font-weight: 700;
    -webkit-line-clamp: 1;
  }

  &__date {
    span {
      font-weight: 400;
      font-size: 15px;
      color: var(--span-color);
      -webkit-line-clamp: 1;
    }
  }

  &__body {
    display: flex;
    justify-content: space-between;

    font-size: 20px;
    font-weight: 400;

    margin-top: 20px;

    .ui-button {
      margin-top: 40px;
      margin-left: calc(100% - 170px);
    }
  }

  &__image {
    width: 160px;
    height: 160px;

    background-color: #CACACA;
    background-image: v-bind(imageUrl);
    background-size: cover;
    background-repeat: no-repeat;

    margin-right: 20px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  &__text {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 10px;
  }
}
</style>
