<template>
  <div class="home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="nav">
      <router-link class="nav-item" to="/graborderlist">
        <i class="iconfont">&#xe606;</i>
        <span class="nav-text">抢单</span>
      </router-link> 
      <router-link class="nav-item" to="/tasklist">
        <i class="iconfont">&#xe61c;</i>
        <span class="nav-text">任务单</span> 
      </router-link>
      <router-link class="nav-item" to="/my">
        <i class="iconfont">&#xe690;</i>
        <span class="nav-text">催客</span> 
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import CDO from "@/config/cdo";
// import axios from "axios";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
};
</script>
<style lang="scss" scoped>
  @import "@/style/var.scss";
  @import "@/style/mixin.scss";
  .home {
    @include flex();
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .nav {
    z-index: 2;
    @include flex(center, center);
    width: 100%;
    background: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 8px 0px rgba(111, 111, 0, 0.1);
    .nav-item {
      @include flex(center, center);
      flex-direction: column;
      width: 33.3%;
      height: 1.3rem;
      font-size: 0.24rem;
      color: #999;
      .iconfont {
        margin-bottom: 0.12rem;
        font-size: 0.4rem;
      }
      &.router-link-active {
        color: $color;
      }
    }
  }
</style>
