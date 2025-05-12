<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    await axios.post('http://localhost:3000/auth/register', {
      username: email.value,
      password: password.value,
      is_admin: false
    })
    alert('Registrering lyckades!')
    router.push('/login')
  } catch (error) {
    if (error.response?.status === 400) {
      alert('Ogiltig inmatning.')
    } else if (error.response?.status === 409) {
      alert('E-postadressen är redan registrerad.')
    } else {
      alert('Registrering misslyckades!')
    }
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="register">
    <input v-model="email" type="email" placeholder="E-post" required />
    <input v-model="password" type="password" placeholder="Lösenord" required />
    <button type="submit">Skapa konto</button>
  </form>
</template>

<style scoped lang="scss"></style>