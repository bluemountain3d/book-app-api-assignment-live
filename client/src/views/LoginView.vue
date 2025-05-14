<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value
    })
       console.log("Login response:", res.data);  
    const { token, user } = res.data

    if (!token || !user) {
      alert('Login misslyckades. Ingen token eller användare.');
      return;
    }

    // Spara användardata och token till Pinia och localStorage
    authStore.login(user, token)

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    // Navigera beroende på om användaren är admin eller inte
    if (user.is_admin) {
      router.push('/admin') // Om admin, gå till admin-panelen
    } else {
      router.push('/') // Annars till startsidan
    }
  } catch (err) {
    alert('Fel användarnamn eller lösenord')
    console.error(err)
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Logga in</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="email" placeholder="E-post" required />
      <input v-model="password" type="password" placeholder="Lösenord" required />
      <button type="submit">Logga in</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
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
</style>