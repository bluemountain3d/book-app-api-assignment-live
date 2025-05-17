<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CTAButton from '@/components/ButtonComponent.vue';

const API_URL = import.meta.env.VITE_API_URL;
const username = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    // Skicka registreringsdata till servern
    await axios.post(`${API_URL}auth/register`, {
      username: username.value,
      password: password.value,
      is_admin: false
    })

    alert('Registrering lyckades!')
    router.push('/login')
  } catch (error) {
    if (error.response?.status === 400) {
      alert('Ogiltig inmatning. Kontrollera ditt användarnamn och lösenord.')
    } else if (error.response?.status === 409) {
      alert('Användarnamnet är redan registrerad.')
    } else {
      alert('Registrering misslyckades. Försök igen senare.')
    }
    console.error(error)
  }
}
</script>

<template>
  <main>
    <section class="section register">
      <div class="register-container">
        <h2 class="register__title">Skapa konto</h2>
        <form class="form" @submit.prevent="register">
          <div class="form__field">
            <label for="username" class="form__label visually-hidden">Användarnamn</label>
            <input v-model="username" type="text" id="username" class="form__input" placeholder="Användarnamn" required />
          </div>
          <div class="form__field">
            <label for="password" class="form__label visually-hidden">Lösenord</label>
            <input v-model="password" type="password" id="password" class="form__input" placeholder="Lösenord" required />
          </div>
          <div class="form__actions">
            <CTAButton
              class="login__button"
              label="Logga in"
              type="submit"
              typeOfBtn="primary-btn"
              widthClass="full"
            />
          </div>
        </form>
        <p class="register__info">Redan medlem? <router-link to="/login">Logga in här</router-link></p>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.register-container {
  max-width: 400px;
  margin: 0 auto;
  /* padding: 20px; */
  text-align: center;
}

.register {

  &__title {
    color: var(--color-primary);
    margin-block-end: 2rem;
  }
  &__button {}

  &__info {
    margin-block-start: 1rem;
  }
}

/* form {
  display: flex;
  flex-direction: column;
} */

/* input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
} */

/* button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
} */
</style>
