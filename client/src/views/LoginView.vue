<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import CTAButton from '@/components/ButtonComponent.vue';

const API_URL = import.meta.env.VITE_API_URL;
const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  try {
    const res = await axios.post(`${API_URL}auth/login`, {
      username: username.value,
      password: password.value
    },
    {
      withCredentials: true
    }
  );



    console.log("Login response:", res.data);  // Logga hela svaret här

    const { token, user } = res.data;

    if (!token || !user) {
      alert('Login misslyckades. Ingen token eller användare.');
      return;
    }

    // Spara användardata och token till Pinia och localStorage
    authStore.login(user, token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    // Kontrollera om token och användardata sparades korrekt
    console.log(localStorage.getItem('token'));  // Kontrollera token
    console.log(localStorage.getItem('user'));   // Kontrollera användardata

    // Navigera beroende på om användaren är admin eller inte
    if (user.is_admin) {
      router.push('/admin'); // Om admin, gå till admin-panelen
    } else {
      router.push('/'); // Annars till startsidan
    }
  } catch (err) {
    alert('Fel användarnamn eller lösenord');
    console.error(err);
  }
}
</script>

<template>
  <main>
    <section class="section login">
      <div class="login-container">
        <h2 class="login__title">Logga in</h2>
        <form class="form" @submit.prevent="login">
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
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.login-container {
  max-width: 400px;
  margin: 0 auto;
  /* padding: 20px; */
  text-align: center;
}

.login {

  &__title {
    color: var(--color-primary);
    margin-block-end: 2rem;
  }
  &__button {}
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
