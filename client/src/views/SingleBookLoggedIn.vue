<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";

import BookDetails from '@/components/BookDetails.vue';
import ReviewComponent from '@/components/ReviewComponent.vue';
import NewRewiew from '@/components/LoggedOutNewRewiew.vue';
import LoggedInNewReview from '@/components/LoggedInNewReview.vue';

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
  <ReviewComponent :reviews="book.reviews || []" />
  <LoggedInNewReview />

</template>

<style lang="scss" scoped></style>
