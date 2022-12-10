<template>
    <el-menu
      :default-active="this.$router.currentRoute.value.name"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#87a5c7"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="0"
        ><img src="../assets/javalogo.png" class="logo"
      /></el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="home" @click="goHome"><el-icon><House /></el-icon>首页</el-menu-item>
      <el-menu-item v-if="this.$store.state.is_student" index="lesson_center" @click="goLessonCenter"
        ><el-icon><Management /></el-icon>我的课程</el-menu-item
      >
      <el-menu-item v-if="this.$store.state.is_student" index="answer_center" @click="goAnwserCenter"
        ><el-icon><DataAnalysis /></el-icon>我的答题</el-menu-item
      >
      <el-menu-item v-if="this.$store.state.is_student" index="answer_center" @click="goTryQuestion"
        ><el-icon><Pointer /></el-icon>小试牛刀</el-menu-item
      >
      
      <el-menu-item v-if="this.$store.state.is_teacher" index="teacher_center" @click="goTeacherPage"
        ><el-icon><EditPen /></el-icon>批改</el-menu-item
      >

      <el-sub-menu index="6" v-if="is_login == false">
        <template #title><el-icon><Promotion /></el-icon>登录/注册</template>
        <el-menu-item index="login" @click="goLogin"><el-icon><User /></el-icon>登录</el-menu-item>
        <el-menu-item index="register" @click="goRegister"><el-icon><CirclePlus /></el-icon>注册</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="7" v-else>
        <template #title>
          <el-avatar shape="square" :size="30" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
          <span style="margin-left:10px">{{ this.$store.state.user_info.user_name }}</span>
        </template>
  
        <el-menu-item index="person_info" @click="goPersonInformation"
          ><el-icon><Setting /></el-icon>账户设置</el-menu-item
        >
        <el-menu-item index="7-5" @click="loginOut"><el-icon><SwitchButton /></el-icon>退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script>
  import router from "@/router";
  import { ElMessage } from "element-plus";
  export default {
    components: {
      ElMessage,
    },
    data() {
      return {};
    },
    methods: {
      goHome() {
        router.push({ name: "home" });
      },
      goLessonCenter(){
        if (!this.$store.state.is_login) {
          ElMessage({
            message: "请先登录",
            type: "warning",
            showClose: true,
            duration: 2000,
          });
          /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
          this.$router.push({
            path: "/login",
            query: { redirect: '/lesson' },
          });
        }
        else{
          router.push({ name: "lesson" });
        }
      },
      goAnwserCenter(){
        if (!this.$store.state.is_login) {
          ElMessage({
            message: "请先登录",
            type: "warning",
            showClose: true,
            duration: 2000,
          });
          /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
          this.$router.push({
            path: "/login",
            query: { redirect: '/allAnwserRecord' },
          });
        }
        else{
          router.push({ name: "allAnwserRecord" });
        }
        
    },
    goTryQuestion(){
      if (!this.$store.state.is_login) {
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
        this.$router.push({
          path: "/login",
          query: { redirect: '/tryQuestion' },
        });
      }
      else{
        router.push({ name: "tryQuestion" });
      }
    },
      goTeacherPage(){
        if (!this.$store.state.is_login) {
          ElMessage({
            message: "请先登录",
            type: "warning",
            showClose: true,
            duration: 2000,
          });
          /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
          this.$router.push({
            path: "/login",
            query: { redirect: '/teacher' },
          });
        }
        else{
          router.push({ name: "teacher" });
        }
      },
      goLogin() {
        router.push({
          name: "login",
        });
      },
      goRegister() {
        router.push({
          name: "register",
        });
      },
      goPersonInformation() {
        router.push({
          name: "person_info",
        });
      },

      //退出账号并跳转至首页
      loginOut() {
        this.$store.commit("loginOut");
        ElMessage({
          message: "账号已退出！",
          type: "success",
          showClose: true,
          duration: 2000,
        });
        this.$router.replace("/home");
      },
    },
    computed: {
      is_login() {
        return this.$store.state.is_login;
      },
    },
  };
  </script>
  
  <style scoped>
  .logo {
    height: 56px;
  }
  .flex-grow {
    flex-grow: 0.89;
  }
  </style>
  