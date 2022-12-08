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
            <textarea  v-if="this.isAnswer" v-model="answer"></textarea>
            <div class="question-card__footer__btn" v-if="!this.isAnswer" >
                <el-button type="primary" @click="handleClick">开始作答</el-button>
            </div>
            <div class="question-card__footer__btn" v-if="this.isAnswer" >
                <el-button type="primary" @click="submitAnswer">提交</el-button>
                
                <el-button type="primary" @click="cancelAnswer">取消</el-button>
            </div>
        </div>
        <div class="question-card__footer" v-if="question.haveBeenAnswered">
            <div class="question-card__footer__btn" >
                <div v-if="!this.checkRecord">已作答</div>
                <div v-if="this.checkRecord">你的答案：{{question.thisUserAnswer}}</div>
                <div v-if="this.checkRecord">参考答案：{{question.detail.referenceAnswer}}</div>
                <el-button type="primary" @click="handleCheckRecord" v-if="!this.checkRecord">查看作答记录</el-button>
                <el-button type="primary" @click="handleCheckRecord" v-if="this.checkRecord">收起</el-button>
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
            this.checkRecord=!this.checkRecord;
        }
    },
};
</script>
<style scoped>
.question-card {
    width: 100%;
    height: 100%;
    background-color:linear-gradient(#ffffffd0, #bdecfdd5);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
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

</style>