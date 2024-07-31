<template>
  <div class="admin-table">
    <div class="admin-table__inner">
      <div class="admin-table__head">
        <div class="admin-table__title">{{ title }}</div>
        <div
          v-if="!isLoading"
          class="admin-table__static"
        >
          <span>
            {{ offset || 0 }} - 
            {{ (offset || 0) + defaultLimit > pagination.totalCount ? pagination.totalCount : (offset || 0) + defaultLimit }}
          </span>
          <span> из {{ pagination.totalCount }}</span>
        </div>
        <div
          v-else
          class="admin-table__loader"
        >
          <loader />
        </div>
      </div>
        <div style="overflow-x: auto">
        <div class="admin-table__header">
          <div class="admin-table__header-item checkbox">
            <ui-checkbox
              :is-show-minus="!isHeaderCheckboxCheck"
              mode="admin"
            />
          </div>
          <div
            v-for="item in header"
            :key="item.value"
            :style="{
              width: item.width || 'auto'
            }"
            class="admin-table__header-item"
          >
            <div class="admin-table__header-icon"/>
            <div class="admin-table__header-text">{{item.value}}</div>
          </div>
        </div>
        <div class="admin-table__body table-body">
        <slot name="body" />
      </div>
    </div>
    </div>
    <div class="admin-table__footer">
      <div class="admin-table__limits">
        <span>Колличество отображаемых новостей</span>
        <ui-select 
          :items="[{ title: 50, value: 50, }, { title: 20, value: 20, }, { title: defaultLimit, value: defaultLimit, },]"
          :default-item="limit"
          mode="admin"
          style="max-width: 50px;"
          @update-element="updateLimit"
        />
      </div>
      <div class="admin-table__arrows">
        <div
          class="admin-table__arrow"
          :class="{
            disabled: !pagination.isPrevPageAvaible
          }"
          @click="onChangePage(pagination.activePage - 1)"
        >
          <img src="~/assets/icons/arrow-left.svg" alt="">
        </div>
        <div class="admin-table__page admin-table__arrow">{{ pagination.activePage }}</div>
        <div
          class="admin-table__arrow"
          :class="{
            disabled: !pagination.isNextPageAvaible
          }"
          @click="onChangePage(pagination.activePage + 1)"
        >
          <img src="~/assets/icons/arrow-right.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UiSelectItemInterface } from '~/components/ui/UiSelect.vue'
import Loader from '~/components/icons/Loader.vue'

export interface AdminTablePaginationStaticInterface {
  limit: number
  offset: number
  totalCount: number
  totalPages: number
  activePage: number
  isNextPageAvaible: boolean
  isPrevPageAvaible: boolean
}

export interface AdminTablePaginationInterface {
  static: AdminTablePaginationStaticInterface
  page: number
  totalCount: number
}

export interface AdminTableHeaderItemInterface {
  value: string
  width?: string
  isClickable?: boolean
  callback?: () => void
  icon?: string
}

const props = defineProps({
  title: {
    type: String,
    default: 'Полученные данные'
  },
  pagination: {
    type: Object as PropType<AdminTablePaginationStaticInterface>,
    default: (): AdminTablePaginationStaticInterface => {
      return {
        limit: 10,
        offset: 0,
        totalCount: 10,
        isNextPageAvaible: true,
        isPrevPageAvaible: false,
        activePage: 1,
        totalPages: 5
      }
    }
  },
  header: {
    type: Object as PropType<AdminTableHeaderItemInterface[]>,
    default: () => {},
  },
  limit: {
    type: Number,
    default: 20,
  },
  offset: {
    type: Number,
    default: 0,
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['header:check', 'update-limit', 'change-page'])

const isHeaderCheckboxCheck = ref(false)
const defaultLimit = ref(props.limit)

const updateLimit = (value: UiSelectItemInterface) => {
  emits('update-limit', value.value)
}

const onChangePage = (page: number) => {
  if (page <= 0 || page > props.pagination.totalPages) return

  emits('change-page', page)
}

watch(isHeaderCheckboxCheck, () => {
  emits('header:check', isHeaderCheckboxCheck.value)
})
</script>

<style lang="scss">
.admin-table {
  max-width: calc(100vw - 300px - 60px);
  overflow: hidden;
  padding-bottom: 60px;

  &__inner {
    background-color: var(--admin-secondary-color);
    border-radius: 15px;

    max-width: calc(100vw - 300px - 60px);
    overflow: hidden;
    // overflow-x: auto;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: calc(100vw - 300px - 60px);

    padding: 30px;

    border-bottom: 1px solid var(--admin-font-primary);

    span {
      font-size: 20px;

      &:first-child {
        color: var(--admin-primary-color);
        margin-right: 10px;
      }
    }
  }

  &__loader {
    width: 30px;
  }

  &__title {
    font-size: 26px;
    font-weight: 800;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 20px 0;
  }

  &__limits {
    display: flex;
    align-items: center;

    gap: 20px;
  }

  &__header {
    display: flex;
    align-items: center;
    // justify-content: space-between;

    padding: 10px 30px;
    overflow: hidden;

    &-item {
      flex-shrink: 0;

      &.checkbox {
        width: 80px;
      }
    }
  }

  &__arrows {
    display: flex;
    align-items: center;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background: var(--admin-secondary-color);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    &.disabled {
      opacity: .5;
    }
  }

  &__page {
    margin: 0 10px;

    cursor: default;
    font-size: 18px;
    font-weight: 800;
  }
}

.table-body {
  // overflow-x: hidden;
  &__item {
    &.icons {
      display: flex;
      align-items: center;

      div {
        width: 30px;
        margin-right: 10px;
        cursor: pointer;

        img {
          width: 100%;
          display: block;
        }
      }
    }

    &.title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>

<style lang="scss">
.table-item {
  display: flex;
  align-items: center;

  width: max-content;
  min-width: calc(100vw - 300px - 60px);

  padding: 10px 30px;

  &:nth-child(2n + 1) {
    background: var(--admin-background-secondary-color);
  }

  div {
    flex-shrink: 0;
  }
}
</style>
