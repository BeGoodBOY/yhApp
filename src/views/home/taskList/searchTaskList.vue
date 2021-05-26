<template>
  <div class="home-box">
    <yh-header @lClick="back">
      <template #main>
        <input class="searchInput" type="text" v-model.trim="searchValue" placeholder="请输入姓名或手机号或身份证号">
        <i @click="getAllList" class="iconfont searchIcon">&#xe688;</i>
      </template>
    </yh-header>
    <div class="list-box">
    <van-pull-refresh v-model="allOb.isLoading" @refresh="onRefresh">
        <ul class="list">
          <list-item
            v-for="item in allOb.list"
            :key="item.lId"
            :order="item"
            @follow="goFollow($event, item)"
            @mobile="getMobiles"
          ></list-item>
        </ul>
      <no-data v-show="allOb.list.length<=0"></no-data>
    </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getDelegateList, followOrder, queryOrderMobiles } from "@/api/data";
import listItem from "./listItem";
import { PullRefresh } from "vant";
import showMobile from "./showMobile";
import { isNull, reg } from "@/config/utils";
import yhHeader from '@/components/header';
import noData from '@/components/noData'

export default {
  name: "searchTaskList",
  components: {
    listItem,
    // vanList: List,
    vanPullRefresh: PullRefresh,
    yhHeader,
    noData
  },
  data() {
    return {
      active: 0,
      loopFlag: false,
      mobileArr: [],
      allOb: {
        loading: false,
        finished: false,
        nPageIndex: 0,
        isLoading: false,
        list: [],
      },
      searchValue: ''
    };
  },
  methods: {
    async onRefresh() {
      this.allOb.isLoading = false;
      this.allOb.list = [];
      this.allOb.nPageIndex = 0;
      this.getAllList({
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
      this.$store.commit('changeRefreshFlag', {flag: true})
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
    async getAllList(options = {}) {
      if(!reg.name.test(this.searchValue) && !reg.mobile.test(this.searchValue) && !reg.idCard.test(this.searchValue)) {
        this.$toast('请输入正确姓名或手机号或身份证号');
        return
      }
      const res = await getDelegateList({
        strSearchKey: this.searchValue,
        nPageIndex: 0,
        nPageSize: 10000,
      });
      if (!res) return;
      const arr = res.cdosData;
      if (arr.length <= 0) {
        if(arr.length === 0) {
          this.allOb.list = [];
        }
        this.allOb.finished = true;
        return;
      }
      this.allOb.nPageIndex++;
      this.allOb.list = arr;
      this.allOb.loading = false;
    },
    back() {
      this.$router.back();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.home-box {
  flex: 1;
  width: 100%;
  background: #f0f1f1;
  &>div:last-child {
    flex: 1;
  }
  .list-box {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .mobile-para {
    white-space: normal;
  }
  .van-swipe-item {
    overflow-y: auto;
  }
  .searchInput {
    width: 5.7rem;
    padding: 0.1rem 0;
    border-radius: 0.3rem;
    text-indent: 0.3rem;
    color: #000;
  }
  .searchIcon {
    margin-left: 0.2rem;
    font-size: 0.32rem;
  }
}
</style>
