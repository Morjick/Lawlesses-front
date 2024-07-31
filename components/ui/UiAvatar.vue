<template>
  <div class="ui-avatar">
    <nuxt-icon
      v-if="!isAvatarValid"
      name="user-outline"
    />
    <div
      ref="imageComponent"
      :style="{ backgroundImage: backgroundImage }"
      class="ui-avatar--image"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
})

const url = computed(() => props.url)
const imageComponent = ref()
const isAvatarValid = ref(false)
const backgroundImage = ref('')

const checkImage = async () => {
  try {
    backgroundImage.value = ''
    if (!url.value || !url.value.length) return
    if (!imageComponent?.value) return

    const data = await fetching(`get-image/${url.value}`)
    const reader = new FileReader()

    reader.onloadend = () => {
      if (!reader.result) return
      backgroundImage.value = `url('${reader.result}')`
    }
    reader.readAsDataURL(data)
    isAvatarValid.value = true
  } catch (error) {
    console.warn('Image is Not found', error)
  }
}

watch(url, () => checkImage())
onMounted(() => checkImage())
</script>

<style lang="scss">
.ui-avatar {
  position: relative;

  width: 100%;
  min-width: 50px;
  min-height: 50px;

  &--image {
    width: 100%;
    min-width: 50px;
    min-height: 50px;

    background-color: var(--admin-font-primary);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
      path {
        color: var(--black-drop-shadow);
      }
    }
  }
}
</style>
