<template>
  <div class="user-icon">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.71494 22.8153C8.68641 20.067 12.1779 18 17.9999 18C23.8219 18 27.3134 20.067 29.2849 22.8153C31.1903 25.4714 31.4938 28.5158 31.4998 30.2004C31.5059 31.8943 30.0858 33 28.6297 33H7.3701C5.91408 33 4.49393 31.8943 4.50002 30.2004C4.50608 28.5158 4.80956 25.4714 6.71494 22.8153Z"
        :fill="fill"
      />
      <path
        fill-rule="evenodd" clip-rule="evenodd"
        d="M18.0001 15C21.3138 15 24.0001 12.3137 24.0001 9C24.0001 5.68629 21.3138 3 18.0001 3C14.6864 3 12.0001 5.68629 12.0001 9C12.0001 12.3137 14.6864 15 18.0001 15Z"
        :fill="fill"
      />
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
// .user-icon- {}</style>
