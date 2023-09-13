<template>
  <el-page-header content='添加产品' icon="" title="产品管理"></el-page-header>
  <el-form ref="productFormRef" label-width="120px" class="demo-ruleForm" :model="productForm" :rules="productFormRules">
    <el-form-item label="产品名称" prop="product">
      <el-input v-model="productForm.product" />
    </el-form-item>
    <el-form-item label="产品简要描述" prop="description">
      <el-input v-model="productForm.description" type="textarea"/>
    </el-form-item>
    <el-form-item label="产品详细描述" prop="details">
      <el-input v-model="productForm.details" type="textarea"/>
    </el-form-item>
    <el-form-item label="产品图片" prop="picture">
      <Upload :avatar="productForm.picture" @userchange="handleChange"></Upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">添加产品</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'

const router = useRouter()
const productFormRef = ref()
const productForm = reactive({
  product: '',
  description: '',
  details: '',
  picture: '',
  file: '',
})
const productFormRules = reactive({
  product: [{
    required: true, message: '请输入产品名称', trigger: 'blur'
  }],
  description: [{
    required: true, message: '请输入产品简要描述', trigger: 'blur'
  }],
  details: [{
    required: true, message: '请输入产品详细描述', trigger: 'blur'
  }],
  picture: [{
    required: true, message: '请上传产品图片', trigger: 'blur'
  }]
})
//上传产品图片的回调
const handleChange=(file)=>{
    productForm.picture=URL.createObjectURL(file)
    productForm.file=file
}
//点击添加产品按钮的回调
const submitForm=()=>{
    productFormRef.value.validate((valid)=>{
        if(valid){
            //传到后端并分配到数据库
             upload('/adminapi/product/add',productForm)
            router.push('/product-manage/productlist')
        }
    })
}
</script>
  
<style lang="scss" scoped>
.el-form{
    margin-top: 50px;
}
</style>