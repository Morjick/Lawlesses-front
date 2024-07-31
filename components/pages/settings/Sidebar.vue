<template>
  <div class="settings-sidebar">
    <div class="settings-sidebar__inner">
      <client-only>
        <div
          v-for="item in navigation"
          :key="item.title"
          class="settings-sidebar__item"
          :class="{
            active: item.isActive,
          }"
          @click="onChangeTab(item)"
        >
          <nuxt-icon :name="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SettingsSidebarNavigationItemInterface } from '~/pages/settings/index.vue'

const emits = defineEmits(['change-tab'])
defineProps({
  navigation: {
    type: Array as PropType<SettingsSidebarNavigationItemInterface[]>,
    default: () => [],
  },
})

const onChangeTab = (item: SettingsSidebarNavigationItemInterface) => {
  emits('change-tab', item)
}
</script>

<style lang="scss">
.settings-sidebar {
  padding: 20px 40px 20px 0px;
  border-radius: 5px;

  background: var(--alternative-color);
  overflow: hidden;
  box-shadow: var(--black-shadow);

  &__item {
    display: flex;
    align-items: center;

    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    padding: 5px 10px;
    gap: 10px;
    border: 1px solid transparent;

    cursor: pointer;
    overflow: hidden;
    transition: all .4s;

    &:hover {
      background: var(--alternative-hover-color);
    }

    &.active {
      border: 1px solid var(--primary-color);
      background: var(--alternative-color);

      &:hover {
        background: var(--alternative-color);
      }
    }
  }
}
</style>
