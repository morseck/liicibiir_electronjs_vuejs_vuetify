import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
          path: '/conteneurIndex',
          name: 'ConteneurIndex',
          component: () => import('../views/conteneurs/ConteneursIndex.vue')
       },
      {
          path: '/conteneur/:id/:numero',
          name: 'ConteneurDetail',
          component: () => import('../views/conteneurs/ConteneurDetails')
      },
      {
          path: '/produitsIndex',
          name: 'ProduitsIndex',
          component: () => import('../views/produits/ProduitsIndex')
      },
      {
          path: '/operationIndex',
          name: 'OperationIndex',
          component: () => import('../views/operations/OperationIndex')
      },
      {
          path: '/operationEntrante',
          name: 'OperationEntrante',
          component: () => import('../views/operations/OperationEntrante')
      }
      ,
      //Route vers la page historique
      {
          path: '/historique',
          name: 'historique',
          component: () => import('../views/Historique')
      }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
