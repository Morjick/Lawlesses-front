<template>
  <label
    :for="id"
    :class="[mode]"
    class="ui-checkbox"
  >
    <input
      :id="id"
      type="checkbox"
      @change="check"
    >
    <div
      class="ui-checkbox--flag"
      style="flex-shrink: unset"
    >
      <img
        v-if="isChecked"
        src="~/assets/icons/checkmark.svg"
        alt=""
      >
      <img
      v-if="!isChecked && isShowMinus"
        src="~/assets/icons/minus.svg"
        alt=""
      >
    </div>
  </label>
</template>

<script lang="ts" setup>
export type UiCheckboxModeType = 'primary' | 'admin'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String as PropType<UiCheckboxModeType>,
    default: 'primary'
  },
  isShowMinus: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'update'])

const modelValue = computed(() => props.modelValue)

const id = ref(useId())
const isChecked = ref(false)

const check = () => {
  isChecked.value = !isChecked.value
  emits('update:modelValue', isChecked.value)
  emits('update', isChecked.value)
}

watch(modelValue, () => {
  isChecked.value = modelValue.value
})

onMounted(() => {
  isChecked.value = props.modelValue
})
</script>

<style lang="scss" scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border-radius: 5px;
  padding: 5px;
  overflow: hidden;

  &.admin {
    border: 1px solid var(--admin-primary-color);
  }

  &.primary {
    border: 1px solid var(--primary-color);
  }

  input {
    display: none;
  }

  &--flag {
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
