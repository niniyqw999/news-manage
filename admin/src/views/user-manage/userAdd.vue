<template>
     <el-page-header content='添加用户' icon="" title="用户管理"></el-page-header>
     <el-form ref="userFormRef" label-width="120px" class="demo-ruleForm" :model="userForm"
                    :rules="userFormRules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="userForm.password" type="password" />
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="userForm.role">
                            <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"
                                 />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人简介" prop="introduction">
                        <el-input type="textarea" v-model="userForm.introduction" />
                    </el-form-item>
                    
                    <el-form-item label="头像" prop="avatar">
                        <Upload :avatar="userForm.avatar" @userchange="handleChange"></Upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">添加用户</el-button>
                    </el-form-item>
                </el-form>
</template>
  
<script setup>
import {ref,reactive} from 'vue'
import Upload from '@/components/upload/Upload'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'

const router=useRouter()
const userFormRef=ref()
const userForm=reactive({
    username:'',
    password:'',
    role:2,//1是管理员2是编辑
    introduction:'',
    avatar:'',
    file:null,
    gender:0
})
const userFormRules=reactive({
    username: [{ required: true, message: "请输入名字", trigger: "blur" }],
    password: [{ required: true, message: "请输入名字", trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
    avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
//角色选择
const options = [
    {
        label: "管理员",
        value: 1,
    },
    {
        label: "编辑",
        value: 2,
    },
];

//每次选择完图片之后的回调
const handleChange = file => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
// 点击添加按钮
const submitForm = ()=>{
    // 判断表单数据身份通过规则校验(返回true或false)
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            //提交数据到后端
            // console.log(userForm)
            await upload('/adminapi/user/add',userForm)
            router.push(`/user-manage/userlist`)// 路由跳转到用户列表
        }
    })
}
</script>
  
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>