<template>
  <div class="news-pagination">
    <button
      class="news-pagination__item prev"
      :class="{
        disabled: !pagination.isPrevPageButtonActive
      }"
      @click="onClickToPaginationButton(pagination.activePage - 1)"
    />
    <button
      v-for="item in paginationButtons"
      :key="item.value"
      :class="{
        active: item.isActive
      }"
      class="news-pagination__item"
      @click="onClickToPaginationButton(item.page)"
    >{{ item.value }}</button>
    <button
      class="news-pagination__item next"
      :class="{
        disabled: !pagination.isNextPageButtonActive
      }"
      @click="onClickToPaginationButton(pagination.activePage + 1)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { NewsPaginationInterface } from '~/stores/news.store'
const newsStore = useNewsStore()

export interface PaginationButtonInterface {
  value: string | number
  page: number | null
  isActive: boolean
  isCanClick: boolean
}

const pagination: ComputedRef<NewsPaginationInterface> = computed(() => newsStore.getPagination)

const paginationButtons = computed(() => {
  const buttons: PaginationButtonInterface[] = []
  let buttonPage = pagination.value.activePage
  const maxButttonIndex = 5

  for (let i = 0; i <= maxButttonIndex; i++) {
    if (i === maxButttonIndex - 1 && !(buttonPage + maxButttonIndex > pagination.value.totalPage)) {
      if (buttonPage === pagination.value.totalPage - 1) {
        buttons.push({
          isActive: false,
          value: buttonPage,
          page: buttonPage,
          isCanClick: true,
        })
      } else {
        buttons.push({
          isActive: false,
          value: '...',
          page: null,
          isCanClick: false,
        })
      }
    }
    else if (i === maxButttonIndex) {
      buttons.push({
        isActive: pagination.value.totalPage === pagination.value.activePage,
        value: pagination.value.totalPage || '...',
        page: pagination.value.totalPage || null,
        isCanClick: true,
      })
    }
    else if (buttonPage + maxButttonIndex > pagination.value.totalPage) {
      buttons.push({
        isActive: pagination.value.totalPage - maxButttonIndex + i === pagination.value.activePage,
        value: pagination.value.totalPage - maxButttonIndex + i,
        page: pagination.value.totalPage - maxButttonIndex + i,
        isCanClick: true,
      })
      buttonPage++
    }
    else {
      buttons.push({
        page: buttonPage,
        value: buttonPage,
        isActive: pagination.value.activePage === buttonPage,
        isCanClick: true,
      })
      buttonPage++
    }
  }

  return buttons
})

const onClickToPaginationButton = (page: number | null) => {
  if (!page || !pagination.value.totalPage) return
  if (page <= 0 || (pagination.value.totalPage && page > pagination.value.totalPage)) return

  newsStore.setPaginationActivePage(page)
}

onMounted(() => {
  newsStore.createPagination()
})
</script>

<style lang="scss">
.news-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  
  column-gap: 20px;
  margin: 20px auto;

  @media (max-width: 500px) {
    display: none;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    min-width: 50px;
    width: 50px;
    height: 50px;

    text-align: center;
    color: var(--text-primary-color);
    background-color: var(--alternative-color);
    box-shadow: 0 0 5px 0px var(--black-drop-shadow);
    border-radius: 5px;
    cursor: pointer;
    

    &.active {
      box-shadow: 0 0 5px 1px var(--shadow-color);
    }

    &.disabled {
      opacity: .5;
    }

    &.prev {
      &::after {
        content: "<";
      }
    }

    &.next {
      &::after {
        content: ">";
      }
    }
  }
}
</style>
