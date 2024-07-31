<template>
  <div
    v-if="isShow"
    class="bread-crumbs"
  >
    <ul class="bread-crumbs__container">
      <li class="bread-crumbs__item">
        <nuxt-link
          class="bread-crumbs__href"
          to="/"
        >Главная</nuxt-link>
      </li>
      <li
        v-for="item in breadcrumbs"
        :key="item.href"
        class="bread-crumbs__item"
      >
        <nuxt-link
          v-if="!item.isActive"
          :to="item.href"
          class="bread-crumbs__href"
        >{{ item.title }}</nuxt-link>
        <span
          v-else
          class="bread-crumbs__item active"
        >{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
export interface BreadCrumbsItemInterface {
  title: string
  href: string
  isActive?: boolean
}

defineProps({
  breadcrumbs: {
    type: Array as PropType<BreadCrumbsItemInterface[]>,
    default: () => []
  },
  isShow: {
    type: Boolean,
    default: true
  },
})
</script>

<style lang="scss">
.bread-crumbs {
  position: relative;

  margin: 15px 0;
  padding: 0 30px;

  @media (max-width: 500px) {
    margin: 5px 0 20px;
    padding: 0 10px;
  }

  &__container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    gap: 20px;

    @media (max-width: 500px) {
      gap: 0px 20px;
    }
  }

  &__item {
    display: inline-block;
    position: relative;

    padding: 5px 0;

    flex-shrink: 0;

    @media (max-width: 500px) {
      padding: 1px 0;
    }

    &::after {
      content: ">";

      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(15px, -60%);

      color: var(--text-primary-color);
    }

    &:last-child {
      &::after {
        display: none;
      }
    }

    a, span {
      @media (max-width: 500px) {
        font-size: 16px;
      }
    }
  }
}
</style>
