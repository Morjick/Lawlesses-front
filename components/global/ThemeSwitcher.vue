<template>
  <div
    class="theme-switcher"
    @click="onSwitch"
  >
    <div class="theme-switcher__inner">
      <div
        class="theme-switcher__cursor"
        :class="{
          checked,
        }"
      />
      <div
        class="theme-switcher__image"
        :style="{
          left: '4px',
        }"
      >
        <nuxt-icon name="streak-off" />
      </div>
      <div
        class="theme-switcher__image"
        :class="{
          checked,
        }"
        :style="{
          right: '4px',
        }"
      >
        <nuxt-icon name="streak-on" :filled="true"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['switch-theme'])

const onSwitch = () => {
  emits('switch-theme', !props.checked)
}
</script>

<style lang="scss">
.theme-switcher {
  position: relative;

  width: 60px;
  height: 30px;

  border-radius: 30px;
  border: 1px solid var(--primary-color);
  margin-left: 20px;

  overflow: hidden;
  cursor: pointer;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
    height: 100%;
  }

  &__cursor {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-110%, -50%);

    width: 24px;
    height: 24px;

    transition: all .4s;
    
    border-radius: 50%;
    background: var(--primary-color);

    &.checked {
      transform: translateX(10%);
    }
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 50%;

    transform: translateY(-50%);
  }
}
</style>
