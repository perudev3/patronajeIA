import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import EditorPattern from '../pages/EditorPattern.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/editor', name: 'EditorPattern', component: EditorPattern },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
