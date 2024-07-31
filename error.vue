<template>
  <div class="error-page">
    <div
      class="error-page__not-found"
    >
      <img
        class="error-page__image"
        src="@/assets/images/error-404.jpg"
        alt=""
      >

      <h1 class="error-page__title">Возникла ошибка!</h1>
      <p
        v-if="errorStatus && errorStatus < 500"
        class="error-page__subtitle"
      >Мы не смогли найти страницу, которую вы ищете. <br> Возможно она была удалена или заморожена.</p>
      <p v-else class="error-page__subtitle">Ошибка: {{ errorMessage }}</p>

      <div class="error-page__buttons">
        <ui-button
          font-size="30px"
          text="На главную"
          mode="danger"
          @click="onClickHomePageButton"
        />
      </div>
    </div>

    <!-- v-if="errorStatus && errorStatus < 500" -->
  </div>
</template>

<script lang="ts" setup>
const error = useError()
const router = useRouter()

const errorStatus = computed(() => error.value?.statusCode)
const errorMessage = computed(() => error.value?.message)

const onClickHomePageButton = () => {
  router.push('/')
}

onMounted(() => {
  console.log(error.value?.message)
})
</script>

<style lang="scss">
.error-page {
  width: 100vw;
  height: 100vh;

  &__not-found {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  &__image {
    display: block;
    height: 50vh;
    border-radius: 20px;
    margin: 0 auto;
  }

  &__title {
    font-size: 50px;
    text-align: center;
  }

  &__subtitle {
    font-size: 24px;
    font-weight: 700;
    text-align: center;

    margin: 20px 0;
  }

  &__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
