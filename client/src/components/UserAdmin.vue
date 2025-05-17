<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL;
const authStore = useAuthStore()
const router = useRouter()
const users = ref([])

const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}users`, {
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
<details class="details" open>
    <summary class="details__summary">Användarlista</summary>
    <div class="details__content">
      <div class="table-wrapper">
        <table class="table">
          <thead class="table__header">
            <tr class="table__row">
              <th class="table__heading">Användarnamn</th>
              <th class="table__heading">Admin</th>
              <th class="table__heading">Skapad</th>
              <th class="table__heading"></th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr
              class="table__row"
              v-for="user in users"
              :key="user._id"
              :class="{ 'admin-row': user.is_admin }"
            >
              <td class="table__cell">{{ user.username }}</td>
              <td class="table__cell">{{ user.is_admin ? 'Ja' : 'Nej' }}</td>
              <td class="table__cell">{{ new Date(user.createdAt).toLocaleString() }}</td>
               <!-- Add buttons for Update and Remove -->
              <td class="table__cell"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</template>

<style scoped>
.admin-row {
  background-color: #e6ffed;
}

table {
  /* border-collapse: collapse; */
  /* width: 100%; */
}
th,
td {
  /* padding: 8px; */
  /* border: 1px solid #ccc; */
}
</style>
