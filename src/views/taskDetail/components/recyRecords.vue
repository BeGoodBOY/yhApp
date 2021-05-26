<template lang="">
  <div class="rush-box">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
        >
          <div class="list-box" v-for="(item,index) in list" :key="index">
                <!-- 申请减免 -->
              <!-- <applyRedu v-if="item.nRecordType ==1" :items="item"></applyRedu> -->
              <!-- 承诺还款 -->
              <!-- <commitRepay v-if="item.nRecordType == 2" :items="item"></commitRepay> -->
            <div class="box-content" v-show="item.nRecordType != 10">
              <div class="basic-box" >
                <img class="img" :src="require('@/assets/toux.png')" alt="">
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
                  <!-- <span v-show="item.nRecordType == 10">信息提供</span> -->
                  <span v-show="item.nRecordType == 11">拒接</span>
                  <span v-show="item.nRecordType == 12">不是本人</span>
                  <span v-show="item.nRecordType == 13">拒绝还款</span>
                  <span v-show="item.nRecordType == 14">其它</span>
                </li>
                <li v-show="item.nRecordType == 1">
                  <span class="s-text">结清金额</span>
                  <span class="s-red">{{formatMoney(item.lSettleAmount/100)}}元</span>
                </li>
                <li v-show="item.nRecordType == 2">
                  <span class="s-text">还款时间</span>
                  <span class="s-red">{{item.strPromiseDate}}</span>
                </li>
                <li v-show="item.nRecordType == 1 || item.nRecordType == 2 || item.nRecordType == 3 ">
                  <span class="s-text">催收方式</span>
                  <span>{{item.nCollectionWay == 0 ? '外访' : '电话催收'}}</span>
                </li>
                <template v-if="item.nCollectionWay==1&&item.nRecordType==3">
                  <li>
                  <span class="s-text">拨打电话</span>
                  <span>{{item.strCallNumber}}</span>
                </li>
                <li>
                  <span class="s-text">拨打情况</span>
                  <span>{{ getCallStatus(item.nAnswer, item.nCallSituation)}}</span>
                </li>
                </template>
                
                <li v-show="item.nRecordType == 1 || item.nRecordType == 2 || item.nRecordType == 3 ">
                  <span v-if="item.nRecordType==1||item.nRecordType==3" class="s-text s-top">催收图片</span> 
                  <span v-else class="s-text s-top">还款凭证</span>
                  <span>
                    <img :src="citem" alt="" v-for="(citem,idx) in item.strsUrl" :key="idx" @click="previewImg(item.strsUrl,idx)">
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
        </van-list>
    </van-pull-refresh>
    <!-- <div class="no-data" v-show="list.length <=0 ">暂无记录~</div> -->
  </div>
</template>
<script>
import { getRecyRecords } from "@/api/getDetailData";
import { formatMoney } from "@/config/utils";
import { ImagePreview, List, PullRefresh } from "vant";
import { mobileStateS1, mobileStateS2 } from '../inputReminder/components/data';
export default {
  data() {
    return {
      index: 0,
      firstArrSure: [],
      list: [],
      showflag: false,
      page: 1, // 当前页码
      pagesize: 10, // 每页多少条
      loading: false, // 是否处在加载状态
      finished: false, // 是否完成加载
      refreshing: false, //
      finishedText: "没有更多了", // 加载完毕文本提示
      total: 1, // 总条数
      length: null,
    };
  },
  created() {
    //this.handleRecyRecords()
    //this.onRefresh()
  },
  methods: {
    onLoad() {
      this.handleRecyRecords();
    },
    async handleRecyRecords() {
      let self = this;
      let options = {
        lDebtorId: this.$route.query.lDebtorId,
        nRecordType: -1,
        nPageSize: this.pagesize,
        nPageOffset: this.page,
      };
      const res = await getRecyRecords(options);
      if (!res) return;
      if (
        res.cdosData == null ||
        res.cdosData == undefined ||
        res.cdosData.length <= 0
      ) {
        setTimeout(function () {
          self.finished = true;
          //self.finishedText='暂无记录~'
        }, 1000);
      } else {
        self.length = res.cdosData.length;
        if (self.page > 1) {
          //console.log(res.cdosData.length)
          // self.length = res.cdosData.length
          self.list = [...self.list, ...res.cdosData];
        } else {
          self.list = res.cdosData;
          //console.log(res.cdosData.length)
        }
        // let counts=1 //self.list.RowCounts;
        // 加载状态结束
        self.loading = false;
        // 如果当前页数 = 总页数，则已经没有数据
        if (self.length < 10) {
          self.finished = true;
        } else {
          self.page++;
        }
        // // 如果当前页数 = 总页数，则已经没有数据
        // if (Math.ceil(counts/self.pagesize) === Math.ceil(self.list.length / self.pagesize)) {
        //     self.finished = true
        // }
        // // 未完成加一页
        // if (Math.ceil(counts/self.pagesize) > self.page) {
        //     self.page++
        // }
        // console.log("总页数："+ Math.ceil(counts/self.pagesize));
        // console.log("当前页数："+ Math.ceil(self.list.length / self.pagesize));
        // console.log("总行数："+counts+",页码："+self.pagesize+",渲染行数"+self.list.length);
      }
    },
    onRefresh() {
      this.isLoading = true; //处于加载状态
      this.page = 1;
      this.onLoad(); //调用加载数据的方法
      let self = this;
      setTimeout(function () {
        (self.loading = false),
          (self.finished = false),
          (self.refreshing = false);
      }, 1000);
    },
    previewImg(images, index) {
      ImagePreview({
        images: images,
        startPosition: index,
        closeable: true,
      });
    },
    onChange(index) {
      this.index = index;
    },
    formatMoney(value) {
      return formatMoney(value);
    },
    getCallStatus(s1, s2) {
      return mobileStateS1[s1].text + ' '  + mobileStateS2[s2];
    },
  },
  components: {
    vanList: List,
    vanPullRefresh: PullRefresh,
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
  },
};
</script>
<style lang="scss" scoped>
.v-load {
  margin-top: 0.3rem;
}
.no-data {
  padding: 0.3rem;
  font-size: 0.32rem;
}
.rush-box {
  min-height: 5rem;
  .repay-total {
    padding: 0.3rem;
    background: #fff;
    text-align: left;
    font-size: 0.32rem;
    .money-color {
      color: #f00;
      font-size: 0.34rem;
    }
  }
  .list-box {
    margin-top: 0.2rem;
    .box-content {
      margin-bottom: 0.2rem;
      padding: 0 0.3rem;
      background: #fff;
    }
    li {
      display: flex;
      padding: 0.25rem 0;
      font-size: 0.32rem;
      text-align: left;
      align-items: center;
      img {
        width: 140px;
        height: 170px;
        margin-right: 0.1rem;
      }
      .s-text {
        color: #999;
        width: 2rem;
      }
      .s-red {
        color: #f00;
      }
      .s-top {
        vertical-align: top;
      }
    }
    .basic-box {
      padding: 0.3rem 0;
      text-align: left;
      display: flex;
      font-size: 0.32rem;
      align-items: center;
      .img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      .name {
        flex: 1;
        padding: 0 0.2rem;
        box-sizing: border-box;
      }
      .time {
        width: 3rem;
        text-align: right;
        color: #999;
      }
    }
  }
}
</style>