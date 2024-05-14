import { createRouter, createWebHashHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';

import ChatView from '../views/ChatView.vue';
import HomeView from '../views/HomeView.vue';

import api from '@/services/api';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresNotLogged:true }
  },
  {
    path: '/sing-up',
    name: 'sign-up',
    component: SignUpView,
    meta: { requiresNotLogged:true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta:{ requiresAuth:true }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuth = await api.getUserData();
  const routeRequiresAuth = to.meta?.requiresAuth || false;
  
  const routeRequiresNotBeLogged = to.meta?.requiresNotLogged || false;
  if(routeRequiresAuth && !isAuth) return next({ path:"/" });

  if(routeRequiresNotBeLogged && isAuth) return next({ path:"/chat" });
  next(); 
});

export default router;
