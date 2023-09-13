<template>
  <el-card>
    <el-page-header content='新闻列表' icon="" title="新闻管理"></el-page-header>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
        <el-table-column
            prop="title"
            label="标题"
            width="180"
        />
        <el-table-column
            label="分类"
        >
        <template #default="scope">
          {{ categoryFormat(scope.row.category) }}
        </template>
        </el-table-column>
        <el-table-column
            label="更新时间"
        >
        <template #default="scope">
          {{ formaTime.getTime(scope.row.editTime) }}
        </template>
        </el-table-column>
        <el-table-column
            label="是否发布"
        >
        <template #default="scope">
          <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0" @change="handleSwichChange(scope.row)"/>
        </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
              <el-button
                    circle
                    :icon="Star"
                    size="small"
                    @click="handlePreview( scope.row)"
                    type="success"
                ></el-button>
                <el-button
                    circle
                    :icon="Edit"
                    size="small"
                    @click="handleEdit( scope.row)"
                ></el-button>
                
                <el-popconfirm title="你确定要删除吗?" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete(scope.row)">
                    <template #reference>
                        <el-button
                    circle
                    :icon="Delete"
                    size="small"
                    type="danger"
                ></el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
  v-model="dialogVisible"
  title="预览新闻"
  width="50%"
  >
  <div>
    <h2>{{ previewData.title }}</h2>
    <div style="font-size: 12px;color: gray;">{{ formaTime.getTime(previewData.editTime) }}</div>
    <el-divider />
    <div v-html="previewData.content" class="htmlcontent"></div>
  </div>
  </el-dialog>
</template>
  
<script setup>
import {ref,onMounted} from 'vue'
import axios  from 'axios'
import formaTime from '@/util/fomatTime'
import {Star,Edit,Delete} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const router=useRouter()
//新闻列表数据
const tableData=ref([])
//预览新闻的数据
const previewData=ref({})
//控制预览对话框的显示
const dialogVisible=ref(false)
onMounted(() => {
  //获取数据
  getTableData()
})
//定义获取后端数据的函数
const getTableData=async()=>{
  //axios请求获取后端数据
  const res=await axios.get('/adminapi/news/list')
  // console.log(res.data.data)
  tableData.value=res.data.data
  console.log(tableData)
}

//格式化分类信息
const categoryFormat=(category)=>{
  const arr=['最新动态','典型案例','通知公告']
  return arr[category-1]
}
//是否发布开关的回调
const handleSwichChange=async(item)=>{
  await axios.put('/adminapi/news/publish',{
    _id:item._id,
    isPublish:item.isPublish
  })
  await getTableData()
}
//点击预览按钮的回调
const handlePreview=(data)=>{
  previewData.value=data
  dialogVisible.value=true
}
//confirm删除按钮回调
const handleDelete=async(item)=>{
  //传id后端删除
  await axios.delete(`/adminapi/news/list/${item._id}`)
  await getTableData()
}
//点击编辑按钮的回调
const handleEdit=(item)=>{
  //跳转到编辑页面
  router.push(`/news-manage/editnews/${item._id}`)
}
</script>
  
<style lang="scss" scoped>
.el-table{
  margin-top: 50px;
}
::v-deep.htmlcontent{
  img{
    max-width: 100%;
  }
}
</style>