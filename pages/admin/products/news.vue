<template>
  <div class="admin-news">
    <div class="admin-page-header">
      <h1 class="admin-title">Новости</h1>
      <admin-search />

      <ui-button
        mode="admin"
        text="Создать новость"
        @click="pushToCreateNewsPage"
      />
    </div>
    <div class="admin-news__content">
      <div class="admin-news__category category">
        <div class="category__item">
          <div class="category__image primary">
            <img
              src="~/assets/icons/writing.svg"
              alt=""
            >
          </div>
          <div class="category__content">
            <p class="category__title">Все новости</p>
            <span class="category__count">250</span>
          </div>
        </div>

        <div class="category__item">
          <div class="category__image gold">
            <img
              src="~/assets/icons/in-modaration.svg"
              alt=""
            >
          </div>
          <div class="category__content">
            <p class="category__title">На модерации</p>
            <span class="category__count">15</span>
          </div>
        </div>
        
        <div class="category__item">
          <div class="category__image aproove">
            <img
              src="~/assets/icons/personas.svg"
              alt=""
            >
          </div>
          <div class="category__content">
            <p class="category__title">Опубликованы</p>
            <span class="category__count">218</span>
          </div>
        </div>

        <div class="category__item">
          <div class="category__image blue">
            <img
              src="~/assets/icons/in-stack.svg"
              alt=""
            >
          </div>
          <div class="category__content">
            <p class="category__title">В очереди</p>
            <span class="category__count">2</span>
          </div>
        </div>
        <div class="category__item">
          <div class="category__image red">
            <img
              src="~/assets/icons/clear-red.svg"
              alt=""
            >
          </div>
          <div class="category__content">
            <p class="category__title">Скрыты</p>
            <span class="category__count">15</span>
          </div>
        </div>
      </div>

      <div class="admin-news__table">
        <admin-table
          :header="newsTableHeader"
          :pagination="pagination"
          :limit="Number(newsLimit) || 20"
          :offset="Number(newsOffset) || 0"
          :is-loading="isLoading"
          @update-limit="onUpdateLimit"
          @change-page="onChangePage"
        >
          <template #body>
            <div
              v-for="item in news"
              :key="item.id"
              class="table-item"
            >
              <div
                :style="{
                  width: '80px'
                }"
              >
                <ui-checkbox
                  v-model="item.isChecked"
                  mode="admin"
                />
              </div>
              <div
                :style="{
                  width: newsTableHeader[0].width
                }"
              >{{ item.id }}</div>
              <div
                :style="{
                  width: newsTableHeader[1].width
                }"
              >
                <ui-avatar
                  :url="item.avatar"
                  style="width: 50px;"
                />
              </div>
              <div
                :style="{
                  width: newsTableHeader[2].width
                }"
                class="table-body__item title"
              >{{ item.title }}</div>
              <div
                :style="{
                  width: newsTableHeader[3].width
                }"
                class="table-body__item pointer admin-href"
                @click="onNewsItemSlugClick(item.slug)"
              >{{ item.slug }}</div>
              <div
                :style="{
                  width: newsTableHeader[4].width
                }"
                class="table-body__item"
              >
                status
              </div>
              <div
                :style="{
                  width: newsTableHeader[5].width
                }"
                class="table-body__item tag-container"
              >
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                >{{ tag }}</span>
              </div>
              <div
                class="table-body__item icons"
              >
                <div @click="onEditClick(item)">
                  <img src="~/assets/icons/edit.svg" alt="">
                </div>
                <div @click="onDeleteNews">
                  <img src="~/assets/icons/trash.svg" alt="">
                </div>
              </div>
            </div>
          </template>
        </admin-table>
      </div>
    </div>
    <admin-confirm-modal
      ref="deleteConfirmModal"
      @cancel="onCancel"
      @confirm="onConfirmDeleteNews"
    />
  </div>
</template>

<script lang="ts" setup>
import type { AdminTablePaginationStaticInterface, AdminTableHeaderItemInterface } from '~/components/global/admin/table/AdminTable.vue'
import AdminConfirmModal from '~/components/global/admin/modals/AdminConfirmModal.vue'

