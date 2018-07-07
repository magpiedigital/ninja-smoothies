import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddSmoothie from './views/AddSmoothie.vue'
import EditSmoothie from './views/EditSmoothie.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-smoothie',
      name: 'addsmoothie',
      component: AddSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'editsmoothie',
      component: EditSmoothie
    }
  ]
})