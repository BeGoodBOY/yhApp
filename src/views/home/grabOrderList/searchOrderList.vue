<template>
  <div class="home-box">
    <yh-header @lClick="back">
      <template #main>
        <input class="searchInput" type="text" v-model.trim="searchName" placeholder="请输入姓名或手机号">
        <i @click="getList" class="iconfont searchIcon">&#xe688;</i>
      </template>
    </yh-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :immediate-check='false'>
        <ul class="list">
          <list-item
            v-for="(item, index) in list"
            :key="index"
            :order="item"
            @grab="grabOrder"
          ></list-item>
        </ul>
      <no-data v-show="list.length<=0"></no-data>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getIndex, grabOrder } from "@/api/data";
import listItem from "./listItem";
import { PullRefresh, list } from "vant";
import yhHeader from '@/components/header';
import { reg } from '@/config/utils';
import noData from '@/components/noData';

export default {
  name: "searchOrderList",
  components: {
    listItem,
    vanPullRefresh: PullRefresh,
    // vanList: list,
    yhHeader,
    noData
  },
  data() {
    return {
      list: [],
      count: 0,
      isLoading: false,
      ob: {
        loading: false,
        finished: false,
        nPage: 1,
      },
      searchName: "",
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    async onRefresh() {
      const res = await getIndex({
        nPage: 1,
        strDebtorName: this.searchName
      });
      if (!res) return;
      this.ob.nPage = 1;
      const list = res.cdoDebtors;
      this.list = list;
      this.$toast("刷新成功");
      this.isLoading = false;
    },
    async getList() {
      if(!reg.name.test(this.searchName) && !reg.mobile.test(this.searchName)) {
        this.$toast('请输入正确姓名或手机号');
        return
      }
      let para = {};
      if(reg.name.test(this.searchName)) {
        para.strDebtorName = this.searchName;
      }else {
        para.strMobile = this.searchName;
      }
      const res = await getIndex({
        nPage: this.ob.nPage,
        nSize: 10000,
        ...para
      });
      if (!res) return;
      const list = res.cdoDebtors;
      if (list.length < 10) {
        this.ob.finished = true;
      }
      this.ob.nPage++;
      this.list = list;
    },
    async grabOrder(options) {
      const res = await grabOrder(options);
      console.log(res);
      return res;
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.home-box {
  @include flex();
  flex-direction: column;
  width: 100%;
  height: 100%;
  & > div {
    width: 100%;
  }
  & > div:last-child {
    flex: 1;
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
