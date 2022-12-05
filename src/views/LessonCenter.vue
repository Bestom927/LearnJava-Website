<template>
  <div class="lesson_center">
    <div class="downBox">
      <div v-for="(lesson, index) in lesson_list" :key="index">
        <LessonCard :lesson="lesson"></LessonCard>
        <br />
      </div>
    </div>
  </div>
  <div class="pagination_field">
    <el-row justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="PAGESIZE"
        :total="all_num"
        @current-change="curChange"
      />
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import LessonCard from "../components/LessonCard.vue";

export default {
  components: {
    LessonCard,
  },
  data() {
    return {
      cur_page: 1,
      page_num: 90,
      PAGESIZE: 5,
      all_num: 0,
      lesson_list: [
        {
          id: 1,
          title:"test",
          info:"just test", 
          content:"just aaaaaa aaaaa aaaaa aaaaaa aaaaa aaaaaaa aaaaaaa aaaaa aaaaaaa aaaaaa  aa aaaaaaa aaa aaaa aaaaa aaaaa aaaaaaa aaaaaaaa aaaaaaa aaaaa a aa aaaaa aaaaaa aaaa aaaaaa aaa aaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaa aaaaaaa aaaa aaaaaa aaaaaaa aaaaaa aaaaaaa aaaaa  aa aaa a aa aaaa aaaaa aa aaaaaaaa a aa aaa aaaaaa aaaaaaaaa",
        } 
      ], //课程列表
      isLoading: false,
      isCreated: true,

    };
  },
  methods: {
    curChange(res) {
      this.cur_page = res;
      this.filter();
    },
  },
  created() {
    this.isCreated = true;
    this.isLoading = true;
    axios({
      url: "university/num" + "?rank_year=" + this.year_value,
      method: "get",
    })
      .then((res) => {
        this.all_num = res.data.data.num;
        this.page_num = Math.ceil(res.data.data.num / this.PAGESIZE); //向上取整
        this.lesson_list = res.data.data.lesson_list;
        //进行当页数据检索
        axios({
          url:
            "university/rank" +
            "?rank_year=" +
            this.year_value +
            "&" +
            "page_size=" +
            this.PAGESIZE,
          method: "get",
        })
          .then((res) => {
            this.lesson_list = res.data.data.university_list;
            this.isLoading = false;
          })
          .catch((errMsg) => {
            console.log(errMsg);
            console.log("第二层初始化大失败");
          });
      })
      .catch((errMsg) => {
        console.log(errMsg);
        console.log("第一层初始化大失败");
      });
    /*在此处向服务器请求数据，初始化所需变量*/
  }
};
</script>

<style scoped >
.lesson_center {
  
  width: 100%;
  height: 100%;
  
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
  border-radius: 17px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 1vw;
}
.lesson_center .downBox {
  
  width: 100%;
  height: 100%;
  
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
  border-radius: 17px;
}
.pagination_field {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
