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

    const { token, user } = res.data

    // Spara användardata och token till Pinia och localStorage
    authStore.login(user, token) 

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    router.push('/') 
  } catch (err) {
    alert('Fel användarnamn eller lösenord')
    console.error(err)
  }
}

</script>

<template>
 <form @submit.prevent="login">
    <input v-model="username" placeholder="E-post" required />
    <input v-model="password" type="password" placeholder="Lösenord" required />
    <button type="submit">Logga in</button>
  </form>
</template>

<style scoped lang="scss"></style>
