// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import Users from './components/Users'
import HelloWorld from './components/HelloWorld'
import Home from './components/Home'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/helloworld", component: HelloWorld },
  ],
  mode: 'history'
})

//全局调用组件
// Vue.component("users", Users)

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
