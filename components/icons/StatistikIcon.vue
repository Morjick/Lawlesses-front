<template>
  <div class="statistik-icon">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
fill-rule="evenodd" clip-rule="evenodd"
        d="M23.5607 15.4393C24.1464 16.0251 24.1464 16.9749 23.5607 17.5607L17.5607 23.5607C16.9749 24.1464 16.0251 24.1464 15.4393 23.5607L12.4393 20.5607C11.8536 19.9749 11.8536 19.0251 12.4393 18.4393C13.0251 17.8536 13.9749 17.8536 14.5607 18.4393L16.5 20.3787L21.4393 15.4393C22.0251 14.8536 22.9749 14.8536 23.5607 15.4393Z"
        :fill="fill" />
      <path
fill-rule="evenodd" clip-rule="evenodd"
        d="M9 30H27L27 11.7426L21.2574 6H9V30ZM9 3C7.34315 3 6 4.34315 6 6V30C6 31.6569 7.34315 33 9 33H27C28.6569 33 30 31.6569 30 30V11.7426C30 10.947 29.6839 10.1839 29.1213 9.62132L23.3787 3.87868C22.8161 3.31607 22.053 3 21.2574 3H9Z"
        :fill="fill" />
    </svg>

  </div>
</template>

<script lang="ts" setup>
defineProps({
  fill: {
    type: String,
    default: '#fff'
  }
})
</script>

<style lang="scss">
// .statistik-icon- {}</style>
