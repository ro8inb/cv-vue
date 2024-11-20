import { createRouter, createWebHistory } from 'vue-router'
import BioView from '../views/BioView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import SkillsView from '../views/SkillsView.vue'
import CheckListERPView from '../views/CheckListERPView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'bio',
      component: BioView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView
    },
    {
      path: '/check-list-erp',
      name: 'check-list-erp',
      component: CheckListERPView
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!router.getRoutes().some(route => route.path === to.path)) {
    next('/');
  } else {
    next();
  }
});
export default router
