<template>
    <el-page-header content='首页' icon="" title="企业门户网站"></el-page-header>
    <el-card class="box-card">
        <el-row>
            <el-col :span="4">
                <el-avatar :size="100" :src="avatarUrl"></el-avatar>
            </el-col>
            <el-col :span="20">
                <h3 style="line-height: 100px;">欢迎 {{ store.state.userInfo.username }} 回来,{{ welcomeText }}</h3>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公司产品</span>
            </div>
        </template>
        <el-carousel :interval="1000" type="card" height="200px" v-if="swipeData.length">
            <el-carousel-item v-for="item in swipeData" :key="item._id">
                <div :style="{backgroundImage:`url(http://localhost:3000${item.picture})`,backgroundSize:'cover'}">
                    <h3 text="2xl" justify="center">{{ item.product }}</h3>
                </div>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>
  
<script setup>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';

const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
const welcomeText = computed(() => new Date().getHours() < 12 ? '要开心每一天。' : '喝杯咖啡提提神吧。')

const swipeData = ref([])
//获取产品数据展示轮播图
onMounted(() => {
    //获取数据
    getSwipeData()
})
//定义获取后端数据的函数
const getSwipeData = async () => {
    //axios请求获取后端数据
    const res = await axios.get('/adminapi/product/list')
    // console.log(res.data.data)
    swipeData.value = res.data.data
}
</script>
  
<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: white;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
