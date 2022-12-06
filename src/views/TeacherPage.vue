<template>
     <div class="about">
        <h1>This is a teacher page</h1>
    </div>
    <router-link to="/teacher/reviewed">reviewed</router-link>|
    <router-link to="/teacher/unreviewed">unreviewed</router-link>|
    
    <router-link to="/teacher/add_lesson">add_lesson</router-link>|
    <router-link to="/teacher/add_chapter">add_chapter</router-link>|
    <router-link to="/teacher/add_knowledge">add_knowldge</router-link>|
    <router-link to="/teacher/add_question">add_question</router-link>

    
  </template>
  
  <script>
  import { ElMessage } from "element-plus";
  import axios from "axios";
  import Progress from "@/components/Progress.vue";
  export default {
    name: "AnswerRecord",
    components: {Progress},
    data() {
      return {
        lesson_id: this.$route.query.lesson_id,
        tableData: [
          {
            lesson:"java",
            chapter:"java基础",
            question:"java中的基本数据类型有哪些？",
            answer:"shit",
            date:"2021-05-02",
            score:100
          }
        ],
      };
    },
    create() {
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
      axios
      .get("/api/all_answer_record", {
        params: {
          user_id: this.$store.state.user_id,
        },
      })
      .then((res) => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
  };
  </script>