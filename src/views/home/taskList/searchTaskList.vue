<template>
  <div class="home-box">
    <yh-header @lClick="back">
      <template #main>
        <input class="searchInput" type="text" v-model.trim="searchValue" placeholder="请输入姓名或手机号">
        <i @click="getAllList" class="iconfont searchIcon">&#xe688;</i>
      </template>
    </yh-header>
    <van-pull-refresh v-model="allOb.isLoading" @refresh="onRefresh">
        <ul class="">
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
      if(!reg.name.test(this.searchName) && !reg.mobile.test(this.searchName)) {
        this.$toast('请输入正确姓名或手机号');
        return
      }
      const res = await getDelegateList({
        strSearchKey: this.searchValue,
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
      this.allOb.nPageIndex++;
      this.allOb.list = this.allOb.list.concat(arr);
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
  .searchInput {
    width: 5.7rem;
    height: 0.52rem;
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
