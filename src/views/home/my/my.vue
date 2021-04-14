<template>
  <div class="home-box">
    <yh-header :lFlag="false"></yh-header>
    <div class="my-box">
      <div class="my-line">
        <span class="my-line-l">姓名</span>
        <span class="my-line-r">{{ name }}</span>
      </div>
      <div class="my-line">
        <span class="my-line-l">手机号</span>
        <span class="my-line-r">{{ mobile }}</span>
      </div>
    </div>
    <button class="btn-out" @click="loginOut">退出登陆</button>
  </div>
</template>
<script>
import yhHeader from '@/components/header';
import { getStore, removeAllStore } from '@/config/utils';
export default {
  name: "grabOrderList",
  components: {
    yhHeader
  },
  data() {
    return {
      name: '',
      mobile: ''
    }
  },
  created() {
    this.name = getStore('strName');
    this.mobile = getStore('strMobile');
  },
  methods: {
    loginOut() {
      removeAllStore();
      this.$router.replace('login');
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "@/style/mixin.scss";
  .my-box {
    margin-top: 0.2rem;
    font-size: 0.28rem;
  }
  .my-line {
    @include flex();
    padding: 0 0.3rem;
    background: #fff;
    line-height: 0.88rem;
    border-bottom: 1px solid #eee;
  }
  .btn-out {
    margin-top: 0.2rem;
    display: block;
    width: 100%;
    font-size: 0.3rem;
    color: #f14f4f;
    line-height: 0.88rem;
    background: #fff;
  }
</style>
