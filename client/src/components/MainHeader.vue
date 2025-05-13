<script setup>
  import { RouterLink } from 'vue-router';
  import IconSvg from '@/components/IconSvg.vue';
  import ButtonComponent from './ButtonComponent.vue';


</script>

<template>
  <header class="header">
    <div class="header__inner container-boxed">

      <RouterLink to="/" class="header__brand">
        <IconSvg name="brand" />
      </RouterLink>

      <nav class="nav">
        <ul class="nav__menu">
          <!-- Public links always visible -->
          <li class="nav__item">
            <RouterLink to="/" class="nav__link">Hem</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/books" class="nav__link">Böcker</RouterLink>
          </li>

          <!-- Only when loggen in and 'is_admin' is true -->
          <template v-if="isLoggedIn">

            <!-- Links visible only for admin users -->
            <template v-if="isAdmin">
              <li class="nav__item">
                <RouterLink to="/admin" class="nav__link">Admin</RouterLink>
              </li>
              <li class="nav__item">
                <!-- Button to logout -->
                <button>Logga ut</button>
              </li>
            </template>
          </template>

          <!-- Links for non-logged-in users -->
          <template v-else>
            <li class="nav__item">
              <RouterLink to="/login" class="nav__link">Logga in</RouterLink>
            </li>
          </template>

        </ul>

        <ButtonComponent
          class="button"
          label="Kontakt"
          to="/contact"
          />
      </nav>

    </div>
  </header>
</template>

<style scoped lang="scss">

.header {

  box-shadow:
    0 .125rem 0.25rem rgba(black, .08),
    0 .25rem .75rem rgba(black, .08)
  ;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__brand {
    padding: .75rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 4.5rem;
    color: var(--color-primary);

    svg {
      fill: var(--color-primary);
      aspect-ratio: 100/88;
    }
  }

}

.nav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__menu {
    list-style: none;
    display: flex;
    align-items: center;
  }

  &__item {
    font-size: var(--font-size-400);
  }

  &__link {
    padding: .5em 1em;
    text-decoration: none;
    color: var(--color-primary);
  }

  &__link:hover {
    color: var(--color-accent);
  }
}

</style>
