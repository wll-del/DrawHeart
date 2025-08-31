import { createRouter, createWebHistory } from 'vue-router'

import NavigationBar from '@/views/ NavigationBar.vue'
import MakeSandBox from '@/views/MakeSandBox.vue'
import Lovi from '@/views/Lovi.vue'
import Community from '@/views/Community.vue'
import Personal from '@/views/Personal.vue'
import PostOne from '@/views/community/PostOne.vue'
import ShowPost from '@/views/community/ShowPost.vue'
import ShowDialog from '@/views/community/ShowDialog.vue'

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
          path: 'showpost',
          name: 'ShowPost',
          component: ShowPost
        },
        {
            path: 'showdialog',
            name: 'ShowDialog',
            component: ShowDialog
        },
        {
          path: 'personal',
          name: 'Personal',
          component: Personal
        },
        {
          path: 'postone',
          name: 'PostOne',
          component: PostOne,
          mata:{isDialog:true} //标记为弹窗路由
        }
      ]
    },
  ]
})

export default router
