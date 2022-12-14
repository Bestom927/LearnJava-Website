import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Lesson from '../views/LessonCenter.vue'
import AnswerRecord from '../views/LessonAnswerRecord.vue'
import LearnRecord from '../views/LessonLearnRecord.vue'
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
    path: '/allAnwserRecord',
    name: 'allAnwserRecord',
    component:()=>import('../views/AllAnwserRecord.vue')
  },
  {
    path: '/lesson',
    name: 'lesson',
    component:Lesson
  },
  {
    path: '/learnrecord',
    name: 'learnrecord',
    component:LearnRecord
  },
  {
    path: '/answerrecord',
    name: 'answerrecord',
    component:AnswerRecord
  },
  {
    path:'/lessonDetail/:lesson_id',
    name:'lessonDetail',
    component:()=>import('../views/LessonDetail.vue')
  },
  {
    path:'/lessonDetail/:lesson_id/:chapter_id/knowledge',
    name:'lessonChapterKnowledge',
    component:()=>import('../views/LessonChapterKnowledge.vue')
  },
  {
    path:'/lessonDetail/:lesson_id/:chapter_id/question',
    name:'lessonChapterQuestion',
    component:()=>import('../views/LessonChapterQuestion.vue')
  },
  {
    path:'/try/question',
    name:'tryQuestion',
    component:()=>import('../views/TryQuestion.vue')
  },
  {
    path:'/teacher',
    name:'teacher',
    component:()=>import('../views/TeacherPage.vue')
  },
  {
    path:'/teacher/reviewed',
    name:'TeacherReviewed',
    component:()=>import('../views/TeacherReviewed.vue')
  },
  {
    path:'/teacher/unreviewed',
    name:'teacherUnreviewed',
    component:()=>import('../views/TeacherUnreviewed.vue')
  },
  {
    path:'/teacher/add_lesson',
    name:'teacherAddLesson',
    component:()=>import('../views/TeacherAddLesson.vue')
  },
  {
    path:'/teacher/add_chapter',
    name:'teacherAddChapter',
    component:()=>import('../views/TeacherAddChapter.vue')
  },
  {
    path:'/teacher/add_knowledge',
    name:'teacherAddKnowledge',
    component:()=>import('../views/TeacherAddKnowledge.vue')
  },
  {
    path:'/teacher/add_question',
    name:'teacherAddQuestion',
    component:()=>import('../views/TeacherAddQuestion.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to=>{
  if(to.matched.some(record=>record.meta.requireAuth)){
    //????????????????????
    if(store.state.is_login==true){
      return true
    }
    else{
      ElMessage({
        message: '????????',
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
