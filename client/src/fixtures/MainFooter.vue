<script setup>
import IconSvg from '@/components/IconSvg.vue';

</script>

<template>
    <footer class="footer">
      <span class="logo">
        <IconSvg name="brand" />
      </span>
      <p>A group project for the API Development course</p>
      <p class="footer__cred">
        <a href="https://github.com/AgnesWilson">Agnes Wilsson</a>
        <a href="https://github.com/DavidBrunni">David Brunni</a>
        <a href="https://github.com/bluemountain3d">Egil Eskilsson</a>
      </p>
    </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  position: relative;
  padding-block: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);

  font-size: var(--font-size-300);
  font-weight: 500;
  color: white;

  .logo {
    margin-bottom: 2rem;
  }

  .logo svg {
    width: 6rem;
    height: 6rem;
    fill: white;
  }

  &__cred {
    display: flex;
    margin-top: 1rem;
  }

  a {
    padding: .25rem 1.5rem;
    color: inherit;
    text-decoration: none;

    &:not(:last-child) {
      border-right: 1px solid white;
    }
  }

  a:hover {
  opacity: 0.75;
  }
}
</style>
