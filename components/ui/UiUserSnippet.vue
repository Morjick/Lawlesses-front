<template>
  <div class="ui-user-snipptet">
    <div class="ui-user-snipptet__inner">
      <div class="ui-user-snipptet__avatar">
        <ui-avatar :url="user.avatar || ''" />
      </div>
      <div class="ui-user-snipptet__content">
        <div class="ui-user-snipptet__name">{{ user.username }}</div>
        <div class="ui-user-snipptet__status-bar">
          <span v-if="statusBarView === 'online'" >{{ user.isOnline ? 'online' : 'offline' }}</span>
          <span v-if="statusBarView === 'settings'" >
            <nuxt-link to="/settings">{{ $t('settings') }}</nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export type StatusBarViewType = 'online' | 'settings'

defineProps({
  user: {
    type: Object as PropType<UserInterface>,
    default: () => {},
  },
  statusBarView: {
    type: String as PropType<StatusBarViewType>,
    default: 'online'
  },
})
</script>

<style lang="scss">
.ui-user-snipptet {
  display: inline-block;

  cursor: pointer;

  &__inner {
    display: flex;
    align-items: center;

    gap: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;

    // gap: 5px;
  }

  &__status-bar {
    span {
      color: var(--text-secondary-color);
    }
  }
}
</style>
