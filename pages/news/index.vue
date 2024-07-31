<template>
  <div class="news-page">
    <section class="news-page__header">
      <h1>Новости проекта</h1>
      <BreadCrumbs :breadcrumbs="breadCrumbs" />
    </section>

    <section class="total-news">
      <div class="total-news__avatar"/>
      <div class="total-news__content">
        <h1>{{ totalNews.title }}</h1>
        <div class="total-news__description">
          <div class="total-news__description--body" v-html="totalNews.description" />
          <ui-button
            text="Читать дальше"
            @click="onTotalNewsReadMoreButtonClick"
          />
        </div>
      </div>
    </section>

    <section>
      <h1>Вам будет интересно</h1>

      <news-list />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { BreadCrumbsItemInterface } from '~/components/global/BreadCrumbs.vue';
import NewsList from '~/components/pages/news/NewsList.vue'

useHead({
  title: 'Новости проекта'
})

const router = useRouter()
const newsStore = useNewsStore()

const breadCrumbs: BreadCrumbsItemInterface[] = [
  {
    title: 'Новости',
    href: '/news',
    isActive: true,
  }
]

const totalNews = {
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem praesentium voluptatem quos sapiente ab. Error pariatur repellendus doloribus. Quos soluta hic, pariatur accusamus reprehenderit et?',
  href: '/',
  title: 'Главная новость этой недели',
  autor: {
    name: 'Храмов Матвей',
  },
}

const onTotalNewsReadMoreButtonClick = () => {
  router.push(totalNews.href)
}

onMounted(() => {
  newsStore.getNews()
})
</script>

<style lang="scss">
.news-page {
  &__header {
    h1 {
      padding: 20px 40px 0;

      @media (max-width: 500px) {
        padding: 5px 10px;
      }
    }
  }
}

.total-news {
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  &__avatar {
    width: 900px;
    height: 400px;

    background: var(--helper-color);
    border-radius: 5px;
    flex-shrink: 0;

    @media (max-width: 500px) {
      width: 100%;
      min-height: 150px;
      height: auto;
    }
  }

  &__content {
    width: calc(100% - 900px - 30px);
    height: 400px;

    flex-shrink: 0;

    margin-left: 30px;
    padding: 20px;
    overflow: hidden;

    border-radius: 5px;
    background-color: var(--alternative-color);
    box-shadow: 0 0 5px 0px var(--black-drop-shadow);

    @media (max-width: 500px) {
      width: 100%;
      padding: 5px;
      margin-left: 0;
      margin-top: 10px;
    }
  }

  &__description {
    .ui-button {
      margin-left: calc(100% - 200px);
      margin-top: 20px;
    }

    &--body {
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
