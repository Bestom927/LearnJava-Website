<template>
    <div class="lesson-chapter-question">
       <div v-for="(shortAnswerQuestion, index) in shortAnswerQuestionList" :key="index">
        <QuestionCard :question="shortAnswerQuestion"></QuestionCard>
        <br />
    </div>
    <div v-for="(choiceAnswer, index) in choiceQuestionList" :key="index">
        <ChoiceQuestionCard :choiceQuestion="choiceAnswer"></ChoiceQuestionCard>
        <br />
    </div></div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import QuestionCard from "../components/QuestionCard.vue";
import ChoiceQuestionCard from "../components/ChoiceQuestionCard.vue";
export default {
    components: {
        QuestionCard,
        ChoiceQuestionCard
    },
    name: 'LessonChapterQuestion',
    data() {
        return {
            chapter_id:0,
            shortAnswerQuestionList:[
            {
              chapter_id:1,
          id: 1,
          title:"test",
          info:"just test", 
          content:"just aaaaaa aaaaa aaaaa aaaaaa aaaaa aaaaaaa aaaaaaa aaaaa aaaaaaa aaaaaa  aa aaaaaaa aaa aaaa aaaaa aaaaa aaaaaaa aaaaaaaa aaaaaaa aaaaa a aa aaaaa aaaaaa aaaa aaaaaa aaa aaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaa aaaaaaa aaaa aaaaaa aaaaaaa aaaaaa aaaaaaa aaaaa  aa aaa a aa aaaa aaaaa aa aaaaaaaa a aa aaa aaaaaa aaaaaaaaa",
        } 
            ],
            choiceQuestionList:[
            {
              chapter_id:1,
          }],
            msg: 'Welcome to Your Vue.js App'
        }
    },
    props: {
        question: {
            type: Object,
            required: true,
            lesson_id:1,
            id:1,
            title:"test",
            info:"just test",
            content:"just test",
        }
    },
    methods: {
        handleClick() {
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
            } else {
                this.$router.push({
                    path: "/lessondetail/"+this.question.lesson_id+"/"+this.question.id+"/knowledge",
                    //query: { lesson_id: this.lesson.id },
                });
            }
        },
    },
    created(){
        axios({
          url: "/api/question/test",
          params:{
            user_id:this.$store.state.user_info.user_id,
          },
          
          method: "get",
        })
          .then((res) => {
            this.shortAnswerQuestionList = res.data.data.shortAnswerQuestionList;
            this.choiceQuestionList = res.data.data.choiceQuestionList;
          })
          .catch((err) => {
            console.log(err);
          });
      },
};
</script>

<style>
.lesson-chapter-question {
}
</style>