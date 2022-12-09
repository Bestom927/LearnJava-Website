<template>
    <h1>The knowledge of {{this.chapter_name}} in Java</h1>
    <div v-for="(knowledge, index) in knowledge_list" :key="index">
     <KnowledgeCard :knowledge="knowledge"></KnowledgeCard>
     <br />
 </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import KnowledgeCard from "../components/KnowledgeCard.vue";
export default {
 components: {
     KnowledgeCard,
 },
 name: 'LessonChapterknowledge',
 data() {
     return {
         chapter_id:0,
         knowledge_list:[
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
     chapter_name: {
         type: String,
         default: "chapter",
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
                 path: "/lessondetail/"+this.knowledge.lesson_id+"/"+this.knowledge.id+"/knowledge",
                 //query: { lesson_id: this.lesson.id },
             });
         }
     },
 },
 created(){
     this.chapter_id = this.$route.params.chapter_id; 
     axios({
       url: "/api/knowledge/getList" ,
         params: {
            lesson_id: this.$route.params.lesson_id,
            chapter_id: this.$route.params.chapter_id,
            user_id: this.$store.state.user_info.user_id,
         },
       method: "get",
     })
       .then((res) => {
         this.knowledge_list = res.data.data.knowledge;
         console.log(this.knowledge_list);
       })
       .catch((err) => {
         console.log(err);
       });
   },
};
</script>

<style>
.lesson-chapter-knowledge {
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