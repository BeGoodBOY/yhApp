<template>
  <div class="home-box">
    <yh-header @lClick="back"></yh-header>
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="picker"
        :value="typeText"
        label="请选择"
        placeholder="点击选择"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择类型' }]"
        input-align="right"
        right-icon="arrow-down"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeArr"
          @confirm="onConfirm"
          @cancel="showPicker = false"
          item-height="0.44rem"
        />
      </van-popup>
    </van-cell-group>
    <!-- 已还款 -->
    <repaymented v-show="type === 0" :type="type"></repaymented>
    <!-- 申请减免 -->
    <applyExemption v-show="type === 1" :type="type"></applyExemption>
    <!-- 承诺还款 -->
    <promise-repay v-show="type === 2" :type="type"></promise-repay>
    <!-- 继续跟踪 -->
    <follow-up v-show="type === 3" :type="type"></follow-up>
    <!-- 信息提供 -->
    <add-info v-show="type === 10" :type="type"></add-info>
    <!-- 其他 -->
    <other v-show="type!==0&&type!==1&&type!=1&&type!=2&&type!=3&&type!=10" :type="type"></other>
  </div>
</template>

<script>
import { Tab, Tabs, Field, CellGroup, Popup, Picker } from "vant";
import repaymented from "./components/repaymented";
import typeArr from './data/type'
import FollowUp from './components/followUp.vue';
import yhHeader from '@/components/header'
export default {
  name: "inputReminder",
  components: {
    repaymented,
    applyExemption: () => import(/* webpackChunkName: "applyExemption" */ "./components/applyExemption") ,
    promiseRepay: () => import(/* webpackChunkName: "promiseRepay" */ "./components/promiseRepay") ,
    followUp: () => import(/* webpackChunkName: "followUp" */ "./components/followUp"),
    other: () => import(/* webpackChunkName: "other" */ "./components/other"),
    addInfo: () => import(/* webpackChunkName: "addInfo" */ "./components/addInfo"),
    vanField: Field,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
    vanPicker: Picker,
    FollowUp,
    yhHeader
  },
  data() {
    return {
      typeArr,
      type: 0,
      showPicker: false,
    };
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // console.log(to)
    next()
  },
  computed: {
    typeText: {
      get() {
        return this.typeArr[this.type].text;
      },
      set(){}
    }
  },
  methods: {
    onConfirm(ob) {
      console.log(ob)
      this.type = ob.value;
      this.typeText = ob.text;
      this.showPicker = false;
    },
    back() {
      this.$router.back();
    }
  },
};
</script>
<style lang="scss" scoped>
 @import '@/style/mixin.scss';
.iptRmd-box {
  width: 100%;
  height: 100%;
}
.group-tit {
  padding: 0.32rem;
  font-size: 0.28rem;
  text-align: left;
  color: #646566;
}
.yh-hd {
  @include flex();
  height: 0.86rem;
  font-size: 0.3rem;
  color: #fff;
  background: #48a1ff;
  span {
    flex: 1;
  }
  .yh-hd-l {
    padding-left: 0.2rem;
    text-align: left;
    .iconfont {
      font-size: 0.32rem;
    }
  }
  .yh-hd-r{
    padding-right: 0.2rem;
    font-size: 0.26rem;
    text-align: right;
  }
}

</style>
