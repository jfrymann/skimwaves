import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import SpotInfo from '../SpotInfo.vue'
import SpotEdit from '../SpotEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/spot-info/:slug/:_id',
    name: 'SpotInfo',
    component: SpotInfo
  },
  {
    path: '/spot-info/edit/:slug/:_id',
    name: 'SpotEdit',
    component: SpotEdit
  }]
});

export default router
