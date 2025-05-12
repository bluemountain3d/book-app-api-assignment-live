<script setup>
import IconSvg from './IconSvg.vue';
</script>

<template>
    <footer class="footer">
      <span class="logo">
        <IconSvg name="brand" />
    </span>
    </footer>
</template>

<style scoped lang="scss">
footer {
  width: 100vw;
  height: 150px;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);

  .logo svg {
  width: 100px;
  height: 100px;
  }
}
</style>
