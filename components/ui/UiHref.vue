<template>
  <nuxt-link
    class="ui-href"
    :to="href"
  >{{ text }}</nuxt-link>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: 'Ссылка'
  },
  href: {
    type: String,
    default: '/'
  },
})
</script>

<style lang="scss" scoped>
.ui-href {
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
}
</style>
