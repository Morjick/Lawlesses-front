<template>
  <div class="loader"><img src="~/assets/animations/admin-loading.svg" alt=""></div>
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: String,
    default: '50px'
  }
})
</script>

<style lang="scss">
.loader {

  img {
    width: 100%;
    display: block;
  }
}
</style>
