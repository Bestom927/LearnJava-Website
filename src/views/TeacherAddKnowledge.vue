<template>
    <div class="about">
        <h1>This is add knowledge page</h1>
    </div>
    <h3>选择课程</h3>
    <el-select v-model="this_lesson_id" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in lesson_list"
      :key="item.lessonId"
      :label="item.lessonTitle"
      :value="item.lessonId"
    />
    </el-select>

    <h3>选择章节</h3>
    <el-select v-model="this_chapter_id" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in chapter"
      :key="item.chapterId"
      :label="item.chapterTitle"
      :value="item.chapterId"
    />
    </el-select>

   <br/>
    <div style="margin: 20px 0" v-if="this.addQuestionVisible">
    <h2>添加知识</h2>
    
  <el-input
    v-model="this.knowledge_content"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input knowledge content"
  />
  <div style="margin: 20px 0">
  <el-button type="primary" @click="addChapter">添加</el-button>
  <el-button type="primary" @click="(addQuestionVisible=!addQuestionVisible)">取消</el-button>
    </div>
  </div>

    <el-button v-else style="margin: 20px 0" type="primary" @click="(addQuestionVisible=!addQuestionVisible)">添加知识</el-button>

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
        addQuestionVisible:false,
        chapter_title:"",
        knowledge_content:"",
        this_lesson_id:"",
        this_chapter_id:"",
        lesson_list: [],
        chapter: [],
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
    updated(){
        axios
        .get("/api/chapter/fromLesson", {
            params: {
                lesson_id: this.this_lesson_id,
            },
        })
        .then((res) => {
            console.log(res.data.data.chapter);
            this.chapter = res.data.data.chapter;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods:{
        addChapter(){
            console.log(this.knowledge_content);
        axios
        .post("/api/knowledge/post", {
            lesson_id: this.this_lesson_id,
            chapter_id: this.this_chapter_id,
            knowledge_content: this.knowledge_content,
        })
        .then((res) => {
            console.log(res);
            this.$router.push({
                path: "/teacher/add_knowledge",
            });
        })
        .catch((err) => {
            console.log(err);
        });
    },
         
    }
};
</script>