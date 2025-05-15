<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import ButtonComponent from './ButtonComponent.vue';

const API_URL = import.meta.env.VITE_API_URL;

const route = useRoute()
const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  rating: '',
  name: '',
  bookId: route.params.id
})

const confirmationMessage = ref('');
const showConfirmation = ref(false);
const errorMessage = ref('');

const reloadPage = () => {
  router.push('/books');
};

  const submit = async () => {
  if (!form.title || !form.content || !form.rating || !form.name) {
    errorMessage.value = 'Alla fält måste vara ifyllda!';
    return;
  }

  if (form.rating > 5 || form.rating < 0) {
    errorMessage.value = 'Ratingen måste vara en siffra mellan 1 och 5';
    return;
  }
    try {
      await fetch(`${API_URL}reviews`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      confirmationMessage.value = 'Recensionen har skickats!';
      showConfirmation.value = true;
      Object.assign(form, { title: '', content: '', rating: '', name: '' })
      errorMessage.value = '';

    } catch(error) {
      console.log(error)
    }
  }

</script>

<template>

  <h2>Skriv en recension</h2>
  <section class="crerate-review">

    <div v-if="confirmationMessage" class="confirmation-message">
      <p>{{ confirmationMessage }}</p>
      <ButtonComponent
        label="Tillbaka till boksidan"
        @click="reloadPage"
        class="btn"
      />
    </div>

    <form class="crerate-review__form-container container-boxed" @submit.prevent="submit">
      <div class="crerate-review__input-fields">
        <label for="header">Rubrik: </label>
          <input type="text" id="header" v-model="form.title" placeholder="Rubrik på din recension" required>
        <label for="content">Recension: </label>
          <input type="text" id="content" v-model="form.content" placeholder="Skriv din recension här" required>
        <label for="rating">Rating (1-5) </label>
          <input type="number" id="rating" v-model="form.rating" placeholder="Skriv en siffra mellan 1 och 5 här" required>
        <label for="name">Ditt namn: </label>
          <input type="text" id="name" v-model="form.name" placeholder="Skriv ditt namn här" required>
      </div>

      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="button-container">
        <ButtonComponent
          label="Skicka recension"
          @click="submit"
          class="btn"
        />
        <ButtonComponent
          label="Rensa fält"
          @click="() => Object.assign(form, { title: '', content: '', rating: '', name: '' })"
          class="primary-btn btn"
        />
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
h2 {
  color: var(--color-primary);
  font-size: var(--font-size-600);
  padding-inline: 6rem;
  padding-block: 1rem;
}
.confirmation-message {
  background-color: var(--color-primary);

  padding: 2em;
  margin-bottom: 20px;
  text-align: center;

  p {
    font-size: var(--font-size-400);
    font-weight: 500;
    color: white;
  }
}

.crerate-review {
  padding-inline: 6rem;
  padding-bottom: 2rem;

  &__form-container {
    background-color: var(--color-background-accent);
    border: 2px solid var(--color-details);
    box-sizing: border-box;
    padding-inline: 4rem;
    padding-block: 1rem;

  }

  &__input-fields {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding-inline: 10rem;

    label {
      padding-top: 1rem;
      font-weight: 500;
    }

    input {
      height: 2rem;
      padding-inline: 1rem;
    }
  }

  .error-message {
    padding-block: 1rem;
    text-align: center;
    font-size: var(--font-size-200);
    color: red;
  }
  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
}
</style>
