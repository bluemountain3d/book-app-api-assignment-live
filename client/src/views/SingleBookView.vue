<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";

import BookDetails from '@/components/BookDetails.vue';
import ReviewComponent from '@/components/ReviewComponent.vue';

const API_URL = import.meta.env.VITE_API_URL;
const book = ref({});
const route = useRoute();

onMounted(async () => {
  try {
    const id = route.params.id;

    const response = await fetch(`${API_URL}books/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    book.value = data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Fetch failed:', message);
  }
});
</script>

<template>
  <BookDetails :book="book" />

  <h2>Vad andra tyckte om denna bok:</h2>
  <ReviewComponent :reviews="book.reviews || []" />

</template>

<style lang="scss" scoped></style>
