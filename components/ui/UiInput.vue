<template>
  <div
    class="ui-input"
    :class="[mode, {
      danger: !isValid,
    }]"
  >
    <input
      v-model="value"
      :type="type"
      required
      @input="onChange"
      @keydown.enter="onEnter"
    >
    <span>{{ isValid ? placeholder : errorMessage }}</span>

    <div
      v-if="inputType === 'password'"
      class="ui-input__visible"
      @click="toggleShowPassword"
    >
      <img
        v-if="isShowPassword"
        src="@/assets/icons/eye-hide.svg"
        alt=""
      >
      <img
        v-else
        src="@/assets/icons/eye-show.svg"
        alt=""
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
export type UiInputModeType = 'primary' | 'admin'

const props = defineProps({
  inputType: {
    default: 'text',
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  },
  minLength: {
    type: Number,
    default: 0,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: ''
  },
  mode: {
    type: String as PropType<UiInputModeType>,
    default: 'primary'
  },
})

const $emit = defineEmits(['update:modelValue', 'enter'])

const modelValue = computed(() => props.modelValue)

const delay = ref(600)
const isValid = ref(true)
const value = ref('')
const errorMessage = ref('')
const isShowPassword = ref(false)
const type = ref('string')

// eslint-disable-next-line
const onChange = (event: any): void => {
  value.value = event.target?.value
  setTimeout(() => {
    checkIsValid()
    $emit('update:modelValue', value.value)
  }, delay.value)
}

const onEnter = () => {
  $emit('enter', value.value)
}

const checkIsValid = () => {
  if (!value.value.length) {
    isValid.value = true

    return
  }

  if (value.value.length < props.minLength) {
    isValid.value = false

    errorMessage.value = `Минимальная длинна этого поля - ${props.minLength} символов`
    
    return
  }

  isValid.value = true
}

const toggleShowPassword = () => {
  if (props.inputType !== 'password') return

  isShowPassword.value = !isShowPassword.value

  if (isShowPassword.value) {
    type.value = 'text'
  }

  if (!isShowPassword.value) {
    type.value = 'password'
  }
}

watch(modelValue, () => {
  value.value = modelValue.value
})

onMounted(() => {
  type.value = props.inputType
  value.value = modelValue.value
})
</script>

<style lang="scss">
.ui-input {
  position: relative;

  border-radius: 5px;
  border: 1px solid var(--primary-color);
  margin: 10px 0 20px;

  transition: all .4s;

  &.primary {
    border: 1px solid var(--primary-color);

    span {
      color: var(--shadow-color);
      background: var(--background-color);
    }
  }

  &.admin {
    border: 1px solid var(--admin-primary-color);
    background: var(--admin-background-color);

    span {
      color: var(--admin-primary-color);
      background: var(--admin-background-color);
    }
  }

  &.danger {
    animation: ShakeAnimation 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;

    border: 1px solid var(--danger-color);

    span {
      color: var(--danger-color);
    }
  }

  input {
    width: 100%;
    height: 50px;

    &:valid {
      &~span {
        top: 0;
      }
    }

    &[type=password] {
      font-size: 28px;
    }
  }

  span {
    position: absolute;

    top: 50%;
    left: 2%;
    transform: translateY(-50%);
    transition: all .4s;

    text-wrap: nowrap;
    color: var(--shadow-color);
    font-size: 16px;
    font-weight: 800;

    background: var(--background-color);
    padding: 2px 5px;
    border-radius: 2px;

    pointer-events: none;
  }

  &__visible {
    position: absolute;

    top: 50%;
    right: 2%;
    transform: translateY(-50%);

    cursor: pointer;

    img {
      width: 30px;
    }
  }
}

@keyframes ShakeAnimation {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
