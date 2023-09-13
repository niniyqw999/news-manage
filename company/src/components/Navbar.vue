<template>
    <el-menu
    :default-active="route.fullPath"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    :router="true"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/news" >新闻中心</el-menu-item>
    <el-menu-item index="/product">产品与服务</el-menu-item>
    <el-menu-item index="" @click="login">登录</el-menu-item>
    <div class="flex-grow" />
    <h3 style="margin: 16px 20px;">企业门户官网</h3>
  </el-menu>
  
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
//登录跳转admin登录页面
const login=()=>{
    window.location='http://localhost:8080'
}
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.el-menu-demo{
    position: sticky;
    top: 0px;
    z-index: 999;
}
</style>