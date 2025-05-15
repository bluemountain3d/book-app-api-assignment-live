<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

import SingleBookLoggedIn from './SingleBookLoggedInView.vue';
import SingleBookView from './SingleBookView.vue';

const authStore = useAuthStore();

const checkIfLoggedIn = computed(() => {
  return authStore.isLoggedIn ? SingleBookLoggedIn : SingleBookView;
});
</script>

<template>
  <component :is="checkIfLoggedIn" />
</template>

