<template>
    <h1>©нЁлуб╫з</h1>
    <!-- <div>lesson detail</div>
    <div>{{msg}}</div>
    <div>the lesson id is {{$route.params.lesson_id}}</div>
    <div>the lesson id is {{this.lesson_id}}</div> -->
    <div v-for="(chapter, index) in chapter_list" :key="index">
        <ChapterCard :chapter="chapter"></ChapterCard>
        <br />
    </div>

</template>

<script>
import ChapterCard from '@/components/ChapterCard.vue';
import axios from 'axios';
export default {
    name: 'LessonDetail',
    components: {
        ChapterCard,
    },
    data() {
        return {
            lesson_id:0,
            chapter_list:[
            {
              lesson_id:1,
          id: 1,
          title:"test",
          info:"just test", 
          content:"just aaaaaa aaaaa aaaaa aaaaaa aaaaa aaaaaaa aaaaaaa aaaaa aaaaaaa aaaaaa  aa aaaaaaa aaa aaaa aaaaa aaaaa aaaaaaa aaaaaaaa aaaaaaa aaaaa a aa aaaaa aaaaaa aaaa aaaaaa aaa aaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaa aaaaaaa aaaa aaaaaa aaaaaaa aaaaaa aaaaaaa aaaaa  aa aaa a aa aaaa aaaaa aa aaaaaaaa a aa aaa aaaaaa aaaaaaaaa",
        } 
            ],
            msg: 'Welcome to Your Vue.js App'
        }
    },
  created(){
    this.lesson_id = this.$route.params.lesson_id; 
    axios({
        url: "/api/chapter/fromLesson" ,
        params: {
            lesson_id: this.lesson_id,
        },
        method: "get",
    })
      .then((res) => {
        this.chapter_list = res.data.data.chapter;
        console.log(this.chapter_list);
      })
      .catch((err) => {
        console.log(err);
      });
  },
}
</script>