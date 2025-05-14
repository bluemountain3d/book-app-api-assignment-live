<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const users = ref([])

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    users.value = res.data
  } catch (err) {
    console.error('Kunde inte hämta användare:', err)
  }
}

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  fetchUsers()
})
</script>

<template>
  <h2>Alla användare</h2>
  <table>
    <thead>
      <tr>
        <th>Användarnamn</th>
        <th>Admin</th>
        <th>Skapad</th>
        <th>Lösenord (hash)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.username }}</td>
        <td>{{ user.is_admin ? 'Ja' : 'Nej' }}</td>
        <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
        <td>{{ user.password }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>