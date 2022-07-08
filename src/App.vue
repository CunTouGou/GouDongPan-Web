<template>
  <div id="app">
    <router-view>
      <Home></Home>
    </router-view>
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
	name: 'App',
	components: {
    Home
	},
  mounted() {
    const that = this
    window.addEventListener('resize', function () {
      return (() => {
        that.$store.commit('changeScreenWidth', document.body.clientWidth)
      })()
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';

#app {
  height: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: none;
  overflow-y: auto;
  >>> .el-backtop {
    background-color: $Success;
    color: #fff;
    z-index: 3;
  }
  .main-content {
    flex: 1;
    width: 90%;
    height: 100vh;
    //min-height: calc(100vh - 70px);
    margin: 0 auto;
    display: flex;
  }
}
</style>
