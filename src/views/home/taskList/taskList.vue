<template>
  <div class="home-box">
     <yh-header
      v-show="active!==3"
      lIcon="&#xe688;"
      @lClick="goSearch"
      rIcon="&#xe64d;"
      @rClick="rClick"
    ></yh-header>
    <yh-header
      v-show="active===3"
      lIcon="&#xe688;"
      @lClick="goSearch"
    ></yh-header>
    <pop-filter
      :show="popFilterShow"
      @itemClick="itemClick"
      @maskClick="popFilterShow = false"
    ></pop-filter>
    <tabs ref="tab" v-model="active" :before-change="tabChange">
      <tab title-class="task-tab" title="全部"></tab>
      <tab title="已关注"></tab>
      <tab title="未开案"></tab>
      <tab title="申请案件"></tab>
    </tabs>
    <swipe
      ref="swipe"
      class="my-swipe"
      :loop="loopFlag"
      @change="swipeChange"
      :show-indicators="false"
    >
      <swipe-item ref="swipe0">
        <van-pull-refresh v-model="allOb.isLoading" @refresh="onRefresh">
          <van-list
            v-model="allOb.loading"
            :finished="allOb.finished"
            :finished-text="allOb.finishedText"
            @load="getAllList"
            :immediate-check="false"
          >
            <ul class="">
              <list-item
                v-for="item in allOb.list"
                :key="item.lId"
                :order="item"
                @follow="goFollow($event, item)"
                @mobile="getMobiles"
              ></list-item>
            </ul>
          </van-list>
          <no-data v-show="allOb.list.length <= 0"></no-data>
        </van-pull-refresh>
      </swipe-item>
      <swipe-item ref="swipe1">
        <van-pull-refresh v-model="followOb.isLoading" @refresh="onRefresh1">
          <van-list
            v-model="followOb.loading"
            :finished="followOb.finished"
            :finished-text="followOb.finishedText"
            @load="getFollowList"
           :immediate-check="false" 
          >
            <ul class="list">
              <list-item
                v-for="item in followOb.list"
                :key="item.lId"
                :order="item"
                @follow="goFollow($event, item)"
                @mobile="getMobiles"
              ></list-item>
            </ul>
          </van-list>
          <no-data v-show="followOb.list.length <= 0"></no-data>
        </van-pull-refresh>
      </swipe-item>
      <swipe-item>
        <van-pull-refresh v-model="uncaseOb.isLoading" @refresh="onRefresh2">
          <van-list
            v-model="uncaseOb.loading"
            :finished="uncaseOb.finished"
           :finished-text="uncaseOb.finishedText"
            @load="getUncaseList"
            :immediate-check="false"
          >
            <ul class="list">
              <list-item
                v-for="item in uncaseOb.list"
                :key="item.lId"
                :order="item"
                @follow="goFollow($event, item)"
                @mobile="getMobiles"
              ></list-item>
            </ul>
          </van-list>
          <no-data v-show="uncaseOb.list.length <= 0"></no-data>
        </van-pull-refresh>
      </swipe-item>
      <swipe-item>
        <van-pull-refresh v-model="appliedOb.isLoading" @refresh="onRefresh3">
          <van-list
            v-model="appliedOb.loading"
            :finished="appliedOb.finished"
            :finished-text="appliedOb.finishedText"
            @load="getAppliedList"
            :immediate-check="false"
          >
            <ul class="list">
              <list-item
                v-for="(item, index) in appliedOb.list"
                :key="item.lId"
                :order="item"
                :orderType="2"
                @follow="goFollow($event, item)"
                @mobile="getMobiles"
                @cancelCase="cancelCaseDialog($event, index)"
              ></list-item>
            </ul>
          </van-list>
          <no-data v-show="appliedOb.list.length <= 0"></no-data>
        </van-pull-refresh>
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
import {
  getDelegateList,
  followOrder,
  queryOrderMobiles,
  cancelCase,
} from "@/api/data";
import listItem from "./listItem";
import { Swipe, SwipeItem, Tab, Tabs, List, PullRefresh, Dialog } from "vant";
import showMobile from "./showMobile";
import { isNull, bugScroll } from "@/config/utils";
import yhHeader from "@/components/header";
import noData from "@/components/noData";
import popFilter from "./popFilter";

