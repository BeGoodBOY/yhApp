<template>
  <div class="home-box">
    <yh-header lIcon="&#xe688;" @lClick="goSearch"></yh-header>
    <div class="list-box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="ob.loading"
        :finished="ob.finished"
        :finished-text="ob.finishText"
        @load="getList"
      >
        <ul class="list">
          <list-item
            v-for="(item, index) in list"
            :key="index"
            :order="item"
            @grab="grabOrder($event,index)"
          ></list-item>
        </ul>
      </van-list>
      <no-data v-show="list.length<=0"></no-data>
    </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getIndex, grabOrder } from "@/api/data";
import listItem from "./listItem";
import { PullRefresh,list } from "vant";
import yhHeader from "@/components/header";
import noData from "@/components/noData";

export default {
  name: "grabOrderList",
  components: {
    listItem,
    vanPullRefresh: PullRefresh,
    yhHeader,
    vanList: list,
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
        finishText: ''
      }
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    async onRefresh() {
      const res = await getIndex({
        nPage: 1
      });
      if (!res) {
        this.isLoading = false;
        return;
      }
      this.ob.nPage = 1;
      const list = res.cdoDebtors;
      this.list = list;
      this.$toast("刷新成功");
      this.isLoading = false;
    },
    async getList() {
      const res = await getIndex();
      if (!res) {
        this.ob.finished = true;
        return;
      }
      const list = res.cdoDebtors;
      if(list.length<10) {
        this.ob.finished = true;
        if(list.length>0) {
          this.ob.finishText = '到底了';
        }
      }
      this.ob.nPage++;
      this.ob.loading = false;
      this.list = this.list.concat(list);
    },
    async grabOrder(options, index) {
      const res = await grabOrder(options);
      if(!res) return;
      this.$toast('抢单成功');
      this.list.splice(index, 1);
      return res;
    },
    goSearch() {
      this.$router.push('orderlist/search')
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.home-box {
  @include flex();
  flex-direction: column;
  width: 100%;
  & > div {
    width: 100%;
  }
  & > div:last-child {
    flex: 1;
  }
  .list-box{
    overflow: auto;
  }
}
</style>
