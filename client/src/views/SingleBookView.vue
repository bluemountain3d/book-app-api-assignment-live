<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";

import BookDetails from '@/components/Single-book-page/BookDetails.vue';
import ReviewList from '@/components/Single-book-page/ReviewList.vue';
import HideRewiewForm from '@/components/Single-book-page/HideRewiewForm.vue';

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
  <ReviewList :reviews="book.reviews || []" />
  <HideRewiewForm />

</template>

<style lang="scss" scoped></style>
