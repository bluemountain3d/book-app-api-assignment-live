<script setup>

  import { RouterView } from 'vue-router';
  import SvgSymbols from '@/components/SvgSymbols.vue';
  import MainHeader from '@/components/MainHeader.vue';

</script>

<template>

  <SvgSymbols />
  <MainHeader />
  <RouterView />


</template>

<style lang="scss" scoped></style>
