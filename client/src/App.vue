<script setup>

  import { RouterView } from 'vue-router';
  import SvgSymbols from '@/components/SvgSymbols.vue';
  import MainHeader from './fixtures/MainHeader.vue';
  import MainFooter from './fixtures/MainFooter.vue';

</script>

<template>
  <SvgSymbols />
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>

<style lang="scss" scoped></style>
