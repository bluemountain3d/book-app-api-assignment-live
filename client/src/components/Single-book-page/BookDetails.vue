<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';

defineProps({
  book: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="book">
    <div class="link">
      <RouterLink to="/books">Tillbaka till föregående sida</RouterLink>
    </div>
    <div class="book__container container-boxed">
      <img
        :src="`/images/book-covers/${book.image}-w384.jpg`"
        :alt="`Omslag till boken '${book.title}' av ${book.author}`"
        class="book__image"
      />

      <section class="book__data">
        <h1 class="book__title">{{ book.title }}</h1>
        <p class="book__info">
          <span class="book__author">{{ book.author }}</span>
          <span class="book__year">Utgivningsår: {{ book.published_year }}</span>
        </p>

        <section>
          <h3 class="book__genres-title">Genrer:</h3>
            <ul class="book__genres-list">
              <li class="book__genre-item" v-for="genre in book.genres" :key="genre">
                <span>{{ genre }}</span>
              </li>
            </ul>
        </section>
        <section>
          <span class="book__description">{{ book.description }}</span>
          <h3 class="book__price">145 kr inbunden - finns i lager</h3>
          <ButtonComponent
              label="Lägg i varukorg"
              class="book__button"
            />
        </section>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.book {
  padding-block: 4rem;
  padding-inline: 6rem;

  .link {
    margin-bottom: 2rem;
    font-size: var(--font-size-400);

    a {
      color: var(--color-primary);
      font-weight: 600;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background-color: var(--color-background-accent);
    border: 2px solid var(--color-details);
    padding: 1rem;
  }

  &__image {
    max-width: 20rem;
    margin-left: -2rem;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  &__data {
    flex: 2 1 30rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .book__title {
      font-size: var(--font-size-700);
      font-weight: 700;
      color: var(--color-primary);
    }

    .book__info {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      color: var(--color-subtle-text);

      .book__author {
        font-size: var(--font-size-500);
        font-weight: 500;
        color: var(--color-body-text);
      }

      .book__year {
        font-size: var(--font-size-400);
        color: var(--color-subtle-text);
      }
    }

    .book__genres-title {
      font-size: var(--font-size-400);
      font-weight: 700;
      color: var(--color-subtle-text);
      margin-bottom: 0.5rem;
    }

    .book__genres-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      list-style: none;

      .book__genre-item {
        background-color: var(--color-primary);
        color: white;
        padding: 0.4rem 0.75rem;
        font-size: var(--font-size-300);
      }
    }

    .book__description {
      line-height: 1.6;
      color: var(--color-body-text);
    }

    .book__price {
      font-size: var(--font-size-400);
      font-weight: 700;
      color: var(--color-primary);
      margin-top: 15%;
    }

    .book__button {
      margin-top: 0.8rem;
    }
  }
}
</style>
