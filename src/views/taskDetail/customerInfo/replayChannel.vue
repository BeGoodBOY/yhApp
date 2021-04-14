<template lang="">
  <div>
    <MHeader @lClick="goBack" />
    <div class="channel-box">
      <ul v-for="(item,index) in list" :key="index">
        <li>
          <span class="s-text">债权方</span>
          <span class="s-content">{{item.strCreditName}}</span>
        </li>
        <li>
          <span class="s-text">还款渠道</span>
          <span class="s-content">
            <p class="font-color p1">
              <em>{{item.nRepaymentOnline ==1 ? "线上还款(支持)" : '"线上还款(不支持)"' }}</em>
              <em class="m-lt">{{item.nRepaymentOffline ==1 ? "线下还款(支持)" : '线下还款(不支持)'}}</em>
            </p>
            <p class="tip">*线上还款指通过债权方APP还款</p>
          </span>
        </li>
        <li>
          <span class="s-text">收款开户行</span>
          <span class="s-content font-color">{{item.strBankName}}</span>
        </li>
        <li>
          <span class="s-text">账户户名</span>
          <span class="s-content font-color">{{item.strAccountName}}</span>
        </li>
        <li>
          <span class="s-text">银行账号</span>
          <span class="s-content font-color">{{item.strAccountCard}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {getReplayChannel} from '@/api/getDetailData.js'
import MHeader from '@/components/header'
export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
    //console.log()
    this.handleGetData(this.$route.query.id)
  },
  methods:{
    async handleGetData(id){
      let options ={
        creditIds:id
      }
      const res = await getReplayChannel(options)
      this.list = res.cdosData
    },
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
  .channel-box{
    margin-top:0.2rem;
    background:#fff;
    padding:0 .3rem;
    li{
      display:flex;
      align-items: center;
      font-size:0.32rem;
      text-align: left;
      padding:.3rem 0;
      border-bottom:0.01rem solid #e2e2e2;
      &:last-child{
        border:none;
      }
      .s-text{
        width:1.8rem;
        color:#999;
      }
      .s-content{
        flex:1;
      }
      .tip{
        color:#f00;
        font-size:0.28rem;
      }
      .font-color{
        color:#09f;
      }
      .p1{
        font-size:0.32rem;
        margin-bottom: 0.2rem;
      }
      .m-lt{
        padding-left:0.4rem;
        box-sizing: border-box;
      }
    }
  }
</style>