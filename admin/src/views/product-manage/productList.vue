<template>
  <el-card>
    <el-page-header content='产品列表' icon="" title="产品管理"></el-page-header>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
        <el-table-column
            prop="product"
            label="产品名称"
            width="180"
        />
        <el-table-column
            label="简要描述"
            prop="description"
        />
        <el-table-column
            label="更新时间"
        >
        <template #default="scope">
          {{ formaTime.getTime(scope.row.editTime) }}
        </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
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
</template>
  
<script setup>
import {ref,onMounted} from 'vue'
import axios  from 'axios'
import formaTime from '@/util/fomatTime'
import {Edit,Delete} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const router=useRouter()
//产品列表数据
const tableData=ref([])
onMounted(() => {
  //获取数据
  getTableData()
})
//定义获取后端数据的函数
const getTableData=async()=>{
  //axios请求获取后端数据
  const res=await axios.get('/adminapi/product/list')
  // console.log(res.data.data)
  tableData.value=res.data.data
}

//confirm删除按钮回调
const handleDelete=async(item)=>{
  //传id后端删除
  await axios.delete(`/adminapi/product/list/${item._id}`)
  await getTableData()
}
//点击编辑按钮的回调
const handleEdit=(item)=>{
  //跳转到编辑页面
  router.push(`/product-manage/editproduct/${item._id}`)
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