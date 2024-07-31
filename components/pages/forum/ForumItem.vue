<template>
  <div
    class="forum-item"
    @click="onForumItemClick"
  >
    <div class="forum-item__inner">
      <div class="forum-item__avatar">
        <client-only>
          <ui-avatar :url="avatar" />
        </client-only>
      </div>
      <div class="forum-item__content">
        <div>
          <div class="forum-item__title">{{title}}</div>
          <div class="forum-item__description">{{ description }}</div>
        </div>
        <div class="forum-item__tags">
          <div
            v-for="tag in tags"
            :key="tag"
            class="forum-item__tag"
          >{{ tag }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface ForumThemeInterface {
  title: string
  description: string
  avatar: string
  tags: string[]
  id: number
}

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  tags: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  id: {
    type: Number,
    default: 1
  }
})

const router = useRouter()

const onForumItemClick = () => {
  router.push(`/forum/${props.id}`)
}
</script>

<style lang="scss">
.forum-item {
  background: var(--alternative-color);
  border-radius: var(--radius-m);

  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: var(--black-shadow);
  overflow: hidden;

  &__inner {
    display: flex;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 10px 20px;

    @media (max-width: 500px) {
      padding: 5px 10px;
    }
  }

  &__title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 2px;

    @media (max-width: 500px) {
      font-size: 18px;
    }
  }

  &__description {
    margin-top: 10px;
    font-weight: 300;
    font-size: 20px;

    @media (max-width: 500px) {
      font-size: 16px;
      margin-top: 5px;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;

    gap: 10px;
    margin-top: 10px;

    @media (max-width: 500px) {
      gap: 2px;
      flex-shrink: 0;
      overflow: auto;
    }
  }

  &__tag {
    padding: 2px;
    border-radius: 2px;
    background: var(--admin-primary-gradient);
    color: var(--icon-color);

    @media (max-width: 500px) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      overflow: hidden;
      text-align: center;
      text-wrap: nowrap
    }
  }

  .ui-avatar--image {
    width: 150px;
    height: 150px;
    border-radius: var(--radius-m);
  }
}
</style>
