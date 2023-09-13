import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import userAdd from '../views/user-manage/userAdd.vue'// 添加用户
import userList from '../views/user-manage/userList.vue'// 用户列表
import newsAdd from '../views/news-manage/newsAdd.vue'// 新闻添加
import newsList from '../views/news-manage/newsList.vue'// 新闻列表
import productAdd from '../views/product-manage/productAdd.vue'// 产品添加
import productList from '../views/product-manage/productList.vue'// 产品列表
import notFound from '../views/notfound/notFound.vue'
import newsEdit from '@/views/news-manage/newsEdit.vue'
import productEdit from '@/views/product-manage/productEdit.vue'

const routesConfig = [
    {
        path: '/index',
        component: Home
    },
    {
        path: '/center',
        component: Center
    },
    {// 添加用户
        path: "/user-manage/adduser",
        component: userAdd,
        // 管理员才渲染(标志位)
        requireAdmin:true
    },
    {// 用户列表
        path: "/user-manage/userlist",
        component: userList,
        // 管理员才渲染(标志位)
        requireAdmin:true
    },

    {// 新闻添加
        path: "/news-manage/addnews",
        component: newsAdd
    },
    {
        //新闻编辑
        path:"/news-manage/editnews/:id",
        component:newsEdit
    },
    {// 新闻列表
        path: "/news-manage/newslist",
        component: newsList
    },
    {// 产品添加
        path: "/product-manage/addproduct",
        component: productAdd
    },
    {// 产品编辑
        path: "/product-manage/editproduct/:id",
        component: productEdit
    },
    {// 产品列表
        path: "/product-manage/productlist",
        component: productList
    },
    {
        path:'/',
        redirect:'/index'
    },
    {
        path:'/:pathMatch(.*)*',
        name:'Notfound',
        component:notFound
    }
]

export default routesConfig