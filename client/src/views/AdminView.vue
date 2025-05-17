<script setup>
  import UserAdmin from '@/components/UserAdmin.vue';
  import AddBook from '@/components/AddBook.vue';
  import BooksTable from '@/components/BooksTable.vue';
</script>

<template>
  <main>
    <div class="admin container-boxed">
      <h1 class="admin__title">Adminpanel</h1>
      <UserAdmin />
      <AddBook />
      <BooksTable />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .admin {
    padding-block: 4rem;
    display: grid;
    gap: 4rem;

    &__title {
      font-size: var(--font-size-900);
      font-weight: 700;
      line-height: 1.2;
    }
  }
</style>
