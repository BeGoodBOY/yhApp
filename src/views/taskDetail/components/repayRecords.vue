<template lang="">
  <div class="rush-box">
    <div class="no-data" v-if='list.length==0'>暂无还款记录</div>
    <div class="list-box" v-else-if='list.length>0'>
      <div class="box-content" v-for="(item,index) in list" :key="index">
        <div class="d-tit">
          <span class="d-name">{{item.strCreditName}}</span>
          <span class="d-time">{{item.dtCreateTime}}</span>
        </div>
        <ul>
          <li>
            <span class="s-text">还款时间</span>
            <span>忆铭</span>
          </li>
          <li>
            <span class="s-text">还款方式</span>
            <span v-if="item.nRefundWay==1">线下平账</span>
            <span v-else-if="item.nRefundWay==2">系统自动划扣</span>
          </li>
          <li>
            <span class="s-text">还款总额</span>
            <span class="s-red">{{item.lRefundTotal}}元</span>
          </li>
          <li>
            <span class="s-text">还款本金</span>
            <span>{{item.lRefundPrincipal}}</span>
          </li>
          <li>
            <span class="s-text">还款利息</span>
            <span>{{item.lRefundInterest}}</span>
          </li>
          <li>
            <span class="s-text">违约金</span>
            <span>{{item.lRefundCompensation}}</span>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>
<script>
import {getRepayCords} from '@/api/getDetailData'
export default {
  props:{
   personData:{
     type:Object,
    }
  },
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.handleGetCords()
  },
  methods:{
    async handleGetCords() {
      let options ={
        NoId:this.personData.strIdentity
      }
      const res  = await getRepayCords(options)
      this.list = res.cdosData
      //console.log(this.list.length)
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
}
</script>
<style lang="scss" scoped>
  .rush-box{
    .repay-total{
      padding:0.3rem;
      background:#fff;
      text-align:left;
      font-size:0.32rem;
      .money-color{
        color:#f00;
        font-size:0.34rem;
      }
    }
    .no-data{
      padding:0.3rem;
      font-size:0.32rem;
    }
    .list-box{
      margin-top:0.2rem;
      .box-content{
        margin-bottom:0.2rem;
        background:#fff;
        .d-tit{
          display:flex;
          padding:0.3rem 0.3rem;
          border-bottom:0.01rem solid #e2e2e2;
          font-size:0.32rem;
          .d-name{
            text-align:left;
            flex:1;
          }
          .d-time{
            text-align:right;
            width:2.4rem;
          }
        }
      }
      li{
        display:flex;
        padding:0.25rem 0.3rem;
        font-size:0.32rem;
        text-align:left;
        align-items: center;
        img{
        width:140px;
        height:170px;
        margin-right:0.1rem;
        }
        .s-text{
        color:#999;
        width:2rem;
        }
        .s-red{
          color:#f00;
        }
        .s-top{
          vertical-align:top;
        }
      }
      .basic-box{
        padding:0.3rem 0;
        text-align: left;
        display:flex;
        font-size:.32rem;
        align-items: center;
        .img{
          width:120px;
          height:120px;
          border-radius:50%;
        }
        .name{
          flex:1;
          padding:0 .2rem;
          box-sizing: border-box;
        }
        .time{
          width:2.6rem;
          text-align: right;
          color:#999;
        }
      }
    }
  }
</style>