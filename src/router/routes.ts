import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import ClassView from '../views/ClassView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/class',
    name: 'Class',
    component: ClassView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

export default routes
