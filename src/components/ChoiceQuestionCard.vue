<template>
    <div class="choiceQuestion-card">
        <div class="choiceQuestion-card__header">
            <div class="choiceQuestion-card__header__title">
                <span class="choiceQuestion-card__header__title__text">{{ choiceQuestion.detail.questionContent }}</span>
            </div>
            <div class="choiceQuestion-card__header__info">
                <span class="choiceQuestion-card__header__info__text">分值：{{ choiceQuestion.detail.score }}</span>
            </div>
        </div>
        
        <div class="choiceQuestion-card__footer" >
            <input type="radio" v-model="picked" value="A" id="A"/>
            <label for="A">A.{{ choiceQuestion.detail.choiceA}}</label>
            <br />
            <input type="radio" v-model="picked" value="B" id="B"/>
            <label for="B">B.{{ choiceQuestion.detail.choiceB}}</label>
            <br/>
            <input type="radio" v-model="picked" value="C" id="C"/>
            <label for="C">C.{{ choiceQuestion.detail.choiceC}}</label>
            <br/>
            <input type="radio" v-model="picked" value="D" id="D"/>
            <label for="D">D.{{ choiceQuestion.detail.choiceD}}</label>
            <br/>
        </div>
        <div class="choiceQuestion-card__footer" v-if="choiceQuestion.haveBeenAnswered">
            <div class="choiceQuestion-card__footer__btn" >
                <div v-if="!this.checkRecord">已作答</div>
                <!-- <div v-if="this.checkRecord">你的答案：{{choiceQuestion.thisUserAnswer}}</div>
                <div v-if="this.checkRecord">参考答案：{{choiceQuestion.detail.questionAnswer}}</div> -->
                <el-button type="primary" @click="handleCheckRecord" v-if="!this.checkRecord">查看作答记录</el-button>  
                <!-- <el-button type="primary" @click="handleCheckRecord" v-if="this.checkRecord">收起</el-button> -->
            </div>
        </div>
        <div class="choiceQuestion-card__footer" v-if="!choiceQuestion.haveBeenAnswered">
            
            <div class="choiceQuestion-card__footer__btn" v-if="!this.isAnswer" >
                <el-button type="primary" @click="handleClick">  <el-icon :size="20">
    <Edit />
  </el-icon>开始作答</el-button>
            </div>
            <div class="choiceQuestion-card__footer__btn" v-if="this.isAnswer" >
                <el-button type="primary" @click="submitAnswer">提交</el-button>
                
                <el-button type="primary" @click="cancelAnswer">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "choiceQuestionCard",
    data(){
        return{
            isAnswer:false,
            //answer:"",
            picked:"A",
            checkRecord:false,
        }

    },
    props: {
        choiceQuestion: {
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
                //     path: "/choiceQuestiondetail",
                //     query: { choiceQuestion_id: this.choiceQuestion.id },
                // });
                //console.log(this.choiceQuestion.title);
                this.isAnswer=true;
            }
        },
        submitAnswer(){
            axios
            .post("/api/question/answer", {
                    question_type: "choice_question",
                    question_id: this.choiceQuestion.detail.choiceQuestionId,
                    user_id: this.$store.state.user_info.user_id,
                    user_answer: this.picked,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            ElMessage({
                    message: "已提交题目"+this.choiceQuestion.detail.choiceQuestionId,
                    type: "success",
                    showClose: true,
                    duration: 2000,
                });
            console.log("submit "+this.picked);
            this.isAnswer=false;
            this.choiceQuestion.haveBeenAnswered=true;
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
.choiceQuestion-card {
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
.choiceQuestion-card__header {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.choiceQuestion-card__header__title {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choiceQuestion-card__header__title__text {
    font-size: 30px;
    font-weight: 600;
}
.choiceQuestion-card__header__info {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choiceQuestion-card__header__info__text {
    font-size: 20px;
    color: #999;
}
.choiceQuestion-card__body {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choiceQuestion-card__body__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choiceQuestion-card__footer {
    margin-top: 2%;
    justify-content: center;
    align-items: center;
}
.choiceQuestion-card__footer__btn {
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