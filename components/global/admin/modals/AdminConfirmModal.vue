<template>
  <div
    ref="confirmModalComponent"
    class="admin-confirm-modal"
    :class="{
      active: isActive
    }"
    @click="onCancel"
  >
      <div
        class="admin-confirm-modal__window"
        @click.prevent.stop
      >
        <h2 class="admin-confirm-modal__title">{{ title }}</h2>
        <p class="admin-confirm-modal__description">{{ description }}</p>
        <div class="admin-confirm-modal__buttons">
          <ui-button
            :text="cancelButtonText"
            mode="danger"
            @click="onCancel"
          />
          <ui-button
            :text="confirmButtonText"
            mode="admin"
            @click="onConfirm"
          />
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Подтвердите своё действие',
  },
  description: {
    type: String,
    default: 'Введённые данные могут не сохраниться',
  },
  cancelButtonText: {
    type: String,
    default: 'Отмена'
  },
  confirmButtonText: {
    type: String,
    default: 'Подтвердить'
  },
})

const emits = defineEmits(['confirm', 'cancel'])

const confirmModalComponent = ref()
const isActive = ref(false)
const escListener = ref()

const onCancel = () => emits('cancel')
const onConfirm = () => emits('confirm')
const init = () => {
  isActive.value = true

  escListener.value = window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      disabled()
    }
  })
}

const disabled = () => {
  isActive.value = false

  if (escListener.value) {
    window.removeEventListener('keydown', escListener.value)
  }
}

defineExpose({
  init,
  disabled,
})
</script>

<style lang="scss" scoped>
.admin-confirm-modal {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: none;
  opacity: 0;
  pointer-events: none;

  transition: all .4s;
  z-index: 50;

  &.active {
    background-color: rgba(0, 0, 0, .5);
    opacity: 1;
    pointer-events: all;

    .admin-confirm-modal__window {
      top: 50%;
    }
  }

  &__window {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: var(--admin-background-color);
    box-shadow: var(--admin-main-shadow);

    padding: 20px 40px;
    border-radius: 5px;

    transition: all .4s;
    z-index: 50;
  }

  &__title {
    font-size: 28px;
    font-weight: 800;
    text-align: center;

    margin: 0 0 20px;
  }

  &__description {
    text-align: center;

    margin: 0 0 10px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: 20px;
    margin-left: auto;
  }
}
</style>
