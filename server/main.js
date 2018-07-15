import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import '../public/assets/css/style.css'

import Vue from 'vue'
import App from './views/App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter).use(BootstrapVue);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Home',
            component: require('./views/home.vue').default
        },
        {
            path: '/books',
            name: 'Books',
            component: require('./views/books/index.vue').default
        },
        {
            path: '/books/new/',
            name: 'Books new',
            component: require('./views/books/new.vue').default
        },
        {
            path: '/books/edit/',
            name: 'Books edit',
            component: require('./views/books/edit.vue').default
        }
    ]
});

const app = new Vue({
    el: "#app",
    router: router,
    render: h => h(App, {})
}).$mount('#app');
