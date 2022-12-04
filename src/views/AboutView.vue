<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
export default {
  name: 'AboutView',
  components: {
  },
  create(){
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
    }
  }
}
</script>