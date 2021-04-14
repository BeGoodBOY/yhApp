<template>
  <div class="yh-box">
    <header class="login-header">
      <span class="login-header-tit">登陆</span>
    </header>
    <div class="login-main">
      <form>
        <div class="login-input-box">
          <i class="iconfont">&#xe602;</i>
          <input class="login-input" type="number" placeholder="请输入手机号" v-model="mobile" />
        </div>
        <div class="login-input-box">
          <i class="iconfont">&#xe65e;</i>
          <input
            class="login-input"
            type="number"
            placeholder="请输入短信验证码"
            v-model="mobileCode"
          />
          <button :disabled="!canGetCode" class="btn-getCode" @click.prevent="getCode">{{ getCodeText }}</button>
        </div>
        <input
          class="btn-sub"
          type="submit"
          value="登陆"
          @click.prevent="sub"
        />
      </form>
    </div>
  </div>
</template>
<script>
import { getMobileCode, login } from '@/api/login'
import { reg, setStore} from '@/config/utils'
import { Toast } from 'vant';
export default {
  name: "login",
  components: {},
  data() {
    return {
      mobile: '',
      mobileCode: '',
      canGetCode: true,
      getCodeText: '获取'
    }
  },
  mounted() {},
  methods: {
    async sub() {
      if(!reg.mobile.test(this.mobile)){
        this.$toast('请输入正确手机号');
        return
      }
      if(!reg.mobileCode.test(this.mobileCode)){
        this.$toast('请输入正确验证码');
        return
      }
      const res = await login({
        strMobile: this.mobile,
        strMobileCode: this.mobileCode
      });
      if(!res) return;
      console.log(res);
      this.$toast('登陆成功');
      setStore('userId', res.lUserId);
      setStore('strMobileRandom', res.strMobileRandom);
      const cdo = res.cdologiner;
      setStore('lId', cdo.lId);//催收员员工id
      setStore('lUserId', cdo.lUserId);//催收员用户id
      setStore('strName', cdo.strName); //催收员姓名
      setStore('strMobile', cdo.strMobile);//催收员手机号
      setStore('lCollectionId', cdo.lCollectionId);//催收员归属机构id
      setStore('strCollectionName', cdo.strCollectionName);//催收员归属机构名称
      setStore('lCollLeaderId', cdo.lCollLeaderId);//催收员归属机构领导的员工id
      this.$router.push('/');
    },
    async getCode() { 
      if(!reg.mobile.test(this.mobile)){
        this.$toast('请输入正确手机号');
        return
      }
      const res = await getMobileCode({
        strMobile: this.mobile
      });
      if(!res) return;
      this.$toast('验证码已发送');
      let count = 60;
      this.getCodeText = count;
      this.canGetCode = false;
      let timer = 
      setInterval(() => {
        this.getCodeText = --count;
        if(count === 0){
          this.canGetCode = true;
          this.getCodeText = '获取';
          clearInterval(timer)
        }
      }, 1000);
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.yh-box {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  overflow-y: auto;
}
.login-header {
  height: 0.86rem;
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.86rem;
  background: #48a1ff;
}
.login-main {
  margin-top: 1rem;
  .login-input-box {
    @include flex("flex-start");
    position: relative;
    margin: 0 0.58rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid #a9a9a9;
    text-align: left;
    .iconfont {
      font-size: 0.42rem;
    }
    .login-input {
      margin-left: 0.16rem;
      font-size: 0.28rem;
      background: transparent;
      flex: 1;
    }
    .btn-getCode {
      width: 1.2rem;
      font-size: 0.3rem;
      color: #fff;
      line-height: 0.6rem;
      background: #48a1ff;
      border-radius: 0.5rem;
    }
  }
  .btn-sub {
    display: block;
    width: 6.34rem;
    margin: 0.58rem 0.58rem 0;
    font-size: 0.3rem;
    color: #fff;
    line-height: 0.88rem;
    background: #48a1ff;
    border-radius: 0.5rem;
  }
}
</style>