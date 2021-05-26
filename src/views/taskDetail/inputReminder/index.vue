<template>
  <div class="home-box" ref="scroller">
    <div>
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
          :item-height="pickerHeight"
        />
      </van-popup>
    </van-cell-group>
    <!-- 已还款 -->
    <repaymented v-show="type === 0" :type="type"></repaymented>
    <!-- 申请减免 -->
    <applyExemption v-show="type === 1" :type="type" :addressList="addressList" :mobileList="mobileList"></applyExemption>
    <!-- 承诺还款 -->
    <promise-repay v-show="type === 2" :type="type" :addressList="addressList" :mobileList="mobileList"></promise-repay>
    <!-- 继续跟踪 -->
    <follow-up v-show="type === 3" :type="type" :addressList="addressList" :mobileList="mobileList"></follow-up>
    <!-- 信息提供 -->
    <add-info v-show="type === 10" :type="type"></add-info>
    <!-- 其他 -->
    <other v-show="type!==0&&type!==1&&type!=1&&type!=2&&type!=3&&type!=10" :type="type"></other>
  </div>
  </div>
</template>

<script>
import { Tab, Tabs, Field, CellGroup, Popup, Picker } from "vant";
import repaymented from "./components/repaymented";
import typeArr from './data/type';
import yhHeader from '@/components/header';
import { queryOrderMobiles } from '@/api/data';
import { getSelfInfo } from '@/api/getDetailData';
import { isIOS } from '@/config/utils';
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
    yhHeader
  },
  data() {
    return {
      typeArr,
      type: 0,
      showPicker: false,
      mobileList: [],
      addressList: [],
      pickerHeight: isIOS ? '7vw': '',
      scroller: null 
    };
  },
  created() {
    this.getMobileList();
    this.getAddressList();
  },
  mounted() {
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
    async getMobileList() {
      const res = await queryOrderMobiles({
        lDebtorId: this.$route.query.lDebtorId
      });
      if(!res) return;
      this.mobileList = res.cdosData;
    },
    async getAddressList() {
      const res = await getSelfInfo({
        lDebtorId: this.$route.query.lDebtorId
      });
      if(!res) return; 
      this.addressList = res.cdosData[0].cdosDebtorAddress;
    },
    onConfirm(ob) {
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
.home-box {
  padding-bottom: 1.4rem;
}

</style>
