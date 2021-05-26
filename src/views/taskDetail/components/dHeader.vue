<template>
  <div class="header">
    <div class="zw-box"><router-link tag="a" :to="{path:'/tasklist/taskdetail/debtList',query:{NoId:lDebtorId}}">{{detailData.nCreditCount}}个债务(查看债务列表)</router-link></div>
    <div class="money-box">
       <p class="p1">待还总额(元)</p>
       <p class="p2">{{totalAmount}}</p>
    </div>
    <ul class="own-box">
      <li>
        <p class="pp1">{{shouldRefundPrincipal}}</p>
        <p class="pp2">应还本金(元)</p>
      </li>
      <li>
        <p class="pp1">{{shouldRefundInterest}}</p>
        <p class="pp2">应还利息(元)</p>
      </li>
    </ul>
    <div class="bt-box">
      <span class="s-width">出库倒计时{{detailData.nOutboundDay}}天</span>
      <span class="s-width">委托倒计时{{detailData.nCountDownDay}}天</span>
    </div>
  </div>
</template>
<script>
import {outputmoney} from "@/config/common"
export default {
  data(){
    return {
     
    }
  },
  props:{
    detailData:{
      type:Object,
    },
    lDebtorId:{
      
    }
  },
  computed:{
    totalAmount() { //还款总额
      return outputmoney(this.detailData.lShouldRefundTotal/100 +'')
    },
    shouldRefundPrincipal() { //应还本金
      return outputmoney(this.detailData.lShouldRefundPrincipal/100 +'')
    },
    shouldRefundInterest() { //应还利息
      return outputmoney(this.detailData.lShouldRefundInterest/100 +'')
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "@/style/var.scss";
  .header{
    height:6rem;
    background: $color;
    position:relative;
    .zw-box{
      text-align:center;
      color:#fff;
      font-size: 0.32rem;
      padding-top:0.8rem;
    }
    .money-box{
      padding-top:0.9rem;
      .p1{
      color:rgba(255,255,255,.7);
      font-size:.28rem;
      }
      .p2{
        color:#fff;
        font-weight:800;
        font-size:0.6rem;
        padding-top: 0.2rem;
      }
    }
    .own-box{
      display:flex;
      padding-top: 1rem;
      li{
        flex:1;
        color:#fff;
        position:relative;
        &:first-child{
          &:after{
            content:'';
            width:0.01rem;
            height:0.4rem;
            display:inline-block;
            position:absolute;
            right:0;
            top:50%;
            background:rgba(255,255,255,.7);
            margin-top: -0.25rem;
          }
        }
        .pp1{
          color:#fff;
          font-size:0.38rem;
        }
        .pp2{
          font-size:0.28rem;
          margin-top:0.1rem;
          color:rgba(255,255,255,.7);
        }
      }
    }
    .bt-box{
      height:0.9rem;
      line-height: 0.9rem;
      position:absolute;
      bottom:0;
      font-size:0.32rem;
      color:#fff;
      display:flex;
      width: 100%;
      border-top:0.02rem solid rgba(255,255,255,.3);
      .s-width{
        flex:1;
        text-align: center;
      }
    }
  }
</style>