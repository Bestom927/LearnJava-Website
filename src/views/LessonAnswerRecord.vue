<template>
    <h1>{{this.tableData[0].lesson_name}}的答题记录</h1>
    
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="date" label="Date" width="240" /> -->
      <el-table-column prop="lesson_name" label="Lesson" width="240" />
      <el-table-column prop="chapter_name" label="Chapter" />
      <el-table-column prop="finish_rate" label="Progress"  >
        <template  #default="scope" >
        <Progress :width="600" :progress="scope.row.finish_rate" :strokeWidth="10" :showInfo="false" /></template>
      </el-table-column>
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
                lesson_name: "该课程暂时没有答题记录",
                total_question_num: 3,
                chapter_name: "该课程暂时没有答题记录",
                "already_done_question_num": 2,
                "finish_rate": 100,
                "chapter_id": 1,
                "not_done_question_num": 1
            },
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

      axios.get("/api/question/lesson", {
        params: {
          user_id: this.$store.state.user_info.user_id,
          lesson_id: this.$route.query.lesson_id,
        },
      })
      .then((res) => {
        console.log(res.data.data.data);
        this.tableData = res.data.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
  };
  </script>