<template lang="">
  <div class="rush-box">
    <div class="repay-total">提交还款总额：<span class="money-color">{{formatMoney(totalMoney/100)}}元</span></div>
    <div class="list-box" >
      <div class="box-content" v-for="(item,index) in list" :key="index">
        <div class="basic-box">
          <img class="img" src="https://dafyossfile.dafy.com/OSS/20210326/adefbf30827e449b8f60c59bb6c9516c.jpg" alt="">
          <span class="name">{{item.strDebtorName}}</span>
          <span class="time">{{item.dtCreateTime}}</span>
        </div>
        <ul>
          <li>
            <span class="s-text">打款对象</span>
            <span>忆铭</span>
          </li>
          <li>
            <span class="s-text">还款方式</span>
            <span>{{item.nRepayType == 0 ? '线下还款' : '线上还款'}}</span>
          </li>
          <li>
            <span class="s-text">提交金额</span>
            <span class="s-red">{{ formatMoney(item.lRepayAmount/100)}}元</span>
          </li>
          <li v-show="item.nRepayType == 0">
            <span class="s-text">打款方式</span>
            <span>{{item.nRemittanceType == 0 ? '转账' : '汇款'}}</span>
          </li>
          <li v-show="item.nRepayType == 0">
            <span class="s-text">打款人姓名</span>
            <span>{{item.strRemittanceName}}</span>
          </li>
          <li>
            <span class="s-text">打款时间</span>
            <span>{{item.strRemittanceDate}}</span>
          </li>
           <li v-show="item.nRepayType == 0">
            <span class="s-text">银行卡号</span>
            <span>{{item.strRemittanceCard}}</span>
          </li>
          <li>
            <span class="s-text s-top">还款凭证</span>
            <span>
              <img v-for="(citem,index) in item.strsUrl" :key="index" :src="citem" alt="" @click="previewImg(item.strsUrl,index)">
            </span>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>
<script>
import {getRecyRecords} from '@/api/getDetailData'
import { formatMoney } from '@/config/utils'
import { ImagePreview, Toast } from 'vant';
export default {
  data(){
    return{
      list:[],
      index:0,
      totalMoney:0
    }
  },
  created(){
    this.handleRecyRecords()
  },
  methods:{
    async handleRecyRecords(){
      let options ={
        lDebtorId: this.$route.query.lDebtorId,
        nRecordType:0
      }
      const res = await getRecyRecords(options)
      this.list = res.cdosData
      this.totalMoney = res.lSumRepayAmount
      console.log('催回记录',res.cdosData)
    },
    previewImg(images,index){
      ImagePreview({
        images: images,
        startPosition: index,
        closeable: true,
      });
    },
    onChange(index) {
      this.index = index;
    },
    formatMoney(value){
       return formatMoney(value)
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
    .list-box{
      margin-top:0.2rem;
      .box-content{
        margin-bottom:0.2rem;
        background:#fff;
        padding:0 0.3rem;
      }
      li{
        display:flex;
        padding:0.25rem 0;
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
          width:3rem;
          text-align: right;
          color:#999;
        }
      }
    }
  }
</style>