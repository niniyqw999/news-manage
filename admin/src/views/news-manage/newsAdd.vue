<template>
    <el-page-header content='创建新闻' icon="" title="新闻管理"></el-page-header>
    <el-form ref="newsFormRef" label-width="120px" class="demo-ruleForm" :model="newsForm"
                    :rules="newsFormRules">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="newsForm.title" />
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                       <Editor @event="editorChange"></Editor>
                    </el-form-item>
                    <el-form-item label="类别" prop="category">
                        <el-select v-model="newsForm.category">
                            <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"
                                 />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="封面" prop="cover">
                        <Upload :avatar="newsForm.cover" @userchange="handleChange"></Upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">创建新闻</el-button>
                    </el-form-item>
    </el-form>
</template>
  
<script setup>
import {ref,reactive} from 'vue'
import { useRouter } from 'vue-router'
import Editor from '@/components/editor/Editor'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'


const router = useRouter()
const newsFormRef=ref()
const newsForm =reactive({
    title:'',
    content:'',
    category:1,//1最新动态2典型案例3通知公告
    cover:'',
    file:'',
    isPublish:0,//0未发布1已发布
})
const newsFormRules=reactive({
    title:[{
        required:true,message:'请输入标题',trigger:'blur'
    }],
    content:[{
        required:true,message:'请输入内容',trigger:'blur'
    }],
    category:[{
        required:true,message:'请选择分类',trigger:'blur'
    }],
    cover:[{
        required:true,message:'请上传图片',trigger:'blur'
    }]
})
//类别选择
const options = [
    {
        label: "最新动态",
        value: 1,
    },
    {
        label: "典型案例",
        value: 2,
    },
    {
        label: "通知公告",
        value: 3,
    },
];

//每次editor内容改变的回调
const editorChange=(data)=>{
    // console.logo('data')
    newsForm.content=data
}
//上传封面图片的回调
const handleChange=(file)=>{
    newsForm.cover=URL.createObjectURL(file)
    newsForm.file=file
}
//点击创建新闻按钮的回调
const submitForm=()=>{
    newsFormRef.value.validate((valid)=>{
        if(valid){
            //传到后端并分配到数据库
             upload('/adminapi/news/add',newsForm)
            router.push('/news-manage/newslist')
        }
    })
}
</script>
  
<style lang="scss" scoped>
.el-form{
    margin-top: 50px;
}
</style>