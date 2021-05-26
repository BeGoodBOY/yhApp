<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { setStore, getStore, isAndroid, isIOS } from "@/config/utils";
import { inApp } from "@/native";
export default {
  name: "App",
  data() {
    return {
      transitionName: 'none'
    }
  },
  beforeCreate() {
    if (inApp) {
      if(getStore('userId')) {
        return;
      }
      let res;
      if (isAndroid) {
        res = JSON.parse(TheYHClient.getLoginInfo()).cdoResponse;
      }
      if (isIOS) {
        res = JSON.parse(window.prompt("getLoginInfo", ""));
      }

      setStore("userId", res.lUserId);
      setStore("strMobileRandom", res.strMobileRandom);
      const cdo = res.cdologiner;
      setStore("lId", cdo.lId); //催收员员工id
      setStore("lUserId", cdo.lUserId); //催收员用户id
      setStore("strName", cdo.strName); //催收员姓名
      setStore("strMobile", cdo.strMobile); //催收员手机号
      setStore("lCollectionId", cdo.lCollectionId); //催收员归属机构id
      setStore("strCollectionName", cdo.strCollectionName); //催收员归属机构名称
      setStore("lCollLeaderId", cdo.lCollLeaderId); //催收员归属机构领导的员工id
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      console.log(this.transitionName)
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f5f5;
  &>div{
    width: 100%;
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
  transition: all 100ms;
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