export default {
  name: "taskList",
  components: {
    listItem,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    vanList: List,
    vanPullRefresh: PullRefresh,
    yhHeader,
    noData,
    popFilter,
  },
  data() {
    return {
      popFilterShow: false,
      filterValue: -1,
      active: 0,
      allArr: [],
      followArr: [],
      uncaseArr: [],
      appliedArr: [],
      loopFlag: false,
      mobileArr: [],
      allOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
        finishedText: '到底了'
      },
      followOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
        finishedText: '到底了'
      },
      uncaseOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
        finishedText: '到底了'
      },
      appliedOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
        finishedText: '到底了'
      },
      initArr: [true, false, false, false],
      scrollY: 0
    };
  },
  created() {
    this.onRefresh();
    const query = this.$route.query;
    if(query.type==='3'&&query.from==='native') {
      this.active = 3;
    }
  },
  mounted() {
  },
  methods: {
    goSearch() {
      this.$router.push({path: "tasklist/search", query: {from:'list'}});
    },
    rClick(key) {
      this.popFilterShow = !this.popFilterShow;
    },
    itemClick(key) {
      this.popFilterShow = !this.popFilterShow;
      if (key == this.filterValue) return;
      this.filterValue = key;
      this.onRefresh();
      this.onRefresh1();
      this.onRefresh2();
      this.onRefresh3();
      this.initArr = this.initArr.map(value => value = true);
    },
    async onRefresh() {
      this.allOb.isLoading = false;
      this.allOb.nPageIndex = 0;
      this.getAllList({
        refresh: true
      });
    },
    async onRefresh1() {
      this.followOb.isLoading = false;
      this.followOb.nPageIndex = 0;
      this.getFollowList({
        refresh: true
      });
    },
    async onRefresh2() {
      this.uncaseOb.isLoading = false;
      this.uncaseOb.nPageIndex = 0;
      this.getUncaseList({
        refresh: true,
      });
    },
    async onRefresh3() {
      this.appliedOb.isLoading = false;
      this.appliedOb.nPageIndex = 0;
      this.getAppliedList({
        refresh: true
      });
    },
    async goFollow(options, item) {
      const res = await followOrder({
        lId: options.lId,
      });
      if (!res) return;
      this.toast("关注成功");
      item.nIsFollow = 1;
      this.initArr = this.initArr.map((value,index) => {
          if(this.active === index) return value;
          return value = false
        });
    },
    async getMobiles(lDebtorId) {
      const res = await queryOrderMobiles({
        lDebtorId,
      });
      if (!res) return;
      const list = res.cdosData;
      if (list.length <= 0) {
        return;
      }
      showMobile(list);
    },
    cancelCaseDialog(options, index) {
      Dialog.confirm({
        title: "撤回案件",
        message: "您确认撤回案件",
        confirmButtonColor: "#48a1ff",
      })
        .then(() => {
          this.cancelCase(options, index);
        })
        .catch(() => {
          console.log("取消");
        });
    },
    async cancelCase(options, index) {
      const res = await cancelCase(options);
      if (!res) return;
      this.$toast("抢单成功");
      this.appliedOb.list.splice(index, 1);
      return res;
    },
    swipeChange(index) {
      this.active = index;
      if(this.initArr[index]) return;
      this.initArr[index]=true;
      switch(index) {
        case 0 : this.onRefresh(); break;
        case 1 : this.onRefresh1(); break;
        case 2 : this.onRefresh2(); break;
        case 3 : this.onRefresh3(); break;

      }
    },
    tabChange(index) {
      this.active = index;
      this.$refs.swipe.swipeTo(index);
    },
    async getAllList(options = {refresh: false}) {
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nStatus: -1,
        nPageIndex: this.allOb.nPageIndex,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        if(options.refresh) {
          this.allOb.finishedText = '';
          this.allOb.list = []; 
        }
        this.allOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.allOb.finished = true;
        this.allOb.finishedText = '到底了';
      } else {
        this.allOb.finished = false;
      }
      this.allOb.nPageIndex++;
      this.allOb.loading = false;
      if(!options.refresh) {
        this.allOb.list = this.allOb.list.concat(arr);
      }else {
        this.allOb.list = arr;
      }
      
    },
    async getFollowList(options = {refresh: false}) {
      //已关注
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nStatus: 1,
        nPageIndex: this.followOb.nPageIndex,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        if(options.refresh) {
          this.followOb.list = []; 
          this.followOb.finishedText = '';
        }
        this.followOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.followOb.finishedText = '到底了';
        this.followOb.finished = true;
      } else {
        this.followOb.finished = false;
      }
      this.followOb.nPageIndex++;
      this.followOb.loading = false;
      if(!options.refresh) {
        this.followOb.list = this.followOb.list.concat(arr);
      }else {
        this.followOb.list = arr;
      }
      
    },
    async getUncaseList(options = {refresh: false}) {
      //未开案
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nStatus: 0,
        nPageIndex: this.uncaseOb.nPageIndex,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        if(options.refresh) {
          this.uncaseOb.finishedText = '';
          this.uncaseOb.list = []; 
        }
        this.uncaseOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.uncaseOb.finishedText = '到底了';
        this.uncaseOb.finished = true;
      } else {
        this.uncaseOb.finished = false;
      }
      this.uncaseOb.nPageIndex++;
      if(!options.refresh) {
        this.uncaseOb.list = this.uncaseOb.list.concat(arr);
      }else {
        this.uncaseOb.list = arr;
      }
      this.uncaseOb.loading = false;
    },
    async getAppliedList(options = {refresh: false}) {
      //已申请
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nPageIndex: this.appliedOb.nPageIndex,
        nStatus: 2,
      });
      if (!res) {
        this.appliedOb.finished = true;
        return;
      }
      const arr = res.cdosData;
      if (arr.length <= 0) {
        if(options.refresh) {
          this.appliedOb.finishedText = '';
          this.appliedOb.list = []; 
        }
        this.appliedOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.appliedOb.finishedText = '到底了';
        this.appliedOb.finished = true;
      } else {
        this.appliedOb.finished = false;
      }
      this.appliedOb.nPageIndex++;
      this.appliedOb.loading = false;
      if(!options.refresh) {
        this.appliedOb.list = this.appliedOb.list.concat(arr);
      }else {
        this.appliedOb.list = arr;
      }
      
    },
  },
  activated() {
    console.log('actived');
    // 订单修改后触发更新
    if(this.$store.state.refreshFlag) {
      this.onRefresh();
      this.active = 0;
      this.initArr = this.initArr.map((value,index) => {
        if(this.active === index) return true;
        return false
      });
      // console.log(this.initArr)
      this.$store.commit('changeRefreshFlag', {flag: false});
    }else {
      this.$nextTick(() => {
        this.$refs.swipe.swipeTo(this.active, {
          immediate: true
        });
        this.popFilterShow = false;
        this.$refs.swipe.children[this.active].$el.scrollTo(0, this.scrollY);
      });
    }
  },
  //记录离开时的位置
  beforeRouteLeave (to, from, next) { 
    this.scrollY = this.$refs.swipe.children[this.active].$el.scrollTop;
    // console.log('离开时保存滚动条的位置', this.scrollY);
    next();
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.home-box {
  @include flex();
  flex-direction: column;
  flex: 1;
  width: 100%;
  background: #f0f1f1;
  & > div {
    width: 100%;
  }
  .my-swipe {
    width: 100%;
    margin-top: 0.2rem;
  }
  .my-swipe {
    flex: 1;
  }
  .list {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .mobile-para {
    white-space: normal;
  }
  .van-swipe-item {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
