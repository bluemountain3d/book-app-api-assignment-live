<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    // Skicka registreringsdata till servern
    await axios.post('http://localhost:3000/auth/register', {
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
  <div class="register-container">
    <h2>Skapa konto</h2>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Användarnamn" required />
      <input v-model="password" type="password" placeholder="Lösenord" required />
      <button type="submit">Skapa konto</button>
    </form>
    <p>Redan medlem? <router-link to="/login">Logga in här</router-link></p>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

p {
  margin-top: 20px;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>
