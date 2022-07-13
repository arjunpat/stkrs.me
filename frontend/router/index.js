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
    path: '/feed',
    name: 'feed',
    component: () => import('../views/Feed.vue'),
    meta: {showNavBar: true},
  },
  {
    path: '/friends',
    name: 'friends',
    component: () => import('../views/Friends.vue'),
    meta: {showNavBar: true},
  },
  {
    path: '/internal/create-stkr',
    component: () => import('../views/internal/CreateStkr.vue'),
    meta: {showNavBar: false},
  },
]

const router = new VueRouter({
  routes
})

export default router
