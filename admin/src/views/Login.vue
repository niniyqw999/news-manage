<template>
  <div>
    <!-- 配置粒子展示 -->
    <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px" class="loginform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm()" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { loadFull } from "tsparticles"
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {ElMessage} from 'element-plus'
import axios from 'axios'
import {useStore} from 'vuex'

const store=useStore()
const router = useRouter()
//表单响应式数据
const loginForm = reactive({
  username: '',
  password: ''
})
//表单引用对象
const loginFormRef = ref()
//校验规则
const loginRules = reactive({
  username: [
    {
      required: true, message: '请输入用户名', trigger: 'blur'
    }
  ],
  password: [
    {
      required: true, message: '请输入密码', trigger: 'blur'
    }
  ]
})
//点击登录提交表单
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // console.log(loginForm)
      // localStorage.setItem('token', 'aaa')
      axios.post('/adminapi/user/login',loginForm).then((res) => {
        console.log(res.data)
        if(res.data.ActionType==='ok'){
          store.commit('changeUserinfo',res.data.data)
          store.commit('changeGetterRouter',false)
          router.push('/index')
        }else{
          ElMessage.error('用户名错误或密码错误')
        }
      })
      // router.push('/index')
    }
  })
}

//配置particles(粒子)
const options = {
  background: {
    color: {
      value: "#2d3a4b"
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#66CCFF"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
};
// 配置粒子变换函数
const particlesInit = async (engine) => {
  await loadFull(engine)
}
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }

  .loginform {
    margin-top: 20px;
  }
}

// 设置深度选择(选择唯一属性,修改样式)
::v-deep .el-form-item__label {
  color: white;
}
</style>    