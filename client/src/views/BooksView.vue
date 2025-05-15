<script setup>
  import { ref, onMounted } from 'vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  const API_URL = import.meta.env.VITE_API_URL;

  const books = ref([]);

  onMounted( async () => {
    try {
      const response = await fetch(`${API_URL}books`);
      const data = await response.json();
      // console.log(data);
      // console.log('Books loaded')
      books.value = data;
    } catch (error) {
      console.log(error);
    }
  });

</script>

<template>
  <section class="books">
    <div class="container-boxed">
      <h1 class="books__main-title">Våra böcker</h1>

      <div class="books__filter"></div>

      <div class="books__shelf">

        <article class="book" v-for="book in books" :key="book._id">
          <picture class="book__cover">
            <source
              :srcset="`/images/book-covers/${book.image}-w384.avif`"
              type="image/avif"
            />
            <source
              :srcset="`/images/book-covers/${book.image}-w384.webp`"
              type="image/webp"
            />
            <img
              :src="`/images/book-covers/${book.image}-w384.jpg`"
              :alt="`Omslag till boken '${book.title}' av ${book.author}`"
              class="book__cover-img"
            />
          </picture>

          <section class="book__data">
            <header class="book__header">
              <h2 class="book__title">{{ book.title }}</h2>
              <p class="book__metadata">
                <span class="book__author">{{ book.author }}</span>
                <span class="book__published-year">Utgivningsår: {{ book.published_year }}</span>
              </p>
            </header>
            <section class="book__genres-section">
              <h3 class="book__genres-title">Genrer:</h3>
              <ul class="book__genres-list">
                <li class="book__genre-item" v-for="genre in book.genres" :key="genre">
                  <span class="book__genre-tag">{{ genre }}</span>
                </li>
              </ul>
            </section>

            <ButtonComponent
              label="Gå till boken"
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
  margin-block-end: 4rem;

  &__main-title {
    padding-block: 4rem;
    font-size: var(--font-size-900);
    font-weight: 700;
    color: var(--color-primary);
  }

  &__filter {}

  &__shelf {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33rem, 1fr));
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
    background-color: var(--color-primary);
    color: white;
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

  &__published-year {
    font-size: var(--font-size-200);
    line-height: 1.3;
    font-weight: 500;
    color: var(--color-subtle-text);
  }

  &__genres-section {}

  &__genres-title {
    font-size: var(--font-size-200);
    line-height: 1.3;
    font-weight: 700;
    color: var(--color-subtle-text);
    margin-block-end: .25rem;
  }

  &__genres-list {
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    gap: .75rem;
  }

  &__genre-item {
    padding: .375rem .75rem;
    background-color: var(--color-primary);
    color: var(--color-background-primary);
    font-size: var(--font-size-200);
    font-weight: 500;
    line-height: 1;
    letter-spacing: .1em;
    border-radius: .125rem;
  }

  &__button {
    margin-block-start: auto;
    margin-inline-end: auto;
  }
}
</style>
