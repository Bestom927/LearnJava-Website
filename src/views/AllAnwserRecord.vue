<template>
    <div>this is anwser</div>
    
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="lesson" label="lesson" width="120" />
        <el-table-column prop="chapter" label="chapter" width="120" />
        <el-table-column prop="question" label="question" width="360" />
        <el-table-column prop="answer" label="answer"  />
        <el-table-column prop="date" label="Date" width="240" />
        <el-table-column prop="score" label="score" width="240" />
    </el-table>
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
      .get("/api/answerSituation/getByuserId", {
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