<script setup>
import { ref, onMounted } from 'vue';

  import HomepageBanner from '@/components/homepage-components/HomepageBanner.vue';
  import PopularBooks from '@/components/homepage-components/PopularBooks.vue';
  import BookShelf from '@/components/homepage-components/BookShelf.vue';

  const API_URL = import.meta.env.VITE_API_URL;
  const books = ref([]);

  onMounted( async () => {
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
  <main>
    <HomepageBanner />
    <PopularBooks :books="books"/>

    <BookShelf />
  </main>
</template>
<style scoped lang="scss"></style>
