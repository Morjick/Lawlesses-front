<template>
  <div
    class="article-comment-menu"
    :class="{
      active: isShow
    }"
  >
    <div class="article-comment-menu__list">
      <div
        class="article-comment-menu__item"
        @click="onComplaint"
      >
        <nuxt-icon name="flag"/>
        <span>Пожаловаться</span>
      </div>
      <div class="article-comment-menu__item">
        <nuxt-icon name="user-outline"/>
        <span>К пользователю</span>
      </div>
      <div
        v-if="role !== 'USER'"
        class="article-comment-menu__item"
        @click="onDeleteComment"
      >
        <nuxt-icon name="eye-hide"/>
        <span>Заблокировать</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['complaint', 'update:comment'])
const props = defineProps({
  commentId: {
    type: Number,
    default: 0,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
})

const authStore = useAuthStore()
const { $toast } = useNuxtApp()

const role = computed(() => authStore.getRole)

const onComplaint = () => {
  emits('complaint', props.commentId)
}

const onDeleteComment = async () => {
  try {
    const data = await fetching(`forum/delete-comment/${props.commentId}`, {
      method: 'DELETE',
    })

    if (data.status === 200) {
      emits('update:comment')
      $toast.success('Комментарий был заблокирован')
    } else {
      $toast.warning(data.message)
    }
  } catch {
    $toast.warning('При блокировке комментария произошла ошибка')
  }
}
</script>

<style lang="scss">
.article-comment-menu {
  position: absolute;
  right: 0;
  top: 10px;

  background: var(--alternative-color);
  border-radius: 5px;
  overflow: hidden;
  transition: all .4s;

  transform: translateY(-50px);
  pointer-events: none;
  opacity: 0;

  &:hover {
    transform: translateY(0);
    pointer-events: all;
    opacity: 1;
  }

  &.active {
    transform: translateY(0);
    pointer-events: all;
    opacity: 1;
  }

  &__item {
    display: flex;
    align-items: center;

    padding: 5px 10px;
    border-bottom: 1px dashed var(--alternative-hover-color);

    cursor: pointer;
    transition: all .4s;

    &:hover {
      background: var(--alternative-hover-color);
    }

    &:last-child {
      border-bottom: none;
    }

    span {
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
