<template>
  <div v-if="userForm" class="personal-tab">
    <div class="personal-tab__item">
      <h2>Пользователь:</h2>

      <ui-input
        v-model="userForm.username"
        placeholder="Никнейм"
      />

      <ui-input
        v-model="userForm.firstname"
        placeholder="Имя"
      />

      <ui-input
        v-model="userForm.lastname"
        placeholder="Фамилия"
      />

      <ui-input
        v-model="userForm.patronomic"
        placeholder="Отчество"
      />
    </div>
    <div class="personal-tab__item">
      <h2>Аватар:</h2>
      <div class="personal-tab__image"/>
      <admin-set-avatar
        @upload-avatar="onUpdateAvatar"
      />
    </div>

    <div class="personal-tab__buttons">
      <ui-button
        text="Сохранить"
        @click="onSave"
      />
    </div>

    <!-- рефералка -->
  </div>
</template>

<script lang="ts" setup>
import { uploadFiles } from '~/libs/global/uploadFiles'

const authStore = useAuthStore()
const { $toast } = useNuxtApp()

const avatar = ref()
const userForm: Ref<UserInterface | null> = ref(null)

const onUpdateAvatar = async (file: File) => {
  avatar.value = file
}

const saveAvatar = async () => {
  const path = await uploadFiles(avatar.value)

  if (!avatar.value) return authStore.getUser?.avatar

  return path
}

const onSave = async () => {
  if (!userForm.value) return

  const updatedAvatar = await saveAvatar()

  userForm.value.avatar = typeof updatedAvatar === 'string'
    ? updatedAvatar
    : Array.isArray(updatedAvatar)
      ? updatedAvatar[0]
      : ''

  const data = await fetching(`user/update-user`, {
    method: 'POST',
    body: {
      ...userForm.value,
      avatar: updatedAvatar,
    }
  })

  if (data.status === 200) {
    $toast.success(data.messsage || 'Данные успешно обновлены')
  }
}

onMounted(() => {
  setTimeout(() => {
    userForm.value = authStore.getUser
  }, 100)
})
</script>

<style lang="scss">
.personal-tab {
  &__item {
    padding: 20px;
    border-radius: 5px;
    // border: 1px solid var(--alternative-color);
    box-shadow: var(--black-shadow);
    margin-bottom: 30px;

    overflow: hidden;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
