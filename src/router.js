import { createRouter, createWebHistory } from 'vue-router'

// import CoachesDetail from '@/pages/coaches/CoachesDetail.vue'
import CoachesList from '@/pages/coaches/CoachesList.vue'
// import CoachesRegister from '@/pages/coaches/CoachesRegister.vue'
// import ContactCoach from '@/pages/requests/ContactCoach.vue'
// import Requests from '@/pages/requests/Requests.vue'
// import UserAuth from '@/pages/auth/UserAuth.vue'
import NotFound from '@/pages/error/NotFound.vue'

import store from '@/store/index.js'

const CoachesDetail = () => import('@/pages/coaches/CoachesDetail.vue')
const CoachesRegister = () => import('@/pages/coaches/CoachesRegister.vue')
const ContactCoach = () => import('@/pages/requests/ContactCoach.vue')
const Requests = () => import('@/pages/requests/Requests.vue')
const UserAuth = () => import('@/pages/auth/UserAuth.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    { 
      path: '/coaches/:id', 
      component: CoachesDetail, 
      props: true,
      children: [
        { path: 'contact', component: ContactCoach } // '/coaches/102/contact'
      ] 
    },
    { path: '/register', component: CoachesRegister, meta: { authRequired: true } },
    { path: '/requests', component: Requests, meta: { authRequired: true } },
    { path: '/auth', component: UserAuth, meta: { authNotRequired: true } },
    { path: '/:notFound(.*)', component: NotFound }, // Error
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.authRequired && !store.getters.isAuth) {
    next('/auth')
  } else if (to.meta.authNotRequired && store.getters.isAuth) {
    next('/coaches')
  } else {
    next()
  }
})

export default router