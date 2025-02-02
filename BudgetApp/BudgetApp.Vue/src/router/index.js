import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/SpendingInsightsView.vue'
import AccountView from '../views/AccountView.vue'
import StartingAmount from '../components/AccountPage/StartingAmount.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-spending',
      name: 'AddSpending',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SpendingInsights/AddTransaction.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SpendingInsights/IncomeExpenseBarChart.vue'),
    },
    {
      path: '/edit-budget',
      name: 'EditBudget',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SpendingInsights/EditBudget.vue'),
    },
    {
      path: '/Accounts',
      name: 'Accounts',
      component: AccountView,
    },
    {
      path: '/starting-amount',
      name: 'StartingAmount',
      component: StartingAmount,
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: () => import ('../components/AccountPage/TransferForm.vue'),
    },
    {
      path: '/import',
      name: 'Import',
      component: () => import ('../views/ImportTransactionsView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import ('../views/LoginView.vue'),
    },
    {
      path: '/budget',
      name: "Budget",
      component: () => import ('../views/BudgetPageView.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    if (!token) {
      return next('/login');
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('authToken');
        return next('/login');
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      return next('/login');
    }
  }

  // Otherwise allow navigation
  next();
});

export default router
