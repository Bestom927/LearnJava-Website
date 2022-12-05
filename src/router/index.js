import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Lesson from '../views/LessonCenter.vue'
import Anwser from '../views/Anwser.vue'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path: '/register',
    name: 'register',
    component:Register
  },
  {
    path: '/lesson',
    name: 'lesson',
    component:Lesson
  },
  {
    path: '/anwser',
    name: 'anwser',
    component:Anwser
  },
  {
    path:'/lessondetail/:lesson_id',
    name:'lessondetail',
    component:()=>import('../views/LessonDetail.vue')
  },
  {
    path:'/lessondetail/:lesson_id/:chapter_id',
    name:'lessonchapter',
    component:()=>import('../views/LessonChapter.vue')
  },
  {
    path:'/lessonAnswer/:lesson_id/:chapter_id',
    name:'lessonAnswer',
    component:()=>import('../views/LessonAnswer.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to=>{
  if(to.matched.some(record=>record.meta.requireAuth)){
    //如果需要验证登录状态
    if(store.state.is_login==true){
      return true
    }
    else{
      ElMessage({
        message: '请先登录',
        type: 'warning',
        showClose:true,
        duration:2000
      })
      return{
        path:'/login',
        query:{redirect:to.fullPath}
      }
    }
  }
  else{
    return true
  }
})
export default router
