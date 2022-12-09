<template>
    <div class="question-card">
        <div class="question-card__header">
            <div class="question-card__header__title">
                <span class="question-card__header__title__text">{{ question.detail.questionContent }}</span>
            </div>
            <div class="question-card__header__info">
                <span class="question-card__header__info__text">分值：{{ question.detail.score }}</span>
            </div>
        </div>
        
        <div class="question-card__footer" v-if="!question.haveBeenAnswered">
            
            <div class="question-card__footer__btn"  >
                <textarea  v-if="this.isAnswer" v-model="answer" cols="240" rows="4"></textarea>
            <br/>
            <div v-if="!this.isAnswer">
                <el-button type="primary" @click="handleClick" >  <el-icon :size="20">
    <Edit />
  </el-icon>开始作答</el-button>
            </div>
                <div v-if="this.isAnswer">
                <el-button type="primary" @click="submitAnswer">提交</el-button>
                <el-button type="primary" @click="cancelAnswer">取消</el-button>
            </div>
            </div>
        </div>
        <div class="question-card__footer" v-if="question.haveBeenAnswered">
            <div class="question-card__footer__btn" >
                <div v-if="!this.checkRecord">已作答</div>
                <el-button type="primary" @click="handleCheckRecord" v-if="!this.checkRecord">查看作答记录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "questionCard",
    data(){
        return{
            isAnswer:false,
            answer:"",
            checkRecord:false,
        }

    },
    props: {
        question: {
            type: Object,
            required: true,
            id:1,
            title:"test",
            info:"just test",
            content:"just test",
        },
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
                // this.$router.push({
                //     path: "/questiondetail",
                //     query: { question_id: this.question.id },
                // });
                //console.log(this.question.title);
                this.isAnswer=true;
            }
        },
        submitAnswer(){
            axios
                .post("/api/question/answer", {
                    question_type: "short_answer_question",
                    question_id: this.question.detail.shortAnswerQuestionId,
                    user_id: this.$store.state.user_info.user_id,
                    user_answer: this.answer,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            ElMessage({
                    message: "已提交题目"+this.question.detail.shortAnswerQuestionId,
                    type: "success",
                    showClose: true,
                    duration: 2000,
                });
            console.log("submit "+this.answer);
            this.isAnswer=false;
            this.question.haveBeenAnswered=true;
            this.question.thisUserAnswer=this.answer;
        },
        cancelAnswer(){
            console.log("cancel");
            this.isAnswer=false;
        },
        handleCheckRecord(){
            //转到查看作答记录页面
            this.checkRecord=true;
            this.$router.push({
                path: "/allAnwserRecord",
            });
        }
    },
};
</script>
<style scoped>
.question-card {
    width: 97%;
    height: 100%;
    background:white;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    /* 设置card的背景色 */
    background: linear-gradient(#ffffffd0, #ffffffd5);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}
.question-card__header {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.question-card__header__title {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question-card__header__title__text {
    font-size: 30px;
    font-weight: 600;
}
.question-card__header__info {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question-card__header__info__text {
    font-size: 20px;
    color: #999;
}
.question-card__body {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question-card__body__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question-card__footer {
    margin-top: 2%;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question-card__footer__btn {
    
    font-size: 20px;
    color: rgb(224, 25, 25);
}
.el-button--primary{
    margin-left: 0;
    margin-top: 5px;
    color: #1686f5;
    width: 98vw;
    background-color: rgb(240, 248, 255);
    border-color: rgb(148, 197, 238);
    font-size: 14px;
  &:hover {
    color: rgb(240, 248, 255);
    background-color: rgb(148, 197, 238);
    border-color: rgb(148, 197, 238);
  }
  &:active {
    color: rgb(240, 248, 255);
    background-color: rgb(148, 197, 238);
    border-color: rgb(148, 197, 238);
  }
}
</style>