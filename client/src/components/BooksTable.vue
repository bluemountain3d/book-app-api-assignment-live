<script setup>
import { onMounted, ref } from 'vue';
const API_URL = import.meta.env.VITE_API_URL;
const books = ref([]);

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}books`);
    const data = await response.json();
    books.value = data;
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>

  <details class="details">
    <summary class="details__summary">Boklista</summary>
    <div class="details__content">
      <div class="table-wrapper">
        <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__heading">Titel</th>
            <th class="table__heading">Författare</th>
            <th class="table__heading">Utgiven</th>
            <th class="table__heading">Genrer</th>
            <th class="table__heading"></th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr class="table__row" v-for="book in books" :key="book._id">
            <td class="table__cell">{{ book.title }}</td>
            <td class="table__cell">{{ book.author }}</td>
            <td class="table__cell">{{ book.published_year }}</td>
            <td class="table__cell">{{ book.genres.join(', ') }}</td>
            <!-- Add buttons for Update and Remove -->
            <td class="table__cell"></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </details>

</template>
