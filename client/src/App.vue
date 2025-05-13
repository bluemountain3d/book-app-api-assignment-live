<script setup>

  import { RouterView } from 'vue-router';
  import SvgSymbols from '@/components/SvgSymbols.vue';
  import MainHeader from '@/components/MainHeader.vue';
  import MainFooter from './components/MainFooter.vue';

</script>

<template>

  <SvgSymbols />
  <MainHeader />
  <RouterView />
  <MainFooter />


</template>

<style lang="scss" scoped></style>
