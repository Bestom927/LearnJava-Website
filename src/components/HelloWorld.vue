<template>
  <h1>{{ msg }}</h1>
  <div class="hello">
    <h1>网站设计要点</h1>
    <h3>颜色(color)</h3>
    <ul>
      <li>比如使用了深色的背景，文字也是深色的那么对比度就很低，文字不容易看清。不但要考虑深浅颜色的对比，也要考虑不同颜色的混合后的对比度。同样可以通过调整对比度达到突出特定元素的效果。
</li>
    </ul>
    <h3>对比(compare)</h3>
    <ul>
      <li>好的设计不宜有过多的颜色，首先太多颜色看上去很乱，另一方面颜色是用来强调页面的特定元素的，如果颜色太多就会失去重点，对初学者来说，最简单的是使用黑色或白色作为背景，然后选择一个主要颜色，主颜色可以从设计的素材中寻找。有一定的关联度最好，如果觉得太单调，可以适当加一些渐变背景~
</li>
    </ul>
    <h3>留白(white space)</h3>
    <ul>
      <li>与其将内容填满整个页面，不如降低文字或者内容大小，给元素留出适当的空白和间隔。
</li>
    </ul>
    <h3>协调 (harmony)</h3>
    <ul>
      <li>主要是跟对齐有关的操作，比如同一列几个元素高度不一致，底部不对齐，可以将较短的拉长到跟最高的元素一样，允许元素内容留下空白，要比参差不齐来得好看。不但高度要保持一致，间隔度最好也要保持一致。

</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin-left: 1vw;
  text-align:left;
}
h3 {
  
  margin-left: 2vw;
}
ul {
  list-style-type: none;
  margin-left: 1vw;
}
li {
  display: inline-block;
  margin-left: 1vw;
}
a {
  color: #42b983;
}
</style>
