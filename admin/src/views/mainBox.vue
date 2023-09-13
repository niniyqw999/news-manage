<template>
     <el-container>
        <sideMenu></sideMenu>
      <el-container direction="vertical">
        <topHeader></topHeader>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
  
<script setup>
  import topHeader from '../components/mainbox/topHeader'
  import sideMenu  from '../components/mainbox/sideMenu'
</script>
  
<style lang="scss" scoped>
.el-main{
    overflow: auto;
    height: calc(100vh-60px);
  }
</style>