<template>
    <div class="about">
        <h1>This is add question page</h1>
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
    <h2>添加题目</h2>
    <el-select v-model="question_type" class="m-2" placeholder="Select" size="large">
        <el-option 
        v-for="item in question_types"
            :key="item.question_type"
            :label="item.question_type_name"
            :value="item.question_type"
        />
    </el-select>
    <el-input style="margin: 20px 0"
    v-model="this.question_content"
    autosize
    type="textarea"
    placeholder="Please input question content"
  />
  <div style="margin: 20px 0" />
  <el-input
    v-model="this.reference_answer"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input question reference answer"
  />
    <div style="margin: 20px 0" />
    <span>题目分数</span>
  <el-input-number v-model="score" :min="1" :max="100"  />
    <div style="margin: 20px 0" v-if="question_type=='choice_question'">


    <el-input
        v-model="this.choice_A"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input choice A"
    />
    <el-input
        v-model="this.choice_B"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input choice B"
    />
    <el-input
        v-model="this.choice_C"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input choice C"
    />
    <el-input
        v-model="this.choice_D"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input choice D"
    />
</div>

  <div style="margin: 20px 0">
  <el-button type="primary" @click="addChapter">添加</el-button>
  <el-button type="primary" @click="(addQuestionVisible=!addQuestionVisible)">取消</el-button>
    </div>
  </div>

    <el-button v-else style="margin: 20px 0" type="primary" @click="(addQuestionVisible=!addQuestionVisible)">添加题目</el-button>

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
        this_lesson_id:"",
        this_chapter_id:"",
        score:"0",
        question_content:"",
        reference_answer:"",
        choice_A:"",
        choice_B:"",
        choice_C:"",
        choice_D:"",
        lesson_list: [],
        chapter: [],
        question_type:"short_answer_question",
        question_types:[
            {question_type:"short_answer_question",
            question_type_name:"简答题"},
            {question_type:"choice_question",
            question_type_name:"选择题"},
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
            console.log(this.chapter_title);
            console.log(this.chapter_content);
        axios
        .post("/api/question/post", {
            question_type: this.question_type,
            lesson_id: this.this_lesson_id,
            chapter_id: this.this_chapter_id,
            question_content: this.question_content,
            reference_answer: this.reference_answer,
            score: this.score,
            choice_A: this.choice_A,
            choice_B: this.choice_B,
            choice_C: this.choice_C,
            choice_D: this.choice_D,
        })
        .then((res) => {
            console.log(res);
            this.$router.push({
                path: "/teacher/add_question",
            });
        })
        .catch((err) => {
            console.log(err);
        });
    },
         
    }
};
</script>