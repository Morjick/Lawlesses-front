<template>
  <div
    class="admin-set-avatar"
    @click="onContainerClick"
  >
    <div
      ref="imageHTML"
      class="admin-set-avatar--image"
    />
    <div class="admin-set-avatar__upload">
      <p v-if="title && title.length">{{ title }}</p>
      <span v-if="subtitle && subtitle.length">{{ subtitle }}</span>
    </div>

    <input
      ref="targetInput"
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      @change="onChange"
    >
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['upload-avatar'])
defineProps({
  title: {
    type: String,
    default: 'Загрузить изображение'
  },
  subtitle: {
    type: String,
    default: 'Размер изображения 900x400'
  }
})

const { $toast } = useNuxtApp()

const targetInput = ref()
const imageHTML = ref()

// eslint-disable-next-line
const onChange = (event: any) => {
  const file = event?.target?.files[0]

  if (!file) return

  if (file.size >= 5242880) {
    $toast.warning('Изображение слишком много весит, скорее всего оно не будет загружено')
    return
  }

  const reader = new FileReader()
  reader.onloadend = () => {
    imageHTML.value.style.backgroundImage = `url("${reader.result}")`
  }

  reader.readAsDataURL(file)
  emits('upload-avatar', file)
}

const onContainerClick = () => {
  targetInput.value.click()
}
</script>

<style lang="scss">
.admin-set-avatar {
  position: relative;

  width: 900px;
  height: 400px;

  border: 2px dashed var(--admin-primary-color);
  border-radius: 5px;
  margin: 20px 0;
  cursor: pointer;

  input {
    display: none;
    opacity: 0;
    pointer-events: none;
  }

  &--image {
    max-width: 900px;
    max-height: 400px;
    width: 100%;
    height: 100%;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &__upload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;

    p {
      font-size: 24px;
      font-weight: 800;
      color: var(--admin-primary-color);
    }

    span {
      font-size: 18px;
      font-weight: 300;
      color: var(--admin-primary-color);
    }
  }
}
</style>
