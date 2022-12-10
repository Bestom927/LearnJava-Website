<template>
  <h1>{{this.$store.state.user_info.user_name}}，{{ msg }}</h1>

  <div class="lesson_center">
    <div class="downBox">
      <div v-for="(lesson, index) in lesson_list" :key="index">
        <LessonCard :lesson="lesson"></LessonCard>
        
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import LessonCard from "./LessonChooseCard.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: 'HelloWorld',
  components: {
    LessonCard,
  },
  props: {
    msg: String
  },
  data(){
    return{
      lesson_list: [],
    }
  },
  created(){
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
    axios({
      url: "/api/lesson/getAll",
      method: "get",
    })
      .then((res) => {
        this.lesson_list = res.data.data.lessons;
        this.all_num = res.data.data.all_num;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin-left: 1vw;
  text-align:left;
}
h3 {
  
  margin-left: 2vw;
}
ul {
  list-style-type: none;
  margin-left: 1vw;
}
li {
  display: inline-block;
  margin-left: 1vw;
}
a {
  color: #42b983;
}
.lesson_center {
  
  width: 100%;
  height: 100%;
  
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
  border-radius: 17px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 1vw;
}
.lesson_center .downBox {
  
  width: 100%;
  height: 100%;
  
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
  border-radius: 17px;
}
</style>
