<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
                <div class="time">
                    {{ whichTime(currentNews.editTime) }}
                </div>
            </div>
            <el-divider></el-divider>
            <div v-html="currentNews.content" class="htmlcontent"></div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in rightNews" :key="item._id" class="text item" style="padding: 14px;" @click="handleNew(item._id)">
                    <el-text :truncated="true">{{ item.title }}</el-text>
                  <div class="bottom">
                    <time class="time">{{ whichTime(item.editTime) }}</time>
                  </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref,watchEffect,onBeforeUnmount} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment'

const router = useRouter()
const route = useRoute()
//当前详情页展示的新闻数据
const currentNews = ref({})
//右侧最近新闻的数据
const rightNews=ref([])
const stop=watchEffect(async () => {
    if(!route.params.id)return
    let res1 = await axios.get(`webapi/news/list/${route.params.id}`)
    let res2 = await axios.get(`webapi/news/rightlist?limit=4`)
    currentNews.value = res1.data.data[0]
    rightNews.value=res2.data.data
})
onBeforeUnmount(()=>{
    stop()
})
//定义时间展示格式
const whichTime = time => {
    return moment(time).format('YYYY/MM/DD/ HH:mm:ss')
}
//右侧新闻点击跳转详情页
const handleNew=(id)=>{
    router.push(`/news/${id}`)
}
</script>

<style scoped lang="scss">
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}

::v-deep.htmlcontent {
    img {
        max-width: 100%;
    }
}
</style>