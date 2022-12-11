<template>
  <div class="home">
    <!-- <img alt="Java logo" src="../assets/java.jpeg" style="width:30%"> -->
    <HelloWorld v-if="this.$store.state.is_student" msg="欢迎来到LearnJava网站，你可以选择以下课程"/>
    <div v-if="!this.$store.state.is_student"> 
      
      <img alt="Java logo" src="../assets/java.jpeg" style="width:40%">
      <h1 v-if="this.$store.state.is_teacher">欢迎您，{{this.$store.state.user_info.user_name}}老师！</h1>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ElMessage } from "element-plus";
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  create(){
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
        query: { redirect: this.$route.fullPath },
      });
    }
  }
}
</script>
