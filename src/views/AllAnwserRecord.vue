<template>
    <div>全部的答题记录</div>
    
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="lesson_name" label="lesson" />
        <el-table-column prop="chapter_name" label="chapter" width="240" />
        <el-table-column prop="question_content" label="question" width="360" />
        <el-table-column prop="user_answer" label="answer"  width="360"/>
        <el-table-column prop="answer_time" label="Date" width="240" />
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
            "answer_time": "2022-12-06T08:25:29.000+00:00",
                "user_answer": "A",
                "score": "未批改",
                "lesson_name": "Java语言程序设计",
                "question_type": "choice_question",
                "question_content": "下列说法正确的是？",
                "chapter_name": "第一章 Java语言与程序设计基础",
                "chapter_id": 1,
                "question_id": 1,
                "lesson_id": 1
          }
        ],
      };
    },
    created() {
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
          user_id: this.$store.state.user_info.user_id,
        },
      })
      .then((res) => {
        console.log(res);
        this.tableData = res.data.data.data;
        //把datatable的answer_time转换为本地时间
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].answer_time = new Date(
            this.tableData[i].answer_time
          ).toLocaleString();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
  };
  </script>