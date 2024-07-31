<template>
  <div
    class="news-item"
    @click="onReadMoreButtonClick"
  >
    <div class="news-item__avatar" />
    <div class="news-item__description">
      <h2 class="news-item__title">{{ title }}</h2>
      <p class="news-item__description-text">{{ description }}</p>

      <div class="news-item__buttons">
        <span class="news-item__date">{{ useLocaleDate(publicDate) }}</span>
        <nuxt-link :to="newsHref">Читать дальше</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocaleDate } from '~/libs/global/useLocaleDate'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  autor: {
    type: Object,
    default: () => {},
  },
  publicDate: {
    type: String,
    default: () => new Date().toLocaleString('ru').toString()
  },
})

const router = useRouter()

const newsHref = computed(() => `/news/${props.slug}`)

const onReadMoreButtonClick = () => {
  router.push(newsHref.value)
}
</script>

<style lang="scss" scoped>
.news-item {
  display: flex;

  width: 32%;
  height: 150px;

  background-color: var(--alternative-color);
  box-shadow: 0 0 5px 0px var(--black-drop-shadow);
  border-radius: 5px;

  @media (max-width: 500px) {
    width: 100%;
  }

  &__avatar {
    width: 150px;
    height: 150px;

    background: var(--helper-color);
    border-radius: 5px;
    margin-right: 20px;

    flex-shrink: 0;

    @media (max-width: 500px) {
      width: 100px;
      height: 150px;
    }
  }

  &__title {
    font-size: 24px;
    margin: 5px 0;

    @media (max-width: 500px) {
      font-size: 18px;
    }
  }

  &__description {
    position: relative;
      
    @media (max-width: 500px) {
      width: 100%;
    }

    &-text {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 5px;
    padding: 0 20px 0 0 ;

    @media (max-width: 500px) {
      position: absolute;
      bottom: 15px;
      width: 100% ;
    }

    span, a {
      @media (max-width: 500px) {
        font-size: 12px;
      }
    }
  }
}
</style>
