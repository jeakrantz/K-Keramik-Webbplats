import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import SingleCategoryView from '../views/SingleCategoryView.vue'
import DocumentView from '../views/DocumentView.vue'
import LoginView from '../views/LoginView.vue'
import ProductsView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import SearchView from '../views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next({name : 'logga in'});
        }
      }
    },
    {
      path: '/om-webbplatsen',
      name: 'om webbplatsen',
      component: AboutView, 
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/kategorier',
      name: 'kategorier',
      component: CategoriesView,
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/enskild-kategori/:id',
      name: 'enskild kategori',
      component: SingleCategoryView,
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/dokument',
      name: 'dokument',
      component: DocumentView,
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/logga-in',
      name: 'logga in',
      component: LoginView
    },
    {
      path: '/produkter',
      name: 'produkter',
      component: ProductsView, 
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/enskild-produkt/:id',
      name: '/enskild produkt',
      /* Kontrollerat att besökaren är inloggad */
      component: SingleProductView, 
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProductView, 
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView, 
      /* Kontrollerat att besökaren är inloggad */
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          next();
        }else {
          next('/logga-in');
        }
      }
    }
  ]
})

export default router
