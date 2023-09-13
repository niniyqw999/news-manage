import axios from "axios"

//请求拦截器
axios.interceptors.request.use(config=>{
    const token =localStorage.getItem('token')
    config.headers.Authorization=`Bearer ${token}`
    return config
},error=>{
    return Promise.reject(error)
})

//响应拦截器
axios.interceptors.response.use(response=>{
    const {authorization}=response.headers
    authorization && localStorage.setItem('token',authorization)
    return response
},error=>{
    if(status===401){
        localStorage.removeItem('token')
        window.location.href='#/login'
    }
    return Promise.reject(error)
})