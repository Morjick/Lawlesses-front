<template>
  <div>
    <ui-section>
      <template #content>
        <div class="home-page__content">
          <div class="home-page--image" />
          <div class="home-page__description">
            <!-- <h1>Исследуй мир Lowlesses!</h1> -->
            <h1>{{ $t('exploreLowlesses') }}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut porro tempore cum ipsum similique necessitatibus! Repellat incidunt earum dolorem dignissimos, accusamus delectus ipsa error numquam voluptatibus. Quasi quaerat reprehenderit laboriosam non nemo similique eius eaque, doloremque ad aliquam nesciunt. Soluta, necessitatibus laborum? Quos velit dicta ducimus? Exercitationem corrupti nam asperiores at odio, laudantium repellat et sapiente ea, fugiat dolorum itaque repellendus molestiae facilis quisquam cumque impedit rem natus ducimus nisi libero dolor! Expedita in dolores nobis omnis ipsum ab labore quae veniam incidunt ipsam velit, repellendus recusandae illum minima hic accusantium natus consequatur nostrum sapiente non voluptatem iure soluta, possimus perspiciatis! Tempore, accusantium ipsa pariatur ullam aliquam quasi expedita sed, assumenda consequuntur quaerat culpa. Deserunt debitis blanditiis molestias nulla ad a suscipit mollitia ipsum tempore, repellendus laboriosam nisi velit sequi illo expedita qui commodi. Alias, illo ducimus assumenda ex enim laudantium eligendi nobis placeat omnis ut cupiditate nihil quisquam molestiae. velit sequi illo expedita qui commodi. Alias, illo ducimus assumenda ex enim laudantium eligendi nobis placeat omnis ut cupiditate nihil quisquam molestiae.</p>

            <div class="home-page__buttons">
              <ui-button
                :text="$t('playForFree')"
                mode="danger"
                font-size="30px"
              />
            </div>
          </div>
        </div>
      </template>
    </ui-section>

    <news-section />
    <autor-list :autor-list="autors" />
    <referal />
  </div>
</template>

<script lang="ts" setup>
import NewsSection from '~/components/pages/home/NewsSection.vue'
import AutorList from '~/components/pages/home/AutorList.vue'
import Referal from '~/components/pages/home/Referal.vue'
import { useNewsStore } from '~/stores/news.store'

const newsStore = useNewsStore()
const autors = computed(() => newsStore.getAutors)

await useAsyncData('autors', () => newsStore.getProfectAutors())
</script>

<style lang="scss" scoped>
.home-page {
  &__content {
    display: flex;
    gap: 40px;

    @media (max-width: 500px) {
      flex-direction: column;
      gap: 10px;
    }
  }

  &--image {
    display: block;
    width: 100%;
    min-width: 50%;

    border-radius: 10px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@/assets/images/main-map.png');

    @media (max-width: 500px) {
      width: 100%;
      min-width: 100%;
      min-height: 150px;
    }
  }
  
  &__description {
    max-width: 1000px;
  }

  &__buttons {
    margin-top: 20px;
    text-align: right;

    @media (max-width: 500px) {
      text-align: center;
    }
  }
}
</style>
