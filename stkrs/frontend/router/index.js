import Vue from 'vue'
import VueRouter from 'vue-router'
import Discover from '../views/Discover.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'discover',
    component: Discover,
    meta: {showNavBar: true},
  },
  {
    path: '/onboard',
    name: 'onboard',
    component: () => import('../views/Onboard.vue'),
    props: ({ query: { username, profilePic, bio } }) => ({ username, profilePic, bio }),
    meta: {showNavBar: false},
  },
  {
    path: '/stkr/:id',
    name: 'stkr',
    component: () => import('../views/SharedStkrs.vue'),
    props: true,
    meta: {showNavBar: true},
  },
  {
    path: '/wall',
    name: 'my-wall',
    component: () => import('../views/Wall.vue'),
    meta: {showNavBar: true},
  },
  {
    path: '/wall/:id',
    name: 'wall',
    component: () => import('../views/Wall.vue'),
    props: true,
    meta: {showNavBar: true},
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {showNavBar: true},
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('../views/Feed.vue'),
    meta: {showNavBar: true},
  },
]

const router = new VueRouter({
  routes
})

export default router
