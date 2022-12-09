<template>
    <div class="knowledge-card">
        <div class="knowledge-card__header">
            <div class="knowledge-card__header__title">
                <span class="knowledge-card__header__title__text">{{ knowledge.knowledgeTitle }}</span>
            </div>
            <div class="knowledge-card__header__info">
                <span class="knowledge-card__header__info__text">{{ knowledge.info }}</span>
            </div>
        </div>
        <div class="knowledge-card__body">
            <div class="knowledge-card__body__content">
                <span class="knowledge-card__body__content__text">{{ knowledge.knowledge_content }}</span>
            </div>
        </div>
        <div class="knowledge-card__footer">
            <div class="knowledge-card__footer__btn">
                <el-button type="primary" @click="handleClick" v-if="this.knowledge.already_learned==0">完成学习</el-button>
                <el-button type="primary" v-if="!this.knowledge.already_learned==0">已学习</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "KnowledgeCard",
    props: {
        knowledge: {
            type: Object,
            required: true,
            id:1,
            knowledgeTitle:"test",
            info:"just test",
            knowledge_content:"just test",
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
                //     path: "/knowledgedetail",
                //     query: { knowledge_id: this.knowledge.id },
                // });
                console.log("finish " +this.$route.params.lesson_id);
                console.log("finish " +this.$route.params.chapter_id);
                console.log("finish " +this.knowledge.knowledge_id);
                console.log("finish " +this.$store.state.user_info.user_id);
                axios
                .post("/api/knowledge/learn", {
                    lesson_id: this.$route.params.lesson_id,
                    chapter_id: this.$route.params.chapter_id,
                    knowledge_id: this.knowledge.knowledge_id,
                    user_id: this.$store.state.user_info.user_id,
                    
                })
                .then((res) => {
                    console.log(res);
                    this.knowledge.already_learned=1;
                    ElMessage({
                        message: "已学习知识点"+this.knowledge.knowledge_id,
                        type: "success",
                        showClose: true,
                        duration: 2000,
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
.knowledge-card {
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
.knowledge-card__header {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.knowledge-card__header__title {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.knowledge-card__header__title__text {
    font-size: 20px;
    font-weight: 600;
}
.knowledge-card__header__info {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.knowledge-card__header__info__text {
    font-size: 14px;
}
.knowledge-card__body {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.knowledge-card__body__content {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.knowledge-card__body__content__text {
    font-size: 20px;
    color: #999;
    text-align: left;
}

.knowledge-card__footer {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: flex-end;
}

.knowledge-card__footer__btn {
    margin-right: 20px;
}

</style>