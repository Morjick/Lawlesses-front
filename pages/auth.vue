<template>
  <div class="auth-page">
    <div class="auth-page__modal">
      <div class="auth-page__image" />
      <div class="auth-page__form">
        <h1 class="auth-page__title">Авторизация</h1>
        <p class="auth-page__description">Создать аккаунт вы можете из игрового клиента</p>

        <p
          v-if="authError"
          class="auth-page__error"
        >{{ authError.message }}</p>

        <ui-input
          v-model="form.username"
          input-type="text"
          placeholder="Введите ваш никнейм"
          :min-length="3"
        />

        <ui-input
          v-model="form.password"
          input-type="password"
          placeholder="Введите ваш пароль"
          :min-length="6"
          @enter="sendForm"
        />

        <div class="auth-page__links">
          <nuxt-link to="/remember-password">Забыл пароль</nuxt-link>
          <nuxt-link to="/remember-password">Зарегистрироваться</nuxt-link>
        </div>

        <ui-button
          text="На главную"
          mode="danger"
          @click="toHomePage"
        />
        <ui-button
          text="Отправить"
          :disabled="!isFormValid"
          @click="sendForm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LoginDataInterface } from '~/stores/auth.store';

const emits = defineEmits(['set-layout',])
definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const authStore = useAuthStore()

const form: Ref<LoginDataInterface> = ref({
  username: '',
  password: '',
})

const isFormValid = computed(() => {
  if (!form.value.username?.length || !form.value.password?.length) return false

  return true
})
const authError = computed(() => authStore.getErrors)

const sendForm = async () => {
  if (!isFormValid.value) return
  await authStore.login(form.value)
}

const toHomePage = () => {
  emits('set-layout', 'default')
  router.push('/')
}

onMounted(() => {
  setPageLayout('auth')
})

</script>

<style lang="scss" scoped>
.auth-page {
  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    max-width: 600px;
    width: 100%;

    padding: 5px 20px;
    border-radius: 5px;

    box-shadow: 0 0 5px 0px var(--shadow-color);
  }

  &__title {
    text-align: center;
    font-weight: 800;

    margin: 5px 0;
  }

  &__description {
    margin-bottom: 20px;

    text-align: center;
    font-size: 16px;
    color: var(--text-secondary-color);
  }

  &__error {
    color: var(--danger-color);
  }

  &__links {
    display: flex;
    justify-content: space-between;
  }

  &__form {
    .ui-button {
      width: 100%;
      margin: 20px 0 15px;

      &:last-child {
        margin: 0px 0 15px;
      }
    }
  }
}
</style>
