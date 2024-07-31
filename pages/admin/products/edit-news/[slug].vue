<template>
  <div class="edit-news">
    <div class="admin-page-header">
      <h1 class="admin-title">Создание новости</h1>

      <div class="flexer">
        <ui-button
          mode="danger"
          text="Отмена"
          @click="onConfirm"
        />
        <ui-button
          mode="admin"
          text="Сохранить"
          @click="onSave"
        />
      </div>
    </div>
    <div class="admin-page__content">
      <div class="create-news__platform">
        <div class="create-news__platform--ru half-platform">
          <div class="create-news__subtitle">Локализация для русскоязычных</div>
          <ui-input
            v-model="newsForm.titleRU"
            placeholder="Введите название новости"
            mode="admin"
          />
          <ui-textarea
            v-model="newsForm.descriptionRU"
            mode="admin"
            placeholder="Введите описание новости"
          />
          <ui-editor
            v-model="newsForm.bodyRU"
          />
        </div>
        <div class="create-news__platform--en half-platform">
          <div class="create-news__subtitle">Локализация для англоязычных</div>
          <ui-input
            v-model="newsForm.titleEN"
            placeholder="Введите название новости"
            mode="admin"
          />
          <ui-textarea
            v-model="newsForm.descriptionEN"
            mode="admin"
            placeholder="Введите описание новости"
          />
          <ui-editor
            v-model="newsForm.bodyEN"
          />
        </div>
      </div>
      <div class="create-news__platform block">
        <div class="create-news__subtitle">Общие данные</div>
        <div class="create-news__avatar">
          <admin-set-avatar
            @upload-avatar="onChangeImage"
          />

          <div class="create-news__other">
            <ui-input
              v-model="activeTag"
              placeholder="Добавьте теги для лучшего поиска нововсти и индексации страницы (через Enter)"
              mode="admin"
              title="Через Enter блядь"
              @enter="addTag"
            />
            <div class="tags-list">
              <span
                v-for="tag, ind in tags"
                :key="tag"
                @click="removeTagForIndex(ind)"
              >{{ tag }} &#10008;</span>
            </div>
            <div class="create-news__checkes">
              <ui-checkbox
                v-model="newsForm.isShow"
                mode="admin"
              />
              <span>Опубливать сразу</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <admin-confirm-modal
      ref="confirmModal"
      @cancel="onCancelConfirm"
      @confirm="onCancelButtonClick"
    />
  </div>
</template>

<script lang="ts" setup>
import AdminConfirmModal from '~/components/global/admin/modals/AdminConfirmModal.vue'
import { uploadFiles } from '~/libs/global/uploadFiles';

definePageMeta({
  middleware: ['is-admin'],
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const { $toast } = useNuxtApp()

const slug = computed(() => route.params.slug)

const confirmModal = ref()
const activeTag = ref('')
const tags: Ref<string[]> = ref([])
const newsForm = ref({
  titleRU: '',
  titleEN: '',
  descriptionRU: '',
  descriptionEN: '',
  bodyRU: '',
  bodyEN: '',
  isShow: false,
  avatar: '',
})

const onCancelButtonClick = () => router.push('/admin/products/news')
const onConfirm = () => {
  confirmModal.value.init()
}

const onChangeImage = async (file: File) => {
  const path = await uploadFiles(file)

  if (typeof path === 'string') {
    newsForm.value.avatar = path
  }
}

const getNews = async () => {
  const data = await fetching(`news/get-news-edit/${slug.value}`)

  if (data.status === 200) {
    newsForm.value = data.body.news
    tags.value = data.body.news.tags || []
  }
}

const onCancelConfirm = () => {}
const onSave = async () => {
  const data = await fetching(`news/update-news/${slug.value}`, {
    method: 'POST',
    body: {
      ...newsForm.value,
      tags: tags.value
    },
  })

  if (data.status === 200) {
    router.push('/admin/products/news')
    $toast.success('Новость успешно отредактирована')
  }
}

const addTag = (tag: string) => {
  if (!tag || !tag.length) return

  tags.value.push(tag)
  tags.value = [...new Set(tags.value)]
  activeTag.value = ''
}

const removeTagForIndex = (index: number) => {
  tags.value = tags.value.filter((el, ind) => ind !== index)
}

onMounted(() => {
  getNews()
})
</script>

<style lang="scss">
// .edit-news {}
</style>
