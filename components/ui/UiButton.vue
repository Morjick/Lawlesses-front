<template>
  <button
    class="ui-button"
    :class="[buttonMode, {
      disabled: disabled
    }]"
    @click="onClick"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
export type UiButtonModeType = 'primary' | 'danger' | 'admin'

const emit = defineEmits(['click'])
const props = defineProps({
  text: {
    type: String,
    default: 'Отправить'
  },
  mode: {
    type: String as PropType<UiButtonModeType>,
    default: 'primary'
  },
  fontSize: {
    type: String,
    default: '20px'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonMode = computed(() => props.mode)

const onClick = () => {
  if (props.disabled) return

  emit('click')
}
</script>

<style lang="scss" scoped>
.ui-button {
  cursor: pointer;
  transition: all .3s;

  &.disabled {
    opacity: .6;
  }
  
  &.primary {
    background-color: var(--primary-color);
    border-radius: 5px;
    box-shadow: 0 0 10px 0 var(--primary-color);
    padding: 15px;

    font-size: v-bind(fontSize);
    font-weight: bold;
    color: var(--icon-color);
  }

  &.danger {
    background-color: var(--danger-color);
    border-radius: 5px;
    box-shadow: 0 0 10px 0 var(--danger-color);
    padding: 15px;

    font-size: v-bind(fontSize);
    font-weight: bold;
    color: var(--icon-color);
  }

  &.admin {
    background: var(--admin-primary-gradient);
    border-radius: 5px;
    padding: 15px;

    font-size: v-bind(fontSize);
    font-weight: bold;
    box-shadow: 0 0 8px 1px var(--admin-primary-color);
  }
}
</style>
