<template>
  <div class="home-box">
    <yh-header @lClick="back">
      <template #main>
        <input class="searchInput" type="text" @focus="focusFn" v-model.trim="searchName" placeholder="请输入姓名或手机号或身份证号">
        <i @click="getList" class="iconfont searchIcon">&#xe688;</i>
      </template>
    </yh-header>
    <div class="list-box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :immediate-check='false'>
        <ul class="list">
          <list-item
            v-for="(item, index) in list"
            :key="index"
            :order="item"
            @grab="grabOrder($event,index)"
          ></list-item>
        </ul>
      <no-data v-show="list.length<=0&&nIsGrabbed===0"></no-data>
      <div class="g-box" v-show="list.length<=0&&nIsGrabbed===1">
      <!-- <div > -->
        <div class="top">已被抢单</div>
        <div class="footer">
          <div>催收员：{{ strCollectEmpName.substr(0, 1) + '**' }}</div>
          <div>电话：{{ strCollectEmpMobile.substr(0,2) + '*******' + strCollectEmpMobile.substr(-2,2) }}</div>
        </div>
      </div>
    </van-pull-refresh>
    </div>
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
      nIsGrabbed: 0, // 是否被抢单（cdoDebtors长度为0时提供该参数，0未有单子，1单子被抢）
      strCollectEmpName: '', //抢单业务员姓名
      strCollectEmpMobile: '', //抢单业务员手机
    };
  },
  methods: {
    async onRefresh() {
      this.ob.nPage = 1;
      await this.getList({refresh: true});
      // this.$toast("刷新成功");
      this.isLoading = false;
    },
    async getList(opt={refresh:false}) {
      if(!reg.name.test(this.searchName) && !reg.mobile.test(this.searchName) && !reg.idCard.test(this.searchName)) {
        this.$toast('请输入正确姓名或手机号或身份证号');
        return
      }
      let para = {};
      reg.name.test(this.searchName)&&(para.strName = this.searchName);
      reg.mobile.test(this.searchName)&&(para.strMobile = this.searchName);
      reg.idCard.test(this.searchName)&&(para.strIdentity=this.searchName);

      const res = await getIndex({
        nPage: 1,
        nSize: 10000,
        ...para
      });
      if (!res) return;
      const list = res.cdoDebtors;
      if (list.length < 10) {
        console.log(1)
        if(list.length === 0) {
          console.log(2)
          this.nIsGrabbed = res.nIsGrabbed;
          this.strCollectEmpName = res.strCollectEmpName || '';
          this.strCollectEmpMobile = res.strCollectEmpMobile || '';
          this.list = [];
        }
        this.ob.finished = true;
      }
      this.ob.nPage++;
      this.list = list;
    },
    async grabOrder(options, index) {
      const res = await grabOrder(options);
      if(!res) return;
      this.$toast('抢单成功');
      this.list.splice(index, 1);
      this.$store.commit('changeRefreshFlag', {flag: true})
      return res;
    },
    back() {
      this.$router.back();
    },
    focusFn() {
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
  height: 100%;
  overflow: hidden;
  & > div {
    width: 100%;
  }
  & > div:last-child {
    flex: 1;
  }
  .list-box {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .searchInput {
    width: 5.7rem;
    padding: 0.1rem 0;
    border-radius: 0.3rem;
    text-indent: 0.3rem;
    color: #000;
    vertical-align: middle;
    
  }
  .searchIcon {
    margin-left: 0.2rem;
    font-size: 0.32rem;
  }
  .g-box {
    box-sizing: border-box;
    width: 100%;
    padding: 0.3rem;
    background: #fff;
    .top {
      font-size: 0.32rem;
      line-height: 1rem;
      color: red;
      border-bottom: 1px solid #eee;
    }
    .footer {
      @include flex();
      padding-top: 0.3rem;
      font-size: 0.28rem;
    }
  }
}
</style>
