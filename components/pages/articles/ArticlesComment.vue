<template>
  <div class="articles-comment">
    <div class="articles-comment__header">
      <ui-user-snippet
        :user="comment.autor"
      />

      <div
        class="articles-comment__more-button"
        @click="onMenuClick"
      >
        <nuxt-icon name="more-vertical"/>
      </div>
      <client-only>
        <article-comment-menu
          :is-show="showContext"
          :comment-id="comment.id"
          @update:comment="updateComment"
        />
      </client-only>
    </div>
    <div class="articles-comment__body">
      <p>{{ comment.message }}</p>
    </div>
    <div class="articles-comment__footer">
      <span>{{ comment.publicDate }}</span>
      <div class="articles-comment__tabs">
        <div
          class="articles-comment__tab interface-tab"
          @click="estimateComment('like', comment.id)"
        >
          <nuxt-icon v-if="!isLiked" name="like"/>
          <nuxt-icon v-else name="like-filled"/>
          <span>{{ Number(comment.likes) }}</span>
        </div>
        <div
          class="articles-comment__tab interface-tab"
          @click="estimateComment('dislike', comment.id)"
        >
          <nuxt-icon v-if="!isDisliked" name="dislike"/>
          <nuxt-icon v-else name="dislike-filled"/>
          <span>{{ Number(comment.dislikes) }}</span>
        </div>
      </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleCommentInterface } from '~/pages/forum/[themeId].vue'
import ArticleCommentMenu from './ArticleCommentMenu.vue'

export type EstimateCommentLike = 'like' | 'dislike'

const emtis = defineEmits(['update:comment'])
const props = defineProps({
  comment: {
    type: Object as PropType<ArticleCommentInterface>,
    default: () => {},
  }
})

const authStore = useAuthStore()

const showContext = ref(false)

const user = computed(() => authStore.getUser)
const isLiked = computed(() => props.comment.likersID.find((likerID) => likerID === user.value?.id))
const isDisliked = computed(() => props.comment.dislikersID.find((dislikerID) => dislikerID === user.value?.id))

const onMenuClick = () => {
  showContext.value = true

  setTimeout(() => showContext.value = false, 1600)
}

const estimateComment = async (estimate: EstimateCommentLike, commentId: number) => {
  const data = await fetching(`forum/estimate-comment/${commentId}`, {
    body: {
      action: estimate
    },
    method: 'POST',
  })

  console.log(data)
}

const updateComment = () => emtis('update:comment')
</script>

<style lang="scss" scoped>
.articles-comment {
  position: relative;

  padding-left: 20px;
  margin-bottom: 20px;

  &::before {
    content: '';

    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    width: 2px;
    height: 100%;

    background: var(--admin-primary-gradient);
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    position: relative;

    gap: 250px;
  }

  &__more-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;

    font-size: 30px;
    transition: all .4s;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;

    &:hover {
      background: var(--alternative-color);
    }

    img {
      width: 25px;
    }

    svg {
      font-size: 24px;
    }
  }

  &__body {
    margin: 10px 0;
  }

  &__tabs {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
