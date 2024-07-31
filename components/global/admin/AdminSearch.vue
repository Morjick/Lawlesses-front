<template>
  <div class="admin-search">
    <div class="admin-search__icon">
      <img src="~/assets/icons/search.svg" alt="">
    </div>
      <input
        type="text"
        class="admin-search__input"
        :placeholder="placeholper"
        @change="onChange"
        @keydown.enter="onEnter"
      >
  </div>
</template>

<script lang="ts" setup>
defineProps({
  placeholper: {
    type: String,
    default: 'Искать',
  },
  modelValue: {
    type: String,
    default: ''
  },
})

const emits = defineEmits(['update:modelValue', 'search'])

const delay = ref(800)
const value = ref('')

// eslint-disable-next-line
const onChange = (event: any): void => {
  value.value = event.target?.value
  setTimeout(() => {
    emits('update:modelValue', value.value)
    emits('search', value.value)
  }, delay.value)
}

const onEnter = () => {
  if (!value.value) return
  emits('search')
}
</script>

<style lang="scss">
.admin-search {
  display: flex;
  align-items: center;

  max-width: 350px;
  height: 52px;

  background-color: var(--admin-secondary-color);
  border: 1px solid var(--admin-background-helper-color);
  border-radius: 5px;

  padding: 10px;
  margin: 0 20px;

  &__icon {
    width: 30px;
    height: 30px;

    img {
      display: block;
      width: 100%;
    }
  }

  &__input {
    display: block;
    width: 100%;
    color: var(--admin-font-light);

    &::placeholder {
      color: var(--admin-font-primary);
    }
  }
}
</style>
