import { createRouter, createWebHistory } from 'vue-router'

import NavigationBar from '@/views/ NavigationBar.vue'
import MakeSandBox from '@/views/MakeSandBox.vue'
import Lovi from '@/views/Lovi.vue'
import Community from '@/views/Community.vue'
import Personal from '@/views/Personal.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'NavigationBar',
      component: NavigationBar,
      children:[
        {
          path: 'sandbox',
          name: 'MakeSandBox',
          component: MakeSandBox
        },
        {
          path: 'lovi',
          name: 'Lovi',
          component: Lovi
        },
        {
          path: 'community',
          name: 'Community',
          component: Community
        },
        {
          path: 'personal',
          name: 'Personal',
          component: Personal
        }
      ]
    },
  ]
})

export default router
