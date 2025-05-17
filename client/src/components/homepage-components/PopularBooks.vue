<script setup>
import { computed } from 'vue';
import ButtonComponent from '../ButtonComponent.vue';

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
});

const popularBooks = computed(() =>
    Array.isArray(props.books)
    ? props.books.filter(book => book.category === 'popular')
    : []
);
</script>


<template>
  <section class="section books">
    <div class="container-boxed">
      <h2 class="books__main-title">Populära just nu</h2>

      <div class="books__group">
        <article class="book" v-for="book in popularBooks" :key="book._id">

          <picture class="book__cover">
            <img
              :src="`/images/book-covers/${book.image}-w384.jpg`"
              :alt="`Omslag till boken '${book.title}' av ${book.author}`"
              class="book__cover-img"
            />
          </picture>

          <section class="book__data">
            <header class="book__header">
              <h2 class="book__title">{{ book.title }}</h2>
              <p class="book__author">{{ book.author }}</p>
              <p class="book__description">{{ book.description }}</p>
            </header>

            <ButtonComponent
              label="Till boken"
              :to="`/books/${book._id}`"
              class="book__button"
            />
          </section>

        </article>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>

.books {

  &__main-title {
    font-size: var(--font-size-700);
    font-weight: 700;
    color: var(--color-primary);
    margin-block-end: 2.5rem;
  }

  &__group {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(31rem, 1fr));
    gap: 3rem;
  }
}

.book {
  z-index: 1;
  position: relative;
  padding: 1rem 1rem 1rem 0;
  display: flex;
  column-gap: 1.5rem;
  align-items: flex-start;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    inset: 0 0 0 1.5rem;
    background-color: var(--color-background-accent);
    border: 2px solid var(--color-details);
  }

  &__cover {
    height: auto;
    max-height: 100%;
    width: auto;
    flex: 0 0 auto;
    display: flex;
    align-self: center;
  }

  &__cover-img {
    display: block;
    height: 12.5rem;
    width: auto;
    max-width: 12.5rem;
    object-fit: contain;
  }

  &__data {
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 10rem;
    row-gap: .5rem;
  }

  &__title {
    font-size: var(--font-size-400);
    color: var(--color-primary);
    line-height: 1.2;
    margin-block-end: .25rem;
  }

  &__author {
    font-size: var(--font-size-300);
    line-height: 1.3;
    font-weight: 500;
    color: var(--color-body-text);
    margin-inline-end: 1.5rem;
  }

  &__description {
    position: relative;
    font-size: var(--font-size-300);
    line-height: 1.4;
    color: var(--color-body-text);
    margin-block: 0.6rem;
    overflow: hidden;
    display: -webkit-box;
    display: box;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    text-overflow: ellipsis;
}

  &__button {
    margin-block-start: auto;
    margin-inline-end: auto;
  }
}
</style>


