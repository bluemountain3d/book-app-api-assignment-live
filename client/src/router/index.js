import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAdmin: true },
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue'),
    },
    {
      path: '/books/:id',
      name: 'book',
      component: () => import('../views/SingleBookView.vue'),
    },
    {
      path: '/books/:id',
      name: 'book',
      component: () => import('../views/SingleBookLoggedIn.vue'),
      meta: { requiresAuth: true  },
    },
  ],
})

// Kontrollera användarstatus och admin-behörigheter
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAdmin) {
    // Kontrollera om användaren är inloggad och har admin-behörighet
    if (!authStore.isLoggedIn || !authStore.isAdmin) {
      return next({ name: 'login' })
    }

  }

  next()
})
export default router

