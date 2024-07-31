<template>
  <div
    class="autor-item"
    @click="onAutorClick"
  >
    <div :id="`autor-avatar-${item.id}`" class="autor-item__avatar" />
    <div class="autor-item__name">{{ item.lastname }} {{ item.firstname }} {{ item.patronymic }}</div>
    <div class="autor-item__role">{{ item.developerRole }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object as PropType<AutorInterface>,
    default: () => {},
    required: true,
  },
})

const $router = useRouter()
const avatar = computed(() => props.item.avatar)

const onAutorClick = () => {
  $router.push(`autors/${props.item.slug}`)
}

onMounted( () => {
  const element = document.getElementById(`autor-avatar-${props.item.id}`)
  if(!element) return

  element.style.backgroundImage = `url("${avatar.value}")`
})
</script>

<style lang="scss" scoped>
.autor-item {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 500px) {
    max-width: 45%;
  }

  &__avatar {
    width: 140px;
    height: 140px;

    background-size: cover;
    background-repeat: no-repeat;
    
    border-radius: 50%;
    margin-bottom: 35px;

    @media (max-width: 500px) {
      width: 70px;
      height: 70px;
    }
  }

  &__name {
    font-size: 20px;
    font-weight: 500;

    @media (max-width: 500px) {
      text-align: center;
    }
  }

  &__role {
    font-weight: 300;
    color: var(--helper-color);
    margin-top: 6px;

    @media (max-width: 500px) {
      text-align: center;
    }
  }
}
</style>
