<template>
  <div class="home-box">
    <yh-header lIcon="&#xe688;" @lClick="goSearch" rIcon="&#xe64d;" @rClick="rClick"></yh-header>
    <pop-filter :show="popFilterShow" @itemClick="itemClick" @maskClick="popFilterShow=false"></pop-filter>
    <tabs ref="tab" v-model="active" :before-change="tabChange">
      <tab title-class="task-tab" title="全部"></tab>
      <tab title="已关注"></tab>
      <tab title="未开案"></tab>
      <tab title="申请案件"></tab>
    </tabs>
    <swipe
      ref="swipe"
      class="my-swipe"
      indicator-color="white"
      :loop="loopFlag"
      @change="swipeChange"
      :show-indicators="false"
    >
      <swipe-item>
        <van-pull-refresh v-model="allOb.isLoading" @refresh="onRefresh">
          <van-list
            v-model="allOb.loading"
            :finished="allOb.finished"
            finished-text=""
            @load="getAllList"
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
      <swipe-item>
        <van-pull-refresh v-model="followOb.isLoading" @refresh="onRefresh1">
          <van-list
            v-model="followOb.loading"
            :finished="followOb.finished"
            finished-text=""
            @load="getFollowList"
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
            finished-text=""
            @load="getUncaseList"
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
            finished-text=""
            @load="getAppliedList"
          >
            <ul class="list">
              <list-item
                v-for="item in appliedOb.list"
                :key="item.lId"
                :order="item"
                @follow="goFollow($event, item)"
                @mobile="getMobiles"
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
import { getDelegateList, followOrder, queryOrderMobiles } from "@/api/data";
import listItem from "./listItem";
import { Swipe, SwipeItem, Tab, Tabs, List, PullRefresh, Popover } from "vant";
import showMobile from "./showMobile";
import { isNull } from "@/config/utils";
import yhHeader from "@/components/header";
import noData from "@/components/noData";
import popFilter from './popFilter';

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
    popFilter
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
      },
      followOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
      },
      uncaseOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
      },
      appliedOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
      },
    };
  },
  methods: {
    goSearch() {
      this.$router.push("tasklist/search");
    },
    rClick(key) {
      this.popFilterShow = !this.popFilterShow;
    },
    itemClick(key) {
      this.popFilterShow = !this.popFilterShow;
      console.log(key)
      if(key == this.filterValue) return;
      this.filterValue = key;
      this.onRefresh();
      this.onRefresh1();
      this.onRefresh2();
      this.onRefresh3();
    },
    async onRefresh() {
      this.getAllList({
        nPageIndex: 0,
      });
      this.allOb.isLoading = false;
      this.allOb.list = [];
      this.allOb.nPageIndex = 0;
    },
    async onRefresh1() {
      this.getFollowList({
        nPageIndex: 0,
      });
      this.followOb.isLoading = false;
      this.followOb.list = [];
      this.followOb.nPageIndex = 0;
    },
    async onRefresh2() {
      this.getUncaseList({
        nPageIndex: 0,
      });
      this.uncaseOb.isLoading = false;
      this.uncaseOb.list = [];
      this.uncaseOb.nPageIndex = 0;
    },
    async onRefresh3() {
      this.getAppliedList({
        nPageIndex: 0,
      });
    },
    async goFollow(options, item) {
      const res = await followOrder({
        lId: options.lId,
      });
      if (!res) return;
      this.toast("关注成功");
      item.nIsFollow = 1;
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
    swipeChange(index) {
      this.active = index;
    },
    tabChange(index) {
      this.active = index;
      this.$refs.swipe.swipeTo(index);
    },
    async getAllList(options = {}) {
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nStatus: -1,
        nPageIndex: !isNull(options.nPageIndex)
          ? options.nPageIndex
          : this.allOb.nPageIndex,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        this.allOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.allOb.finished = true;
      }
      this.allOb.nPageIndex++;
      this.allOb.list = this.allOb.list.concat(arr);
      this.allOb.loading = false;
    },
    async getFollowList(options = {}) {
      //已关注
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nStatus: 1,
        nPageIndex: !isNull(options.nPageIndex)
          ? options.nPageIndex
          : this.followOb.nPageIndex,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        this.followOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.followOb.finished = true;
      }
      this.followOb.list = this.followOb.list.concat(arr);
      this.followOb.nPageIndex++;
      this.followOb.loading = false;
    },
    async getUncaseList(options = {}) {
      //未开案
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nStatus: 0,
        nPageIndex: !isNull(options.nPageIndex)
          ? options.nPageIndex
          : this.uncaseOb.nPageIndex,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        this.uncaseOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.uncaseOb.finished = true;
      }
      this.uncaseOb.list = this.uncaseOb.list.concat(arr);
      this.uncaseOb.nPageIndex++;
      this.uncaseOb.loading = false;
    },
    async getAppliedList(options = {}) {
      //已申请
      const res = await getDelegateList({
        nFilter: this.filterValue,
        nPageIndex: !isNull(options.nPageIndex)
          ? options.nPageIndex
          : this.appliedOb.nPageIndex,
        nStatus: 2,
      });
      if (!res) {
        this.appliedOb.finished = true;
        return;
      }
      const arr = res.cdosData;
      if (arr.length <= 0) {
        this.appliedOb.finished = true;
        return;
      }
      if (arr.length < 10) {
        this.appliedOb.finished = true;
      }
      this.appliedOb.list = this.appliedOb.list.concat(arr);
      this.appliedOb.nPageIndex++;
      this.appliedOb.loading = false;
    },
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
  }
  .mobile-para {
    white-space: normal;
  }
  .van-swipe-item {
    overflow-y: auto;
  }
}
</style>
