<template>
    <div>detail</div>
    <div>{{msg}}</div>
    <div>{{$route.params.lesson_id}}</div>
    <div>{{this.lesson_id}}</div>
</template>

<script>
export default {
    name: 'LessonDetail',
    data() {
        return {
            lesson_id:0,
            msg: 'Welcome to Your Vue.js App'
        }
    },
  created(){
    this.lesson_id = this.$route.params.lesson_id; 
  },
}
</script>