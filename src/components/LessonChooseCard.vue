<template>
    <div class="lesson-card">
        <div class="lesson-card__header">
        <div class="lesson-card__header__title">
            <span class="lesson-card__header__title__text">{{ lesson.lessonTitle }}</span>
        </div>
        <div class="lesson-card__header__info">
            <span class="lesson-card__header__info__text">{{ lesson.lessonInfo }}</span>
        </div>
        </div>
        <div class="lesson-card__body">
        <div class="lesson-card__body__content">
            <span class="lesson-card__body__content__text">{{ lesson.lessonContent }}</span>
        </div>
        </div>
        <div class="lesson-card__footer">
        <div class="lesson-card__footer__btn">
            <el-button type="primary" @click="handleClick">开始学习</el-button>
        </div>
        </div>
    </div>

</template>
<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "LessonCard",
    props: {
        lesson: {
            type: Object,
            required: true,
            id:1,
            lessonTitle:"test",
            lessonInfo:"just test",
            lessonContent:"just test",
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
                console.log(this.lesson.lessonId);
                axios
                .post("/api/lesson/choose", {
                    lesson_id: this.lesson.lessonId,
                    student_id: this.$store.state.user_info.user_id,
                })
                .then((res) => {
                    console.log(res);
                    this.$router.push({
                        path: "/lesson",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
                
            }
        },
    },

};
</script>
<style scoped>
.lesson-card{
    position: relative;
    width: 98%;
    height:25vh;
    /* 设置阴影 */
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
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
.lesson-card__header__title{
    background: #efefefd0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    font-weight: bold;
}
.lesson-card__header__info{
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.lesson-card__header__title__text{
    font: 0.8em sans-serif;
    color: rgb(114, 131, 240);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.lesson-card__body{
    position: absolute;
    top: 35%;
    left: 0;
    width: 100%;
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.lesson-card__body__content{
    position: absolute;
    top: 20%;
    left: 0;
    width: 90%;
    height: 25%;
    display: flex;
    margin-left: 5%;
    margin-right: 5%;
    text-align: left;
    font: 1.3em sans-serif;
    justify-content: center;
    align-items: center;
}
.lesson-card__footer__btn{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>