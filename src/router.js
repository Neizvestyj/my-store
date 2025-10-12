import { createRouter, createWebHistory } from 'vue-router'
import Login from './navbar/Login.vue'
import Cart from './navbar/Cart.vue'

//const Login = () => import('./navbar/login.vue');
//onst Cart = () => import('./navbar/cart.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login, alias: '/' },
        { path: '/cart', component: Cart },

    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.meta.cantEnter) {
        next({ name: 'home' })
    } else {
        next()
    }
})

router.afterEach((to, from) => {

})

export default router