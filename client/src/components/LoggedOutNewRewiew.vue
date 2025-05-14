<script setup>

import ButtonComponent from './ButtonComponent.vue';

</script>

<template>

  <h2>Skriv en recension</h2>
  <section class="crerate-review">

    <form class="crerate-review__form-container container-boxed">
      <input placeholder="Rubrik på din recension" required />
      <input placeholder="Din recension" required />
      <input placeholder="Rating (1-5)" required />
      <input placeholder="Ditt användarnamn" required />

      <ButtonComponent label="Skicka" :to="`submit`" class="button send" />
      <ButtonComponent label="Rensa fält" :to="`submit`" class="primary-btn clear" />
    </form>

    <section class="crerate-review__login-container container-boxed">
      <h3>Du måste logga in för att skriva en recension</h3>
      <div class="crerate-review__login-btns">
        <ButtonComponent
          label="Logga in"
          :to="`/login`"
          class="button"
        />

        <ButtonComponent
          label="Skapa användare"
          :to="`/register`"
          class="primary-btn"
        />
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
h2 {
  color: var(--color-primary);
  font-size: var(--font-size-600);
  padding-inline: 4rem;
  padding-top: 3rem;
}

.crerate-review {
  padding-inline: 4rem;

    display: grid;
    grid-template-columns: 60% 40%;
    gap: 1rem;

    &__login-container {
    background-color: var(--color-background-accent);
    border: 2px solid var(--color-details);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

    h3 {
      color: var(--color-primary);
      font-size: var(--font-size-500);
      padding-top: 3rem;
    }
  }

    &__form-container {
      filter: blur(1rem);
      background-color: var(--color-background-accent);
      border: 2px solid var(--color-details);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      padding-inline: 5rem;
      padding-block: 4rem;
    }

    &__login-btns {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding-block: 3rem;
  }
}
</style>
