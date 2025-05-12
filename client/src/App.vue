<script setup>

  import { RouterView } from 'vue-router';
  import SvgSymbols from '@/components/SvgSymbols.vue';
  import MainHeader from '@/components/MainHeader.vue';

</script>

<template>

  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/register">Register page</RouterLink>
        <RouterLink to="/login">Login page</RouterLink>
        <RouterLink to="/admin">Admin panel</RouterLink>
        <RouterLink to="/books">Books page</RouterLink>
      </nav>
    </div>
  </header>


  <SvgSymbols />
  <MainHeader />
  <RouterView />

</template>

<style lang="scss" scoped></style>
