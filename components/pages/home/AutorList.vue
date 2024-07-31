<template>
  <section class="autor-list">
    <div class="autor-list__header">
      <h1>Кто твой папочка?</h1>
      <ui-href text="Смотреть полный список" href="/autors"/>
    </div>
    <div class="autor-list__slider">
      <div
        class="autor-list__items"
      >
        <autor-item
          v-for="item in autorList"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AutorItem from './AutorItem.vue';

defineProps({
  autorList: {
    type: Array as PropType<AutorInterface[]>,
    default: () => []
  },
})
</script>

<style lang="scss" scoped>
.autor-list {
  @media (max-width: 500px) {
    margin-top: 15px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;

    margin-bottom: 35px;

    @media (max-width: 500px) {
      margin-bottom: 10px;

      flex-direction: column;
      align-items: start;
    }

    a {
      font-size: 14px;
      font-weight: 400
    }
  }
}
</style>
