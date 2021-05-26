<template>
  <van-form @submit="sub">
    <div class="line20" v-if="type===15"></div>
    <van-cell-group v-if="type===13">
      <van-field
        readonly
        clickable
        name="picker"
        :value="refuseReason.text"
        label="拒绝还款原因"
        placeholder="请选择"
        @click="refuseReason.showPicker = true"
        :rules="[{ required: true, message: '请选择拒绝还款原因' }]"
        input-align="right"
        right-icon="arrow-down"
      />
      <van-popup v-model="refuseReason.showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="refuseReason.arr"
          @confirm="onConfirm($event, refuseReason)"
          @cancel="refuseReason.showPicker = false"
          :item-height="pickerHeight"
        />
      </van-popup>
    </van-cell-group>
    <div class="line20"></div>
    <van-cell-group>
      <van-field
        v-model="textAreaValue"
        rows="4"
        autosize
        label=""
        type="textarea"
        maxlength="120"
        placeholder="备注(选填)"
        show-word-limit
      />
    </van-cell-group>
    <input class="btn-btm-large" type="submit" value="提交" />
  </van-form>
</template>
<script>
import {
  Form,
  Field,
  CellGroup,
  Popup,
  Picker
} from "vant";
import { addReminder } from "@/api/data";
import { refuseReasonArr } from "./data.js";
import { isIOS } from '@/config/utils';
export default {
  name: "other",
  components: {
    vanForm: Form,
    vanField: Field,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
    vanPicker: Picker,
  },
  props: {
    type: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      pickerHeight: isIOS ? '7vw': '',
      textAreaValue: "",
      refuseReason: {
        arr: refuseReasonArr,
        value: '',
        text: '',
        showPicker: false
      }
    };
  },
  methods: {
    async sub() {
      let para = {
        lDebtorId: this.$route.query.lDebtorId,
        strDebtorName: this.$route.query.strDebtorName,
        strRemark: this.textAreaValue,
        nRecordType: this.type,
        lEntrustId: this.$route.query.lEntrustId
      };
      if(this.type === 13) {
        para = Object.assign(para, {
          nRefuseReason: this.refuseReason.value
        });
      }
      const res = await addReminder(para);
      if(!res) return;
      this.$toast('提交成功');
      this.$store.commit('changeRefreshFlag', {flag: true});
      this.$router.replace({
        path: "/tasklist/taskdetail",
        query: {
          lDebtorId: this.$route.query.lDebtorId,
          strDebtorName: this.$route.query.strDebtorName,
          lEntrustId: this.$route.query.lEntrustId
        }
      });
    },
    onConfirm(ob, item) {
      item.value = ob.value;
      item.text = ob.text;
      item.showPicker = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.group-tit {
  padding: 0.32rem;
  font-size: 0.28rem;
  text-align: left;
  color: #646566;

}
</style>
