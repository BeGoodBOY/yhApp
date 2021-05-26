<template>
  <div class="home-box">
    <yh-header
      lIcon="&#xe688;"
      @lClick="goSearch"
      rIcon="&#xe62c;"
      rSize="0.38rem"
      @rClick="rClick"
    ></yh-header>
    <div class="list-box">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getList"
        >
          <ul class="list">
            <list-item
              v-for="(item, index) in list"
              :key="index"
              :order="item"
              @grab="grabOrder($event, index)"
            ></list-item>
        </ul>
        </van-list>
      </van-pull-refresh>
      <no-data v-show="list.length <= 0&&!loading"></no-data>
    </div>
  </div>
</template>

<script>
import { getIndex, grabOrder } from "@/api/data";
import listItem from "./listItem";
import yhHeader from "@/components/header";
import noData from "@/components/noData";
import { List, PullRefresh } from 'vant';

export default {
  name: "grabOrderList",
  components: {
    listItem,
    yhHeader,
    noData,
    vanList: List,
    vanPullRefresh: PullRefresh
  },
  data() {
    return {
      list: [],
      ob: {
        nPage: 1,
      },
      refreshing: false,
      loading: false,
      finished: false
    };
  },
  created() {
    // this.getList();
  },
  mounted() {
  },
  methods: {
    async onRefresh() {
      this.ob.nPage = 1;
      await this.getList({
        refresh: true,
      });
      this.refreshing = false;
      this.loading = false;
    },
    async getList(ops = { refresh: false }) {
      const res = await getIndex({
        nPage: this.ob.nPage,
        nSize: 30,
      });
      if (!res) {
        return;
      }
      const list = res.cdoDebtors;
      this.ob.nPage++;
      if (ops.refresh) {
        this.list = list;
      } else {
        this.list = this.list.concat(list);
      }
      this.loading = false;
      if (list.length <= 0) {
        this.finished = true;
        return;
      }
      if (list.length < 30) {
        this.finished = true;
        return;
      }
    },
    async grabOrder(options, index) {
      const res = await grabOrder(options);
      if (!res) return;
      this.$toast("抢单成功");
      this.list.splice(index, 1);
      this.$nextTick(() => {
        if (this.list.length < 5) {
          this.onRefresh();
        }
      });
      this.$store.commit('changeRefreshFlag', {flag: true});
      return res;
    },
    goSearch() {
      this.$router.push("orderlist/search");
    },
    rClick() {
      TheYHClient.openMapPage();
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
  & > div {
    width: 100%;
  }
  & > div:last-child {
    flex: 1;
  }
  .list-box {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 1px;
  }
}
</style>
