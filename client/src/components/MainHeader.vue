<script setup>
  import { RouterLink } from 'vue-router';
  import IconSvg from '@/components/IconSvg.vue';
  import ButtonComponent from './ButtonComponent.vue';

  import { useAuthStore } from '@/stores/auth'; //
  import { useRouter } from 'vue-router'; //

  const authStore = useAuthStore();
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    authStore.logout();
    router.push('/'); // Redirect to home page after logout
  };
</script>

<template>
  <header class="header">
    <div class="header__inner container-boxed">

      <RouterLink to="/" class="header__brand">
        <IconSvg name="brand" />
      </RouterLink>

      <!-- <input type="checkbox" id="menu-active" class="menu-toggle-input" aria-hidden="true"/>

      <div class="menu-toggle">
        <label
          for="menu-active"
          class="menu-toggle__label"
          aria-expanded="false"
          aria-controls="main-navigation"
          aria-label="Toggle menu"
          tabindex="0">
          <span class="menu-toggle__icon" aria-hidden="true">
            <span class="menu-toggle__line"></span>
          </span>
          <span class="visually-hidden">Menu</span>
        </label>
      </div> -->

      <nav id="main-navigation" class="nav">
        <ul class="nav__menu">

          <!-- Public links always visible -->
          <li class="nav__item">
            <RouterLink to="/" class="nav__link">Hem</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/books" class="nav__link">Böcker</RouterLink>
          </li>

          <!-- Only when loggen in -->
          <template v-if="authStore.isLoggedIn"> <!-- added authStore. -->

            <!-- Links visible only for admin users -->
            <template v-if="authStore.isAdmin"> <!-- added authStore. -->
              <li class="nav__item">
                <RouterLink to="/admin" class="nav__link">Admin</RouterLink>
              </li>
            </template>

            <li class="nav__item">
              <!-- Button to logout -->
              <a href="#" class="nav__link" @click.prevent="handleLogout">Logga ut</a> <!-- added logout function -->
            </li>

          </template>

          <!-- Links for non-logged-in users -->
          <template v-else>
            <li class="nav__item">
              <RouterLink to="/login" class="nav__link">Logga in</RouterLink>
            </li>
             <li class="nav__item">
              <RouterLink to="/register" class="nav__link">Registrera dig</RouterLink>
            </li>

          </template>

        </ul>

        <!-- Link to start because we don't have a contact route -->
        <ButtonComponent
          class="nav__contact"
          label="Kontakt"
          to="/"
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
    position: relative;
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


/// Legacy
.nav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__menu {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
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

  &__contact {
    margin-inline-start: 1rem;
  }
}
/// --------


// .menu-toggle {

//   display: inline-block;
//   width: 3rem;
//   height: 3rem;
//   background-color: red;


//   &__label {
//     cursor: pointer;
//     width: 100%;
//     height: 100%;
//     display: block;
//   }

//   &__label:hover &__line {
//     background-color: var(--color-primary-tint);
//   }

//   &__icon {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }

//   &__line {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 100%;
//     height: .25rem;
//     background-color: var(--color-primary);
//   }
// }

// .nav {
//   display: block;
//   position: absolute;
//   top: 6.5rem;
//   left: 0;
//   width: 100%;
//   height: calc(100dvh - 6.5rem);

//   &__menu {
//     list-style: none;
//     display: flex;
//     flex-flow: row nowrap;
//     align-items: center;
//   }

//   &__item {
//     font-size: var(--font-size-400);
//   }

//   &__link {
//     padding: .5em 1em;
//     text-decoration: none;
//     color: var(--color-primary);
//   }

//   &__link:hover {
//     color: var(--color-accent);
//   }

//   &__contact {
//     margin-inline-start: 1rem;
//   }
// }


// @media screen and (min-width: 992px) {

//   .menu-toggle {
//     display: none;
//   }

//   .nav {
//     width: 100%;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;

//     &__menu {
//       list-style: none;
//       display: flex;
//       flex-flow: row nowrap;
//       align-items: center;
//     }

//     &__item {
//       font-size: var(--font-size-400);
//     }

//     &__link {
//       padding: .5em 1em;
//       text-decoration: none;
//       color: var(--color-primary);
//     }

//     &__link:hover {
//       color: var(--color-accent);
//     }

//     &__contact {
//       margin-inline-start: 1rem;
//     }
//   }

// }

</style>
