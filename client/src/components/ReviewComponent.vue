<script setup>
import { ref, computed } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const props = defineProps({
  reviews: {
    type: Array,
    required: true
  }
});

const showAll = ref(false);
const visibleReviews = computed(() =>
  showAll.value ? props.reviews : props.reviews.slice(0, 2)
);

const toggleReviews = () => {
  showAll.value = !showAll.value;
};

const renderStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

</script>

<template>
  <section class="review">
    <h2>Vad andra tyckte om denna bok:</h2>

    <div v-if="reviews.length > 0">
      <ul class="review__list">
        <li class="review__container container-boxed"
            v-for="review in visibleReviews" :key="review._id">
          <p class="review__title">{{ review.title }}</p>
          <p class="review__content">{{ review.content }}</p>
          <p>{{ renderStars(review.rating) }}</p>
          <p class="review__details">- {{ review.name }}</p>
          <p class="review__details">{{ new Date(review.created_at).toLocaleDateString() }}</p>
        </li>
      </ul>

      <!-- Visa "visa fler reviews knapp" bara om det finns fler än 2 reviews -->
      <div v-if="reviews.length > 2" class="toggle-btn">
        <ButtonComponent
          :label="showAll ? 'Dölj recensioner' : 'Visa fler recensioner'"
          @click="toggleReviews"
          class="primary-btn"
        />
      </div>
    </div>

    <div v-else>
      <p>Inga recensioner ännu.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.review {
  padding-block: 1rem;
  padding-inline: 6rem;

  h2 {
    color: var(--color-primary);
    font-size: var(--font-size-600);
  }

  &__list {
    padding-block: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  &__container {
    background-color: var(--color-background-accent);
    border: 2px solid var(--color-details);
    padding: 1rem;
    box-sizing: border-box;
  }

  &__title {
    font-size: var(--font-size-400);
    color: var(--color-primary);
    font-weight: 700;
    padding-bottom: 1rem;
  }

  &__content {
    padding-bottom: 1rem;
  }

  &__details {
    color: var(--color-subtle-text);
    font-weight: 200;
    font-style: italic;
    text-align: end;
  }
  .toggle-btn {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
}
</style>
