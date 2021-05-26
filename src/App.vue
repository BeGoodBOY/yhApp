<template>
  <div id="app">
    <transition key="t0" :name="transitionName">
      <keep-alive :include="aliveArr">
        <router-view />
      </keep-alive>
    </transition>
    <!-- <transition key="t1" :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition> -->
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: 'none',
      transitionNameAlive: 'slide-left',
      aliveArr: ['Home']
    };
  },
  watch: {
    $route(to, from) {
      // animation
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (toDepth < fromDepth) {
        this.transitionName = "slide-right";
        this.transitionNameAlive = "slide-right";
      }
      if (toDepth === fromDepth) {
        this.transitionName = "none";
      }
      if (toDepth > fromDepth) {
        this.transitionName  = "slide-left";
        this.transitionNameAlive = "slide-left";
      }
      // keep alive
      const toName =  to.name;
      const fromName = from.name;
      if(toName === 'searchTaskList' || fromName==="searchTaskList") {
        if (toDepth >= fromDepth) {
          if(!this.aliveArr.includes('searchTaskList')) {
            this.aliveArr.push('searchTaskList');
          }
        }else {
          this.aliveArr.splice(this.aliveArr.indexOf('searchTaskList'), 1);
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/style/reset";
@import "@/style/common.scss";
@import "@/style/mixin.scss";
@import "@/style/var.scss";
#app {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f5f5;
  & > div {
    width: 100%;
    box-sizing: border-box;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
