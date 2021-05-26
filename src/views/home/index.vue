<template>
  <div class="home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="nav">
      <router-link class="nav-item" to="/graborderlist" replace>
        <i class="iconfont">&#xe606;</i>
        <span class="nav-text">抢单</span>
      </router-link>
      <router-link class="nav-item" to="/tasklist" replace>
        <i class="iconfont">&#xe61c;</i>
        <span class="nav-text">任务单</span>
      </router-link>
      <router-link class="nav-item" to="/my" replace>
        <i class="iconfont">&#xe690;</i>
        <span class="nav-text">催客</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { setStore, getStore, isAndroid, isIOS } from "@/config/utils";
import { inApp } from "@/native"
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  beforeCreate() {
    if (inApp) {
      if (getStore("userId")) {
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
};
</script>
<style lang="scss" scoped>
@import "@/style/var.scss";
@import "@/style/mixin.scss";
.home {
  position: relative;
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
