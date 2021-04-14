<template lang="">
  <div class="rush-box">
    <div class="list-box" v-for="(item,index) in list" :key="index">
          <!-- 申请减免 -->
        <!-- <applyRedu v-if="item.nRecordType ==1" :items="item"></applyRedu> -->
        <!-- 承诺还款 -->
        <!-- <commitRepay v-if="item.nRecordType == 2" :items="item"></commitRepay> -->
      <div class="box-content">
        <div class="basic-box">
          <img class="img" src="https://dafyossfile.dafy.com/OSS/20210326/adefbf30827e449b8f60c59bb6c9516c.jpg" alt="">
          <span class="name">{{item.strDebtorName}}</span>
          <span class="time">{{item.dtCreateTime}}</span>
        </div>
        <ul>
          <li>
            <span class="s-text">催收结果</span>
            <span v-show="item.nRecordType == 1">申请减免</span>
            <span v-show="item.nRecordType == 2">承诺还款</span>
            <span v-show="item.nRecordType == 3">继续跟进</span>
            <span v-show="item.nRecordType == 4">诉讼</span>
            <span v-show="item.nRecordType == 5">律师函</span>
            <span v-show="item.nRecordType == 6">经侦协催</span>
            <!-- <span v-show="item.nRecordType == 7">信息提供</span> -->
            <span v-show="item.nRecordType == 7">老赖</span>
            <span v-show="item.nRecordType == 8">截流</span>
            <span v-show="item.nRecordType == 9">无人接听</span>
            <span v-show="item.nRecordType == 10">信息提供</span>
            <span v-show="item.nRecordType == 11">拒接</span>
            <span v-show="item.nRecordType == 12">不是本人</span>
            <span v-show="item.nRecordType == 13">拒绝还款</span>
            <span v-show="item.nRecordType == 14">其它</span>
          </li>
          <li v-show="item.nRecordType == 1">
            <span class="s-text">结清金额</span>
            <span class="s-red">{{formatMoney(item.lSettleAmount/100)}}</span>
          </li>
          <li v-show="item.nRecordType == 2">
            <span class="s-text">还款时间</span>
            <span class="s-red">{{item.strPromiseDate}}</span>
          </li>
          <li v-show="item.nRecordType == 1 || item.nRecordType == 2 || item.nRecordType == 3 ">
            <span class="s-text">催收方式</span>
            <span>{{item.nCollectionWay == 0 ? '外访' : '电话催收'}}</span>
          </li>
          <li v-show="item.nRecordType == 1 || item.nRecordType == 2 || item.nRecordType == 3 ">
            <span class="s-text s-top">还款凭证</span>
            <span>
              <img :src="citem" alt="" v-for="(citem,idx) in item.strsUrl" :key="idx" @click="previewImg(item.strsUrl,index)">
            </span>
          </li>
          <li v-show="item.nRecordType == 13">
            <span class="s-text">拒绝还款原因</span>
            <span class="s-red" v-show="item.nRefuseReason == 0">有能力还款</span>
            <span class="s-red" v-show="item.nRefuseReason == 1">无能力还款</span>
            <span class="s-red" v-show="item.nRefuseReason == 2">只还本金</span>
            <span class="s-red" v-show="item.nRefuseReason == 3">想还款但没钱</span>
          </li>
          <li>
            <span class="s-text">备注</span>
            <span>{{item.strRemark}}</span>
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
    return {
      index:0,
      list:[]
    }
  },
  created(){
    //this.id = this.$route.query.lDebtorId
    //console.log(this.id)
    this.handleRecyRecords()
  },
  methods:{
    async handleRecyRecords(){
      let options ={
        lDebtorId: this.$route.query.lDebtorId,
        nRecordType: -1
      }
      const res = await getRecyRecords(options)
      this.list = res.cdosData
      console.log('催收记录',res.cdosData)
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
  components:{
    // applyRedu,
    // commitRepay
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
        padding:0 0.3rem;
        background: #fff;
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