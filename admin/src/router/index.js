import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import mainBox from '../views/mainBox.vue'
//引入子路由数组
import routesConfig from './config'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: mainBox
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//每次路由跳转之前
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    //如果授权登录了 next()
    //未授权，重新定向login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      if(!store.state.isGetterRouter){
        //删除所有嵌套路由
        router.removeRoute('mainbox')
        configRouter()
        next({
          path:to.fullPath
        })
      }else{
         next()
      }
    }
  }
})
const configRouter = () => {
  if(!router.hasRoute('mainbox')){
    router.addRoute({
      path:'/mainbox',
      name:'mainbox',
      component:mainBox
    })
  }
  //动态创建mainbox的子路由
  routesConfig.forEach(item => {
   checkPermission(item) && router.addRoute('mainbox', item)
  })

  //改变isGetterRouter=true
  store.commit('changeGetterRouter',true)
}
//限制非管理员路由权限
const checkPermission = (item)=>{
  if(item.requireAdmin){
    return store.state.userInfo.role===1
  }
  return true
}

export default router
