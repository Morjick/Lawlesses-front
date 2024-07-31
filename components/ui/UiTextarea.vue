<template>
  <div
    class="ui-textarea"
    :class="[mode]"
  >
    <textarea
      v-model="value"
      required
      @change="onChange"
      @input="onChange"
      @keydown.enter="onEnter"
    />
    <span>{{ placeholder }}</span>
  </div>
</template>

<script lang="ts" setup>
export type UiTextareaModeType = 'primary' | 'admin'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  mode: {
    type: String as PropType<UiTextareaModeType>,
    default: 'primary'
  },
  placeholder: {
    type: String,
    default: 'Введите текст'
  },
})

const modelValue = computed(() => props.modelValue)

const value = ref('')
const delay = ref(600)

const emits = defineEmits(['update:modelValue', 'enter'])

// eslint-disable-next-line
const onChange = (event: any): void => {
  value.value = event.target?.value
  setTimeout(() => {
    emits('update:modelValue', value.value)
  }, delay.value)
}

const onEnter = () => {
  emits('enter')
}

watch(modelValue, () => {
  value.value = props.modelValue
})

onMounted(() => {
  value.value = props.modelValue
})
</script>

<style lang="scss">
.ui-textarea {
  position: relative;

  border-radius: 5px;

  &.admin {
    border: 1px solid var(--admin-primary-color);

    textarea {
      background: var(--admin-background-color);
    }

    span {
      color: var(--admin-primary-color);
      background: var(--admin-background-color);
    }
  }

  &.primary {
    border: 1px solid var(--primary-color);

    span {
      background: var(--background-color);
    }
  }

  textarea {
    width: 100%;
    height: 100%;
    min-height: 150px;

    resize: none;
    border-radius: 5px;
    padding: 10px 5px;

    &:valid ~ span {
      transform: translateY(-80%);
    }
  }

  span {
    position: absolute;
  
    font-weight: 800;

    transition: all .4s;
    left: 10px;
    top: 5px;
    padding: 2px;
    pointer-events: none;
  }
}
</style>