definePageMeta({
  middleware: ['is-admin'],
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const { $toast } = useNuxtApp()

const newsTableHeader: AdminTableHeaderItemInterface[] = [
  {
    value: 'ID',
    width: '50px',
  },
  {
    value: 'Аватар',
    width: '100px',
  },
  {
    value: 'Название',
    width: '350px',
  },
  {
    value: 'Ссылка',
    width: '350px',
  },
  {
    value: 'Статус',
    width: '200px',
  },
  {
    value: 'Тэги',
    width: '270px',
  },
]
const news: Ref<NewsItemInterface[]> = ref([])
const newsLimit = ref(route.query.limit || 5)
const newsOffset = ref(route.query.offset || 0)
const isLoading = ref(true)
const deleteConfirmModal = ref()
const pagination: Ref<AdminTablePaginationStaticInterface> = ref({
  activePage: 1,
  totalCount: 20,
  totalPages: 5,
  limit: 5,
  offset: 0,
  isNextPageAvaible: true,
  isPrevPageAvaible: false
})

const checkedItemsID = computed(() => news.value.filter((el: NewsItemInterface) => {
  if (el.isChecked) return el
}))

const getNews = async () => {
  isLoading.value = true
  const { body } = await fetching(`news/get-many?limit=${newsLimit.value}&offset=${newsOffset.value}`)

  
  if (!body) return

  news.value = body.news.map((el: NewsItemInterface) => {
    return {
      ...el,
      isChecked: false
    }
  })
  pagination.value = body.pagination

  setTimeout(() => isLoading.value = false, 200)
}

const onCancel = () => {
  deleteConfirmModal.value.disabled()
}

const onDeleteNews = () => {
  deleteConfirmModal.value.init()
}

const onConfirmDeleteNews = async () => {
  checkedItemsID.value.forEach(async (element) => {
    await fetching(`news/${element.slug}`, {
      method: 'DELETE',
    })
  })
  deleteConfirmModal.value.disabled()
  $toast.success('Новость была удалена')
}

const onUpdateLimit = (value: number) => {
  router.replace({ query: { ...route.query, limit: value } })
  newsLimit.value = value
  getNews()
}

const onNewsItemSlugClick = (slug: string) => {
  window.open(`/news/${slug}`, '_blank')
}

const onEditClick = (item: NewsItemInterface) => {
  router.push(`/admin/products/edit-news/${item.slug}`)
}

const onChangePage = (page: number) => {
  if (!newsLimit.value || typeof Number(newsLimit.value) !== 'number') return
  const localOffset = page * Number(newsLimit.value) - Number(newsLimit.value)

  newsOffset.value = localOffset
  router.replace({ query: { ...route.query, offset: localOffset } })
  getNews()
}

const pushToCreateNewsPage = () => router.push('/admin/products/create-news')

onMounted(() => {
  getNews()
})
</script>

<style lang="scss" scoped>
.admin-news {
  &__table {
    margin: 60px 0;
  }
}

.category {
  display: flex;
  align-items: center;

  gap: 30px;

  &__item {
    display: flex;
    width: 100%;

    background-color: var(--admin-secondary-color);
    border: 1px solid var(--admin-background-helper-color);

    border-radius: 10px;
    padding: 15px 30px;

    cursor: pointer;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 10px;
    padding: 10px;

    border-radius: 50%;

    &.primary {
      background: var(--admin-primary-color--opacity);
    }

    &.gold {
      background: var(--admin-gold-color--opacity);
    }

    &.aproove {
      background: var(--admin-aproove-color--opacity);
    }

    &.blue {
      background: var(--admin-blue-color--opacity);
    }

    &.red {
      background: var(--danger-color--opacity);
    }
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__count {
    font-size: 16px;
    font-weight: 300;
  }
}

.tag-container {
  display: flex;
  flex-wrap: wrap;

  span {
    padding: 5px;
    border-radius: 2px;
    border: 1px solid var(--admin-primary-color);
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
