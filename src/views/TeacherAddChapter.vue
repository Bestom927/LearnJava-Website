<template>
    <div class="about">
        <h1>This is add chapter page</h1>
    </div>
    <el-select v-model="lesson_id" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in lesson_list"
      :key="item.lessonId"
      :label="item.lessonTitle"
      :value="item.lessonId"
    />
    </el-select>

   <br/>
    <div style="margin: 20px 0" v-if="this.addChapterVisible">
    <h2>添加章节</h2>
    <el-input
    v-model="this.chapter_title"
    autosize
    type="textarea"
    placeholder="Please input chapter title"
  />
  <div style="margin: 20px 0" />
  <el-input
    v-model="this.chapter_content"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input chapter content"
  />
  <div style="margin: 20px 0">
  <el-button type="primary" @click="addChapter">添加</el-button>
  <el-button type="primary" @click="(addChapterVisible=!addChapterVisible)">取消</el-button>
    </div>
  </div>

    <el-button v-else style="margin: 20px 0" type="primary" @click="(addChapterVisible=!addChapterVisible)">添加章节</el-button>

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
        addChapterVisible:false,
        chapter_title:"",
        chapter_content:"",
        lesson_id:"",
        lesson_list: [
        
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
        addChapter(){
            console.log(this.chapter_title);
            console.log(this.chapter_content);
        axios
        .post("/api/chapter/post", {
            lesson_id: this.lesson_id,
            chapter_title: this.chapter_title,
            chapter_content: this.chapter_content,
        })
        .then((res) => {
            console.log(res);
            this.$router.push({
                path: "/teacher/add_chapter",
            });
        })
        .catch((err) => {
            console.log(err);
        });
    },
         
    }
};
</script>