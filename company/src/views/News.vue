<template>
  <div class="container">
    <div class="news-header" :style="{
      backgroundImage: `url(${require('@/assets/newsbg.jpg')})`,
    }">
      <h1 style="position: absolute;top: 140px;left: 43%;font-size: 50px;color: white;">新闻资讯</h1>
      <div class="search">
        <el-popover :visible="visible" placement="bottom" title="检索结果" width="50%">
          <template #reference>
            <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search" type="search"
              size="large" @input="visible = true" @blur="visible = false" />
          </template>
          <div v-if="searchnewslist.length">
            <div v-for="data in searchnewslist" :key="data._id" class="search-item" @click="handleNew(data._id)">
              {{ data.title }}
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无新闻" :image-size="50"></el-empty>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id" @click="handleNew(item._id)">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"></div>
            <div style="padding: 14px">
              <el-text :truncated="true">{{ item.title }}</el-text>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="whichTab" class="demo-tabs" style="margin-left: 20px;">
      <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
        <el-row :gutter="20">
          <el-col :span="18">
            <div v-for="data in tabnews[item.name]" :key="data._id" style="padding: 10px;" @click="handleNew(data._id)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="tab-image" :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }"></div>
                <div style="padding: 14px;float: left;">
                  <el-text :truncated="true">{{ data.title }}</el-text>
                  <div class="bottom">
                    <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item v-for="data in tabnews[item.name]" :key="data._id" :timestamp="whichTime(data.editTime)">
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :visibility-heght="100"></el-backtop>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { useRouter } from 'vue-router';

//时间中文显示
moment.locale('zh-cn')
//搜索的关键字
const searchText = ref('')
//搜索弹出框状态
const visible = ref(false)
//存储新闻数据
const newsList = ref([])
//tab选项栏选中的目标
const whichTab = ref(1)

//挂载请求新闻数据
onMounted(async () => {
  let res = await axios.get('/webapi/news/list')
  newsList.value = res.data.data
})
//与搜索相关的新闻数据
const searchnewslist = computed(() => searchText.value ? newsList.value.filter(item => item.title.includes(searchText.value)) : [])
//头部新闻展示
const topNewsList = computed(() => newsList.value.slice(0, 4))
//定义时间展示格式
const whichTime = time => {
  return moment(time).format('YYYY/MM/DD/ HH:mm:ss')
}
//tab选项栏的分类
const tablist = [
  {
    label: '最新动态',
    name: 1
  },
  {
    label: '典型案例',
    name: 2
  },
  {
    label: '通知公告',
    name: 3
  },
]
//基于选项栏再对新闻数据进行分组
const tabnews = computed(() => _.groupBy(newsList.value, item => item.category))

const router = useRouter()
//点击新闻跳转到详情页
const handleNew=(id)=>{
  router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
  position: relative;
}

.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;

  .el-input {
    width: 50%;
  }
}

.search-item {
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  /* 不换行 */
  overflow: hidden;
  /* 溢出隐藏 */
  text-overflow: ellipsis;
  /* 显示省略号 */

  &:hover {
    background: whitesmoke;
    color: skyblue;
  }
}

.topnews {
  margin: 20px;

  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }

  .time {
    font-size: 13px;
    color: gray;
  }
}

// 选项卡样式
.tab-image {
  // 选项卡新闻封面
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}

.tab-time {
  // 选项卡新闻时间
  font-size: 13px;
  color: gray;
}
</style>