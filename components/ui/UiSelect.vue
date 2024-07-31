<template>
  <div
    class="ui-select"
    :class="[props.mode, {
      active: isActive
    }]"
    @click="onSelectHeaderClick"
  >
    <div class="ui-select__header">
      <span>{{ activeItem ? activeItem.title : placeholder }}</span>
      <!-- <img src="~/assets/icons/arrow-down.svg" alt=""> -->
      <div class="ui-select__image"><nuxt-icon name="arrow-down"/></div>
    </div>
    <div
      ref="selectBodyHTMLElement"
      class="ui-select__body"
      :class="{
        hide: isHideBody
      }"
    >
      <ul class="ui-select__list">
        <li
          v-for="item in items"
          :key="item.value"
          class="ui-select__item"
          @click="onChangeItem(item)"
        >{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LanguageListType } from '~/stores/app.store';

export interface UiSelectItemInterface {
  value: LanguageListType | string | number
  title: string | number
}

export type UiSelectModeType = 'primary' | 'admin'

const props = defineProps({
  modelValue: {
    type: Object as PropType<UiSelectItemInterface>,
    default: () => {
      return {
        title: 'Русский',
        value: 'ru-RU'
      }
    }
  },
  isMultipleValue: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array as PropType<UiSelectItemInterface[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Выберите опцию'
  },
  defaultItem: {
    type: [Number, String],
    default: ''
  },
  mode: {
    type: String as PropType<UiSelectModeType>,
    default: 'primary'
  },
})

const $emit = defineEmits(['update:modelValue', 'update-element'])

const activeItem: Ref<UiSelectItemInterface | undefined> = ref()
const isActive = ref(false)
const selectBodyHTMLElement = ref()
const isHideBody = ref(false)

const onChangeItem = (item: UiSelectItemInterface) => {
  activeItem.value = item
  isActive.value = false
  isHideBody.value = true

  setTimeout(() => {
    isActive.value = false
    isHideBody.value = false
  }, 400)

  $emit('update:modelValue', item)
  $emit('update-element', item)
}

const onSelectHeaderClick = () => {
  isActive.value = !isActive.value

  const timeoutID = setTimeout(() => {
    isActive.value = false

    clearTimeout(timeoutID)
  }, 8200)
}

onMounted(() => {
  if (props.modelValue && !props.defaultItem) {
    // const defaultActiveElement = findElement(props.modelValue, { filter: 'title' })
    const defaultActiveElement = props.items.find((el) => el.value === props.modelValue.value)

    if (!defaultActiveElement) return

    activeItem.value = defaultActiveElement
  }

  if (props.defaultItem) {
    const defaultActiveElement = props.items.find((el) => el.value === props.defaultItem)

    if (!defaultActiveElement) return

    activeItem.value = defaultActiveElement
  }
})
</script>

<style lang="scss">
.ui-select {
  min-width: 220px;
  position: relative;

  &.active {
    .ui-select__body {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;

      &.hide {
        opacity: 0;
        transform: translateY(-50px);
        pointer-events: none;
      }
    }

    .ui-select__image {
      transform: rotate(-180deg)
    }
  }

  &.primary {
    .ui-select {
        &__header {
          box-shadow: 0 0 5px 1px var(--primary-color);
          border-radius: var(--radius-m);
          background-color: var(--alternative-color);
        }

        &__body {
          background-color: var(--alternative-color);
          box-shadow: 0 0 2px 1px var(--primary-color);
        }
    }
  }

  &.admin {
    min-width: 120px;

    .ui-select {
        &__header {
          background-color: var(--admin-secondary-color);
          border: 1px solid var(--admin-background-helper-color);
          border-radius: 5px;
        }

        &__body {
          background-color: var(--admin-secondary-color);
          box-shadow: 0 0 2px 1px var(--admin-background-helper-color);
        }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 50px;

    padding: 5px 15px;

    margin: 5px 15px;
    cursor: pointer;

    img, .ui-select__image {
      margin-left: 15px;
      transition: all .4s;
    }
  }

  &__body {
    width: calc(100% - 30px);

    position: absolute;
    top: calc(100%);
    left: 15px;

    opacity: 0;
    transform: translateY(-50px);
    pointer-events: none;
    transition: all .4s;

    padding: 5px;
    border-radius: 5px;
    overflow-y: auto;
    z-index: 50;

    &:hover {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
  }

  &__item {
    padding: 10px 20px;

    border-bottom: 1px solid var(--text-primary-color);
    transition: all .4s;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: var(--alternative-hover-color);
    }
  }
}
</style>
