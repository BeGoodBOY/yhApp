<template lang="">
  <div>
    <MHeader @lClick="goBack" />
    <div class="client-box">
      <ul>
        <li>
          <span class="s-left">委托函</span>
          <span class="s-right"><router-link tag="a" :to="{path:'/checkLetter'}" >点击查看</router-link></span>
        </li>
        <li>
          <span class="s-left">债权方</span>
          <span class="s-right">忆铭</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header'
export default {
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  components:{
    MHeader
  }
}
</script>
<style lang="scss" scoped>
  .client-box{
    background:#fff;
    margin-top:0.3rem;
    li{
      padding:0.3rem;
      display:flex;
      font-size:0.32rem;
      .s-left{
        width:1.5rem;
        text-align:left;
        color:#666;
      }
      .s-right{
        flex:1;
        text-align:left;
        a{
          color:#09f;
        }
      }
    }
  }
</style>