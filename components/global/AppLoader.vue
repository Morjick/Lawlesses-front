<template>
  <div class="page-loader">
    <div class="page-loader__content">
      <div class="page-loader__images">
          <img style="transform: translateX(20px);" src="~/assets/animations/loading-part-3.gif" alt="">
        <div class="page-loader__images--group">
          <img src="~/assets/animations/loading-part-1.gif" alt="">
          <img src="~/assets/animations/loading-part-2.gif" alt="">
        </div>
      </div>
      <h1>Загружаем...</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-loader {
  display: flex;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  justify-content: center;
  align-items: center;

  z-index: 5000;

  background: var(--background-color);

  &__content {
    display: flex;
    align-items: center;
    // flex-direction: column;
  }

  &__images {
    display: flex;
    align-items: center;

    &--group {
      display: flex;
      flex-direction: column;
    }

    img {
      display: block;
      width: 100px;
    }
  }
}
</style>
