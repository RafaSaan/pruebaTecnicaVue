import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import('@/views/PartnersView.vue')
    },
    {
      path: '/survey',
      name: 'survey',
      component: () => import('@/views/SurveyView.vue')
    }
  ]
})

export default router
