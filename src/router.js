import { createRouter, createWebHistory } from 'vue-router'

//import Login from './navbar/Login.vue'
//import Cart from './navbar/Cart.vue'
//import Promo from './Promo.vue'

const Login = () => import('./navbar/login.vue');
const Cart = () => import('./navbar/cart.vue');
const Promo = () => import('./promo.vue');
const promomini = () => import('./p/PromoMini.vue');
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/promo' },
        { path: '/promo', component: Promo },
        { path: '/login', component: Login },
        { path: '/cart', component: Cart },
        { path: '/promomini', component: promomini },

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