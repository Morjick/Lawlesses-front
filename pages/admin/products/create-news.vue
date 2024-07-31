<template>
  <div class="create-news">
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
          <admin-set-avatar @upload-avatar="onChangeImage" />

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
      @cancel="onCancel"
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

const router = useRouter()
const { $toast } = useNuxtApp()

const confirmModal = ref()
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
const activeTag = ref('')
const tags: Ref<string[]> = ref([])

const onCancelButtonClick = () => router.push('/admin/products/news')
const onConfirm = () => {
  confirmModal.value.init()
}
const onCancel = () => {
  confirmModal.value.disabled()
}

const onChangeImage = async (file: File) => {
  const path = await uploadFiles(file)

  if (typeof path === 'string') {
    newsForm.value.avatar = path
  }
}

const onSave = async () => {
  try {
    const data = await fetching('news/create', {
      method: 'POST',
      body: {
        ...newsForm.value,
        tags: tags.value,
      }
    })

    if (data.status !== 200) throw new Error()

    $toast.success('Новость была сохранена')
    router.push('/admin/products/news')
  } catch (e) {
    console.log('error', e)
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
</script>

<style lang="scss">
.create-news {
  &__subtitle {
    margin: 10px 0 20px;

    font-size: 24px;
    font-weight: 800;
    text-align: center;
  }
  
  &__platform {
    display: flex;
    justify-content: center;

    width: 100%;

    background: var(--admin-background-secondary-color);
    box-shadow: var(--admin-main-shadow);
    border-radius: 5px;
    margin: 0 auto 20px;

    .half-platform {
      width: 49%;
      padding: 10px;

      .ui-input {
        width: 100%;
      }
    }

    &.block {
      display: block;

      padding: 20px;
    }

    &--ru {
      border-right: 1px dashed var(--admin-font-primary);
    }
  }

  &__avatar {
    display: flex;

    gap: 40px;
  }

  &__other {
    width: 50%;
    margin: 20px 0;
  }

  &__checkes {
    display: flex;
    align-items: center;

    gap: 10px;
  }
}
</style>
