<template>
  <div
    v-if="editor"
    class="ui-editor"
    :class="[mode]"
  >
    <client-only>
      <div class="ui-editor__header">
        <div class="ui-editor__header--line">
          <!-- <span>Текст:</span> -->
          <div
            class="ui-editor__header--item"
            style="font-weight: 800;"
            title="Сделать текст жирным"
            :class="{
              'is-active': editor.isActive('bold'),
              disabled: !editor.can().chain().focus().toggleBold().run()
            }"
            @click="editor.chain().focus().toggleBold().run()"
          >B</div>
          <div
            class="ui-editor__header--item"
            style="font-style: italic;"
            title="Сделать текст курсивным"
            :class="{
              'is-active': editor.isActive('italic'),
              disabled: !editor.can().chain().focus().toggleItalic().run()
            }"
            @click="editor.chain().focus().toggleItalic().run()"
          >I</div>
          <div
            class="ui-editor__header--item"
            style="text-decoration: line-through;"
            title="Сделать текст зачёркнутым"
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
          >S</div>
          <div
            class="ui-editor__header--item"
            title="Обычный текст"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            @click="editor.chain().focus().setParagraph().run()"
          >P</div>
          <div
            class="ui-editor__header--item"
            title="Заголовок для секции"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >h1</div>
          <div
            class="ui-editor__header--item"
            title="Заголовок по-меньше"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >h2</div>
          <div
            class="ui-editor__header--item"
            title="Заголовок по-меньше"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >h3</div>
          <div
            class="ui-editor__header--item"
            title="Заголовок по-меньше"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          >h4</div>
          <div
            class="ui-editor__header--item"
            title="Заголовок по-меньше"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          >h5</div>
          <div
            class="ui-editor__header--item"
            title="Нумерованный список"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >1.</div>
          <div
            class="ui-editor__header--item"
            title="Список с точками"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            <img src="~/assets/icons/list.svg" alt="">
          </div>
          <div
            class="ui-editor__header--item"
            title="Расположить слева"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
            @click="editor.chain().focus().setTextAlign('left').run()"
          >
            <img src="~/assets/icons/collapse-left.svg" alt="">
          </div>
          <div
            class="ui-editor__header--item"
            title="Расположить по центру"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
            @click="editor.chain().focus().setTextAlign('center').run()"
          >
            <img src="~/assets/icons/counter.svg" alt="">
          </div>
          <div
            class="ui-editor__header--item"
            title="Расположить справа"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
            @click="editor.chain().focus().setTextAlign('right').run()"
          >
            <img src="~/assets/icons/collapse-right.svg" alt="">
          </div>
        </div>
      </div>
      <div class="ui-editor__content">
        <editor-content
          :editor="editor"
        />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

export type UiEditorModeType = 'primary' | 'admin'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<UiEditorModeType>,
    default: 'admin',
  },
})

const emits = defineEmits(['update:modelValue'])

const modelValue = computed(() => props.modelValue)

const editor = ref()

watch(modelValue, () => {
  editor.value.commands.setContent(modelValue.value)
})

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    onUpdate: () => {
      emits('update:modelValue', editor.value.getHTML())
    },
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style lang="scss">
$editorPadding: 5px;

.ui-editor {
  margin: 20px 0;
  border-radius: 5px;

  &.admin {
    border: 1px solid var(--admin-primary-color);

    background: var(--admin-background-color);
  }

  &__header {
    margin-bottom: 10px;
    padding: $editorPadding;
    border-bottom: 1px dashed var(--admin-primary-color);

    &--line {
      display: flex;
      align-items: center;

      margin-bottom: 10px;

      .ui-select__header {
        min-height: 20px;
        margin: 0 10px 0 0;
      }

      span {
        width: 160px;
        margin-right: 10px;
      }
    }

    &--item {
      display: flex;
      align-items: center;
      justify-content: center;

      min-width: 40px;
      height: 40px;

      cursor: pointer;
      font-size: 24px;
      text-align: center;

      margin-right: 10px;
      padding: 2px;
      border: 1px solid var(--admin-font-primary);
      border-radius: 5px;

      img {
        display: block;
        width: 100%;
        max-width: 30px;
        height: 30px;
      }

      &.is-active {
        border: 1px solid var(--admin-primary-color);
        background: var(--admin-primary-gradient);
      }
    }
  }

  &__content {
    padding: $editorPadding;
  }
}
</style>
