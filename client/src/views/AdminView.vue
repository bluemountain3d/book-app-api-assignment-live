<script setup>

import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const users = ref([])

const newUser = ref({
  username: '',
  password: '',
  is_admin: false,
})

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/user', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    users.value = res.data
  } catch (err) {
    console.error('Kunde inte hämta användare:', err)
  }
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  await fetchUsers()
})

const toggleAdmin = async (user) => {
  try {
    const res = await axios.patch(
      `http://localhost:3000/users/${user._id}`,
      { is_admin: !user.is_admin },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )
    user.is_admin = res.data.is_admin
  } catch (err) {
    console.error('Kunde inte uppdatera adminstatus:', err)
  }
}

const deleteUser = async (id) => {
  if (!confirm('Är du säker på att du vill radera användaren?')) return
  try {
    await axios.delete(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    users.value = users.value.filter((u) => u._id !== id)
  } catch (err) {
    console.error('Kunde inte radera användare:', err)
  }
}

const createUser = async () => {
  if (!newUser.value.username || !newUser.value.password) {
    alert('Fyll i alla fält!')
    return
  }

  try {
    const res = await axios.post('http://localhost:3000/auth/register', newUser.value)
    alert('Ny användare skapad!')
    newUser.value = { username: '', password: '', is_admin: false }
    await fetchUsers()
  } catch (err) {
    console.error('Kunde inte skapa användare:', err)
  }
}
</script>

<template>
  <div>
    <h1>Adminpanel – Användare</h1>

    <!-- Skapa ny användare -->
    <h2>Skapa ny användare</h2>
    <form @submit.prevent="createUser" class="form">
      <input v-model="newUser.username" placeholder="Användarnamn" required />
      <input v-model="newUser.password" type="password" placeholder="Lösenord" required />
      <label>
        <input type="checkbox" v-model="newUser.is_admin" /> Admin
      </label>
      <button type="submit">Skapa</button>
    </form>

    <!-- Lista användare -->
    <h2>Alla användare</h2>
    <table>
      <thead>
        <tr>
          <th>Användarnamn</th>
          <th>Lösenord (hash)</th>
          <th>Admin?</th>
          <th>Skapad</th>
          <th>Åtgärder</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>
            <input type="checkbox" :checked="user.is_admin" @change="toggleAdmin(user)" />
          </td>
          <td>{{ new Date(user.created_at).toLocaleString() }}</td>
          <td>
            <button @click="deleteUser(user._id)">🗑 Radera</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
form.form {
  margin-bottom: 2rem;
}
form input {
  margin: 0.5rem;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>