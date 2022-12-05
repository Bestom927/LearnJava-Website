<template>
       <div v-for="(question, index) in question_list" :key="index">
        <QuestionCard :question="question"></QuestionCard>
        <br />
    </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import QuestionCard from "../components/QuestionCard.vue";
export default {
    components: {
        QuestionCard,
    },
    name: 'LessonChapterQuestion',
    data() {
        return {
            chapter_id:0,
            question_list:[
            {
              chapter_id:1,
          id: 1,
          title:"test",
          info:"just test", 
          content:"just aaaaaa aaaaa aaaaa aaaaaa aaaaa aaaaaaa aaaaaaa aaaaa aaaaaaa aaaaaa  aa aaaaaaa aaa aaaa aaaaa aaaaa aaaaaaa aaaaaaaa aaaaaaa aaaaa a aa aaaaa aaaaaa aaaa aaaaaa aaa aaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaa aaaaaaa aaaa aaaaaa aaaaaaa aaaaaa aaaaaaa aaaaa  aa aaa a aa aaaa aaaaa aa aaaaaaaa a aa aaa aaaaaa aaaaaaaaa",
        } 
            ],
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
        this.chapter_id = this.$route.params.chapter_id; 
        axios({
          url: "lesson/question_list" + "?chapter_id=" + this.chapter_id,
          method: "get",
        })
          .then((res) => {
            this.question_list = res.data.data.question_list;
          })
          .catch((err) => {
            console.log(err);
          });
      },
};
</script>

<style>
.lesson-chapter-question {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
}
</style>