<template>
    <div class="question-card">
        <div class="question-card__header">
            <div class="question-card__header__title">
                <span class="question-card__header__title__text">{{ question.title }}</span>
            </div>
            <div class="question-card__header__info">
                <span class="question-card__header__info__text">{{ question.info }}</span>
            </div>
        </div>
        <div class="question-card__body">
            <div class="question-card__body__content">
                <span class="question-card__body__content__text">{{ question.content }}</span>
            </div>
        </div>
        <div class="question-card__footer">
            <div class="question-card__footer__btn">
                <el-button type="primary" @click="handleClick">查看详情</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "questionCard",
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
                this.$router.push({
                    path: "/questiondetail",
                    query: { question_id: this.question.id },
                });
            }
        },
    },
};
</script>
<style scoped>
.question-card {
    width: 100%;
    height: 100%;
    background-color: #fff;
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
    font-size: 20px;
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
    font-size: 14px;
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

</style>