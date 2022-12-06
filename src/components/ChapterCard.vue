<template>
    <div class="chapter-card">
        <div class="chapter-card__header">
        <div class="chapter-card__header__title">
            <span class="chapter-card__header__title__text">{{ chapter.chapterTitle }}</span>
        </div>
        <div class="chapter-card__header__info">
            <span class="chapter-card__header__info__text">{{ chapter.info }}</span>
        </div>
        </div>
        <div class="chapter-card__body">
        <div class="chapter-card__body__content">
            <span class="chapter-card__body__content__text">{{ chapter.chapterContent }}</span>
        </div>
        </div>
        <div class="chapter-card__footer">
        <div class="chapter-card__footer__btn">
            <el-button type="primary" @click="handleClick">开始学习</el-button>
        </div>
        <div class="chapter-card__footer__btn">
            <el-button type="primary" @click="handleQuestionClick">开始做题</el-button>
        </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: 'ChapterCard',
    props: {
        chapter: {
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
                    path: "/lessondetail/"+this.chapter.corrLessonId+"/"+this.chapter.chapterId+"/knowledge",
                    //query: { lesson_id: this.lesson.id },
                });
            }
        },
        handleQuestionClick() {
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
                    path: "/lessondetail/"+this.chapter.corrLessonId+"/"+this.chapter.chapterId+"/question",
                    //query: { lesson_id: this.lesson.id },
                });
            }
        },
    },
    created() {
    },
};

</script>

<style scoped>
.chapter-card {
    width: 98%;
    height: 100%;
    background: linear-gradient(#ffffffd0, #bdecfdd5);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    margin-left: 1%;
}

.chapter-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.chapter-card__header__title {
    font-size: 20px;
    font-weight: bold;
}

.chapter-card__header__info {
    font-size: 14px;
    color: #999;
}

.chapter-card__body {
    margin-bottom: 20px;
}

.chapter-card__body__content {
    font-size: 14px;
    color: #999;
    text-align: left;
}

.chapter-card__footer {
    display: flex;
    justify-content: flex-end;
}

.chapter-card__footer__btn {
    margin-left: 20px;
}
</style>