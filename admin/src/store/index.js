import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRouter:false,
    isCollapsed:false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter=value
    },
    //控制侧边栏的展开
    changeCollapsed(state){
      state.isCollapsed=!state.isCollapsed
    },
    //更新用户信息
    changeUserinfo(state,value){
      state.userInfo={
        ...state.userInfo,
        ...value
      }
    },
    //清除用户信息
    clearUserInfo(state){
      state.userInfo={}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:['isCollapsed','userInfo']//控制是否持久化
  })]
})
