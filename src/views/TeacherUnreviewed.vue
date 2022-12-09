<template>
  <div class="about">
     <h1>This is a teacher page</h1>
 </div>
 
 <el-table :data="tableData" style="width: 100%">
     <el-table-column prop="lesson_title" label="lesson"  />
     <el-table-column prop="chapter_title" label="chapter"  />
     <el-table-column prop="question_content" label="question"  />
     <el-table-column prop="user_answer" label="answer"  />
     <el-table-column prop="reference_answer" label="reference answer"  />
     <el-table-column prop="answer_time" label="Date"  />
     <el-table-column label="score"  >
      <template  #default="scope">
        <input v-model="scope.row.score"/>
        <button>确认</button></template>
     </el-table-column>
 </el-table>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import Progress from "@/components/Progress.vue";
export default {
 name: "TeacherReview",
 components: {Progress},
 data() {
   return {
     lesson_id: this.$route.query.lesson_id,
     tableData: [
       {
         lesson:"java",
         chapter:"java基础",
         student:"张三",
         question:"java中的基本数据类型有哪些？",
         answer:"shit",
         date:"2021-05-02",
         score:100
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
   .get("/api/judge/getAllRecords", {
   })
   .then((res) => {
     console.log(res.data.data.UnJudgedList);
     this.tableData = res.data.data.UnJudgedList;
     //把时间改成本地时间
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].answer_time = new Date(this.tableData[i].answer_time).toLocaleString();
      }
   })
   .catch((err) => {
     console.log(err);
   });
 },
};
</script>