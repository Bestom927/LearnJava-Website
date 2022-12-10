<template>
    <div class="about">
        <h1>This is add lesson page</h1>
    </div>
    <el-table :data="lesson_list" style="width: 98%;margin-left: 1%;">
        
        <el-table-column prop="lessonId" label="lesson id" width="120"/>
        <el-table-column prop="lessonTitle" label="lesson" width="120" />
        <el-table-column prop="lessonContent" label="lesson content"  />
    </el-table>

   
    <div style="margin: 20px 0" v-if="this.addLessonVisible">
    <h2>添加课程</h2>
    <el-input
    v-model="this.lesson_title"
    autosize
    type="textarea"
    placeholder="Please input lesson title"
  />
  <div style="margin: 20px 0" />
  <el-input
    v-model="this.lesson_content"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input lesson content"
  />
  <div style="margin: 20px 0">
  <el-button type="primary" @click="addLesson">添加</el-button>
  <el-button type="primary" @click="(addLessonVisible=!addLessonVisible)">取消</el-button>
    </div>
  </div>

    <el-button v-else type="primary" @click="(addLessonVisible=!addLessonVisible)">添加课程</el-button>

</template>

<script>

import { ElMessage } from 'element-plus'

import axios from "axios";
import Progress from "@/components/Progress.vue";

export default {
  name: "AnswerRecord",
  components: {Progress},
  data() {
    return {
        addLessonVisible:false,
        lesson_title:"",
        lesson_content:"",
        commentContent:"a",
      lesson_list: [
        {
          lessonId:0,
          lessonTitle:"java",
          lessonChapter:"java基础",
          question:"java中的基本数据类型有哪些？",
          answer:"",
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
        .get("/api/lesson/getAll", {
            
        })
        .then((res) => {
            console.log(res.data.data.lessons);
            this.lesson_list = res.data.data.lessons;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods:{
        addLesson(){
            console.log(this.lesson_title);
            console.log(this.lesson_content);
        axios
        .post("/api/lesson/post", {
            lesson_title: this.lesson_title,
            lesson_content: this.lesson_content,
        })
        .then((res) => {
            console.log(res);
            this.$router.push({
                path: "/teacher/add_lesson",
            });
        })
        .catch((err) => {
            console.log(err);
        });
    },
         
    }
};
</script>