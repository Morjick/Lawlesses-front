<template>
  <div
    v-if="Boolean(isAuth)"
    class="add-articles-comment"
  >
    <div class="add-articles-comment__title">{{ $t('addComment') }}</div>
    <div class="add-articles-comment__body">
      <ui-textarea
        v-model="message"
        mode="primary"
        @enter="onSend"
      />
    </div>
    <div
      v-if="images.length"
      class="add-articles-comment__images"
    >
      <div
        v-for="image in images"
        :key="image.id"
        :style="{
          backgroundImage: `url('${image.background}')`
        }"
        class="item"
      />
    </div>
    <div class="add-articles-comment__footer">
      <div
        class="add-articles-comment__add-files"
        @click="onAddFilesClick"
      >
        <input
          ref="filesInput"
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          @change="onFilesTrigger"
        >
        <nuxt-icon name="attachment" />
        <span class="add-articles-comment__attachment-span">{{ $t('addFiles') }}</span>
      </div>
      <div
        v-if="role === 'ADMIN' || role === 'ROOT'"
        class="add-articles-comment__team-autor"
      >
        <ui-checkbox
          v-model="onTeamMessage"
        />
        <span>Отправить от имени разработчика</span>
      </div>
      <ui-button
        :text="$t('send')"
        :disabled="isMessageInvalid"
        @click="onSend"
      />
    </div>
  </div>
  <div
    v-else
    class="add-articles-comment__title"
    style="margin: 10px 0;"
  >{{ $t('thenSendCommentMustBeAuth') }}</div>
</template>

<script lang="ts" setup>
import { uploadFiles } from '~/libs/global/uploadFiles';

const maxImagesCount = 5

export interface FileReaderImageInterface {
  id: number
  background: string | ArrayBuffer | null
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export interface ArticleCommentEmiterInterface {
  message: string
  files: string[]
}

const emits = defineEmits(['send'])

const authStore = useAuthStore()
const { $toast } = useNuxtApp()
const { t: $t } = useI18n()

const isAuth = computed(() => authStore.getIsAuth)
const isMessageInvalid = computed(() => message.value.length <= 5)
const role = computed(() => authStore.getRole)

const message = ref('')
const filesInput = ref()
const images: Ref<FileReaderImageInterface[]> = ref([])
const fileImages: Ref<File[]> = ref([])
const onTeamMessage = ref(false)

const onAddFilesClick = () => {
  if (!filesInput.value) return

  filesInput.value.click()
}

const onFilesTrigger = (event: HTMLInputEvent) => {
  const inputFiles = event.target.files
  const imageArr: FileReaderImageInterface[] = []

  if (!inputFiles || !inputFiles.length) return

  if (inputFiles.length >= maxImagesCount || images.value.length >= maxImagesCount) {
    $toast.warning(`${$t('maxImagesCount')} - 5`)

    return
  }

  fileImages.value = [...inputFiles]

  for (let i = 0; i < inputFiles.length; i++) {
    if (inputFiles[i].size >= 5242880) {
      $toast.warning('Изображение слишком много весит, скорее всего оно не будет загружено')
      return
    }

    const item: FileReaderImageInterface = {
      background: '',
      id: i,
    }
    const reader = new FileReader()

    reader.onload = () => {
      item.background = reader.result
    }

    reader.onloadend = () => {
      imageArr.push(item)
    }

    reader.readAsDataURL(inputFiles[i])
  }

  message.value = ''
  images.value = []
  fileImages.value = []

  setTimeout(() => {
    images.value = [...images.value, ...imageArr]
  }, 500)
}

const onSend = async () => {
  if (!message.value || (!message.value && !images.value)) {
    $toast.error($t('cannotSendComment'))
    return
  }

  const paths = await uploadFiles(fileImages.value)

  emits('send', {
    message: message.value,
    files: paths,
  })
}
</script>

<style lang="scss" scoped>
.add-articles-comment {
  margin: 20px 0;

  &__title {
    font-size: 24px;
    font-weight: 800;

    margin-bottom: 15px;
  }

  &__footer {
    display: flex;

    width: 100%;

    margin: 10px 0;
    gap: 20px;

    .ui-button {
      margin-left: auto;

      @media (max-width: 500px) {
        order: 2;
      }
    }

    * {
      flex-shrink: 0;
    }

    @media (max-width: 500px) {
      align-items: center;
      flex-wrap: wrap;
    }
  }

  &__images {
    display: flex;
    flex-wrap: wrap;

    gap: 10px;
    padding: 5px;
    margin: 10px 0;
    border-radius: 5px;

    background: var(--alternative-color);
    overflow: hidden;

    .item {
      width: 100px;
      height: 100px;

      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      border-radius: 5px;
      overflow: hidden;
    }
  }

  &__add-files {
    display: flex;
    align-items: center;

    gap: 2px;
    padding: 10px;
    border-radius: 5px;
    
    background: var(--alternative-color);
    box-shadow: var(--black-shadow);

    cursor: pointer;
    overflow: hidden;
    transition: all .4s;
    font-size: 16px;
    font-weight: 400;

    &:hover {
      background: var(--alternative-hover-color);
    }

    input {
      display: none;
    }

    img {
      width: 25px;
    }

    span {
      font-size: 16px;
      font-weight: 400;
    }

    @media (max-width: 500px) {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 55px;
      height: 55px;

      .nuxt-icon {
        transform: scale(2);
      }
    }
  }

  &__attachment-span {
    @media (max-width: 500px) {
      display: none;
    }
  }

  &__team-autor {
    display: flex;
    align-items: center;

    gap: 10px;

    @media (max-width: 500px) {
      order: 3;
    }
  }
}
</style>
