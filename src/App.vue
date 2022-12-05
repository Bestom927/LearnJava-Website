<template>
  <NavBar></NavBar>
  
  
  <router-view/>
</template>

<script>
import NavBar from '../src/components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  created(){
    if(sessionStorage.getItem("store")){
      this.$store.replaceState(
        Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store")))
      )
      sessionStorage.removeItem("store");
    }
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },

  mounted(){
    this.$router.replace('/home')
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
