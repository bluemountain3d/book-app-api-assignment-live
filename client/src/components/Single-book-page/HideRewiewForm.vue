<script setup>

import ButtonComponent from '../ButtonComponent.vue';

</script>

<template>

  <h2>Skriv en recension</h2>
  <section class="crerate-review">

    <form class="crerate-review__form-container container-boxed">
      <span class="material-icons lock">lock</span>

      <div class="blurred-effect">
        <input placeholder="Rubrik på din recension" disabled />
        <input placeholder="Din recension" disabled />
        <input placeholder="Rating (1-5)" disabled />
        <input placeholder="Ditt användarnamn" disabled />

        <ButtonComponent label="Skicka" class="disabled" />
        <ButtonComponent label="Rensa fält" class="primary-btn disabled" />
      </div>
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
  padding-bottom: 3rem;

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
    background-color: var(--color-background-accent);
    box-shadow: 0px 0px 10px 10px var(--color-background-accent);
    box-sizing: border-box;
    margin-top: 2rem;
    padding-inline: 5rem;
    padding-block: 4rem;
    position: relative;

  .lock {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10rem;
    color: var(--color-primary);
    z-index: 10;
    pointer-events: none;
    }

    .blurred-effect {
    filter: blur(0.7rem);
    }
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
