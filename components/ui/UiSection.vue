<template>
  <section class="ui-section" :class="classes">
    <slot name="content" />
  </section>
</template>

<script lang="ts" setup>
defineProps({
  padding: {
    type: String,
    default: '40px'
  },
  classes: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.ui-section {
  background: var(--alternative-color);
  box-shadow: var(--black-shadow);
  border-radius: 10px;

  padding: v-bind(padding);

  @media (max-width: 500px) {
    padding: calc((v-bind(padding) / 4));
  }
}
</style>
