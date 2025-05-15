<script setup>
  import { ref, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';

  const API_URL = import.meta.env.VITE_API_URL;


  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const books = ref([]);

  onMounted( async () => {
    try {
      const response = await fetch(`${API_URL}books`);
      const data = await response.json();
      // console.log(data);
      // console.log('Books loaded')
      books.value = shuffle(data).slice(0, 7);
    } catch (error) {
      console.log(error);
    }
  });
</script>


<template>

  <section class="section book-shelf">
    <div class="container-boxed">
      <h2 class="book-shelf__title">Vår bokhylla</h2>
      <ul class="book-shelf__list">
        <RouterLink
          v-for="book in books"
          :key="book._id"
          :to="`/books/${book._id}`"
          custom
          v-slot="{ navigate }"
        >
          <article class="book" @click="navigate" role="link" tabindex="0">
            <picture class="book__cover">
              <source
                :srcset="`/images/book-covers/${book.image}-w192.avif`"
                type="image/avif"
              />
              <source
                :srcset="`/images/book-covers/${book.image}-w192.webp`"
                type="image/webp"
              />
              <img
                :src="`/images/book-covers/${book.image}-w192.jpg`"
                :alt="`Omslag till boken '${book.title}' av ${book.author}`"
                class="book__cover-img"
              />
            </picture>
            <div class="book__content">
              <h3 class="book__title">{{ book.title }}</h3>
              <span class="book__author">{{ book.author }}</span>
            </div>
          </article>
        </RouterLink>
      </ul>
    </div>
  </section>

</template>

<style lang="scss" scoped>

  .book-shelf {
    display: block;

    &__title {
      font-size: var(--font-size-700);
      font-weight: 700;
      line-height: 1.5;
      margin-block-end: 2.5rem;
      color: var(--color-primary);
    }

    &__list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr));
      grid-template-rows: auto;
      grid-auto-rows: 0;
      overflow: clip;
      justify-content: center;
      gap: 1.8125rem;
    }
  }

  .book {
    position: relative;
    z-index: 1;
    padding: 0 .75rem .75rem .75rem;


    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      inset: 1.25rem 0 0 0;
      background-color: var(--color-background-accent);
      border: 2px solid var(--color-details);
    }

    &__cover {
      width: 9rem;
      height: 13.5rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      // overflow: hidden;
    }

    &__cover img {
      display: block;
      width: 100%;
      height: auto;
      max-height: 100%;
      object-fit: cover;
      object-position: top;

      box-shadow:
        0 .125rem 0.25rem rgba(black, .08),
        0 .25rem .75rem rgba(black, .08)
      ;

    }

    &__content {
      margin-block-start: 1rem;
    }

    &__title {
      font-size: var(--font-size-200);
      line-height: 1.2;
      font-weight: 700;
      color: var(--color-primary);
      margin-block-end: .25rem;
    }

    &__author {
      font-size: var(--font-size-200);
      line-height: 1.3;
      font-weight: 500;
      color: var(--color-subtle-text);
    }
  }



</style>
