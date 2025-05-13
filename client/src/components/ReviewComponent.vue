<script setup>
defineProps({
  reviews: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-if="reviews.length > 0">
    <ul>
      <li v-for="review in reviews" :key="review._id" class="review">
        <p>{{ review.title }}</p>
        <p>{{ review.content }}</p>
        <p>{{ review.rating }}</p>
        <p>{{ review.name }}</p>
        <p>{{ new Date(review.created_at).toLocaleDateString() }}</p>
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Inga recensioner ännu.</p>
  </div>
</template>
