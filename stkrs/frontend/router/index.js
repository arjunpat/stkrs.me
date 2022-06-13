import Vue from 'vue'
import VueRouter from 'vue-router'
import Discover from '../views/Discover.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'discover',
    component: Discover
  },
  {
    path: '/onboard',
    name: 'onboard',
    component: () => import('../views/Onboard.vue'),
    props: ({ query: { username, profilePic, bio } }) => ({ username, profilePic, bio }),
  },
  {
    path: '/stkr/:id',
    name: 'stkr',
    component: () => import('../views/SharedStkrs.vue'),
    props: true,
  },
  {
    path: '/wall',
    name: 'wall',
    component: () => import('../views/Wall.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('../views/Feed.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
