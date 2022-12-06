<template>
  <div>this is anwser</div>
  
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="240" />
    <el-table-column prop="name" label="Name" width="240" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="progress" label="Progress">
      <template  #default="scope">
      <Progress :width="600" :progress="scope.row.progress" :strokeWidth="10" :showInfo="true" /></template>
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
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          progress:36
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          progress:36
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          progress:90
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          progress:33
        },
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
      .get("/api/lesson_answer_record", {
        params: {
          user_id: this.$store.state.user_id,
          lesson_id: this.$route.query.lesson_id,
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