import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, titleGuard } from './guards.js'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/transition-gap',
    name: 'TransitionGap',
    component: () => import('../views/TransitionGap.vue')
  },
  {
    path: '/transition-platform',
    name: 'TransitionPlatform',
    component: () => import('../views/TransitionPlatform.vue')
  },
  {
    path: '/transition-dashboard',
    name: 'TransitionDashboard',
    component: () => import('../views/TransitionDashboard.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/uploading',
    name: 'Uploading',
    component: () => import('../views/Uploading.vue')
  },
  {
    path: '/upload-success',
    name: 'UploadSuccess',
    component: () => import('../views/UploadSuccess.vue')
  },
  {
    path: '/processing',
    name: 'Processing',
    component: () => import('../views/Processing.vue')
  },
  {
    path: '/destroying',
    name: 'Destroying',
    component: () => import('../views/Destroying.vue')
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import('../views/Complete.vue')
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import('../views/Loading.vue')
  },
  {
    path: '/final',
    name: 'Final',
    component: () => import('../views/Final.vue')
  },
  {
    path: '/quote',
    name: 'Quote',
    component: () => import('../views/Quote.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加全局前置守卫
router.beforeEach(authGuard)
router.beforeEach(titleGuard)

export default router
