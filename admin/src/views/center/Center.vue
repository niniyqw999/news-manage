<template>
    <el-page-header content='个人中心' icon="" title="企业门户管理系统"></el-page-header>
    <el-row :gutter="20" class="el-row">
        <el-col :span="8">
            <el-card class="box-card">
                <el-avatar :size="100" :src="avatarUrl"></el-avatar>
                <h3>{{ store.state.userInfo.username }}</h3>
                <span>管理员</span>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>个人信息</span>
                    </div>
                </template>
                <el-form ref="userFormRef" label-width="120px" class="demo-ruleForm" :model="userForm"
                    :rules="userFormRules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userForm.gender">
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
                        <el-button type="primary" @click="submitForm">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script setup>
import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue';
import {ElMessage} from 'element-plus'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'

const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000'+store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)

const { username, gender, introduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file:null
})
// 表单数据规则
const userFormRules = reactive({
    username: [{ required: true, message: "请输入名字", trigger: "blur" }],
    gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
    avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
//性别选择
const options = [
    {
        label: "保密",
        value: 0,
    },
    {
        label: "男",
        value: 1,
    },
    {
        label: "女",
        value: 2,
    },
];

//选择图片之后的回调
const handleChange=file=>{
    userForm.avatar=URL.createObjectURL(file)
    userForm.file=file
}
//点击更新按钮
const submitForm=()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            const res=await upload('/adminapi/user/upload',userForm)
            if(res.ActionType==='ok'){
                    store.commit('changeUserinfo',res.data)
                    ElMessage.success('用户信息更新成功')
            }
        }
    })
}
</script>
  
<style scoped lang="scss">
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}

</style>