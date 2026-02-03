// 路由守卫
import { authService } from '@/services/auth.js'

// 需要认证的路由
const protectedRoutes = [
  '/transition-gap',
  '/transition-platform', 
  '/transition-dashboard',
  '/upload',
  '/upload-success',
  '/uploading',
  '/processing',
  '/complete',
  '/loading',
  '/final',
  '/quote',
  '/destroying'
]

// 认证守卫
export const authGuard = (to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()
  const isProtectedRoute = protectedRoutes.includes(to.path)
  
  if (isProtectedRoute && !isAuthenticated) {
    // 未登录用户访问受保护路由，重定向到登录页
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    // 已登录用户访问登录/注册页，重定向到主页
    next('/transition-gap')
  } else {
    next()
  }
}

// 页面标题守卫
export const titleGuard = (to, from, next) => {
  const titles = {
    '/': '38μs Trading Platform',
    '/login': 'Login - 38μs Trading Platform',
    '/register': 'Register - 38μs Trading Platform',
    '/transition-gap': 'Transition Gap - 38μs Trading Platform',
    '/transition-platform': 'Transition Platform - 38μs Trading Platform',
    '/transition-dashboard': 'Dashboard - 38μs Trading Platform',
    '/upload': 'Upload - 38μs Trading Platform',
    '/upload-success': 'Upload Success - 38μs Trading Platform',
    '/uploading': 'Uploading - 38μs Trading Platform',
    '/processing': 'Processing - 38μs Trading Platform',
    '/complete': 'Complete - 38μs Trading Platform',
    '/loading': 'Loading - 38μs Trading Platform',
    '/final': 'Final - 38μs Trading Platform',
    '/quote': 'Quote - 38μs Trading Platform',
    '/destroying': 'Destroying - 38μs Trading Platform'
  }
  
  document.title = titles[to.path] || '38μs Trading Platform'
  next()
}
