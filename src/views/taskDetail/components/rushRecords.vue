<template lang="">
  <div class="rush-box">
    <div class="repay-total">提交还款总额：<span class="money-color">{{formatMoney(totalMoney/100)}}元</span></div>
    <div class="list-box" >
       <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="finishedText"
              @load="onLoad"
            >
            <div class="box-content" v-for="(item,index) in list" :key="index">
              <div class="basic-box">
                <img class="img" :src="require('@/assets/toux.png')" alt="">
                <span class="name">{{item.strDebtorName}}</span>
                <span class="time">{{item.dtCreateTime}}</span>
              </div>
              <ul>
                <!-- <li>
                  <span class="s-text">打款对象</span>
                  <span>{{ item.strRemittanceName }}</span>
                </li> -->
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
                <li v-show="item.nRepayType == 0 && item.strRemittanceCard">
                  <span class="s-text">银行卡号</span>
                  <span>{{item.strRemittanceCard}}</span>
                </li>
                <li v-show="item.nRepayType == 0 && item.strRemittanceBank">
                  <span class="s-text">银行名称</span>
                  <span>{{item.strRemittanceBank}}</span>
                </li>
                <li>
                  <span class="s-text s-top">还款凭证</span>
                  <span>
                    <img v-for="(citem,idx) in item.strsUrl" :key="idx" :src="citem" alt="" @click="previewImg(item.strsUrl,idx)">
                  </span>
                </li>
              </ul>
            </div>
          </van-list>
        </van-pull-refresh>
    </div>
    <!-- <van-loading size="40px" text-size="30px" v-if="showflag"  class="v-load">加载中...</van-loading>
    <div class="no-data" v-show="list.length==0 && !showflag ">暂无记录~</div> -->
  </div>
</template>
<script>
import {getRecyRecords} from '@/api/getDetailData'
import { formatMoney } from '@/config/utils'
import { ImagePreview,List,PullRefresh} from 'vant';
export default {
  data(){
    return{
      list:[],
      index:0,
      totalMoney:null,
      showflag:true,
      page:1, // 当前页码
      pagesize:10, // 每页多少条
      loading: false, // 是否处在加载状态
      finished: false, // 是否完成加载
      refreshing:false, // 
      finishedText: '没有更多了', // 加载完毕文本提示
      total: 1, // 总条数
      length:null
    }
  },
  created(){
    //this.handleRecyRecords()
  },
  methods:{
    onLoad() {
      this.handleRecyRecords();
    },
    async handleRecyRecords(){
      let self = this;
      let options ={
        lDebtorId: this.$route.query.lDebtorId,
        nRecordType:0,
        nPageSize:this.pagesize,
        nPageOffset:this.page
      }
      const res = await getRecyRecords(options)
      if (!res)return;
      if (res.cdosData == null || res.cdosData == undefined || res.cdosData.length <= 0) {
          setTimeout(()=>{
            this.finished = true
            //self.finishedText='暂无记录~'
          },1000)
      }else{
        self.length = res.cdosData.length
        this.totalMoney = res.lSumRepayAmount
        if (self.page > 1) {
          console.log(res.cdosData.length)
          // self.length = res.cdosData.length
          self.list = [...self.list, ...res.cdosData]
        }else {
          self.list = res.cdosData
          //console.log(res.cdosData.length)
        }
        // let counts=1 //self.list.RowCounts;
        // 加载状态结束
        self.loading = false; 
         // 如果当前页数 = 总页数，则已经没有数据
        if (self.length < 10) {
            self.finished = true           
        }else{
           self.page++
        }
      }
    },
    onRefresh() {
      this.isLoading = true;  //处于加载状态
      this.page = 1;
      this.onLoad(); //调用加载数据的方法
      let self=this;
      setTimeout(function(){
        self.loading = false,
        self.finished = false,
        self.refreshing = false
      },1000)
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
    'vanList':List,
    'vanPullRefresh':PullRefresh
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
}
</script>
<style lang="scss" scoped>
  .v-load{
    margin-top:0.3rem
  }
  .no-data{
    padding:0.3rem;
    font-size:0.32rem;
  }
  .rush-box{
    min-height: 5rem;
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