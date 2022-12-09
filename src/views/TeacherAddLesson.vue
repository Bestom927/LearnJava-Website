<template>
    <div class="about">
        <h1>This is add lesson page</h1>
    </div>
    <el-table :data="lesson_list" style="width: 98%;margin-left: 1%;">
        
        <el-table-column prop="lessonId" label="lesson id" width="120"/>
        <el-table-column prop="lessonTitle" label="lesson" width="120" />
        <el-table-column prop="lessonContent" label="lesson content"  />
    </el-table>
    <el-button text @click="open">Click to open Message Box</el-button>
</template>

<script>

import { ElMessage, ElMessageBox } from 'element-plus'

import axios from "axios";
import Progress from "@/components/Progress.vue";
import {h} from "vue";

export default {
  name: "AnswerRecord",
  components: {Progress},
  data() {
    return {
        lesson_title:"",
        lesson_content:"",
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
        axios
        .post("/api/lesson/post", {
            params:{
                lesson_title: this.lesson_title,
                lesson_content: this.lesson_content,
            }
        })
        .then((res) => {
            console.log(res);
           
        })
        .catch((err) => {
            console.log(err);
        });
    },
open() {
  ElMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    message: h(
          "div",
          {
            attrs: {
              class: "el-textarea"
            }
          },
          [
            h("textarea", {
              attrs: {
                placeholder: "请输入回复内容",
                class: "el-textarea__inner",
                autocomplete: "off",
                rows: 15,
                id: "commentContent"
              },
              value: this.commentContent,
              on: { input: this.onCommentInputChange }
            })
          ]
        ),
    inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
    }
};
</script>