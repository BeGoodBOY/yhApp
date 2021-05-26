<template>
  <van-form @submit="sub" ref="form">
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="picker"
        :value="backTypeText"
        label="还款方式"
        placeholder="点击选择"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择还款方式' }]"
        right-icon="arrow-down"
        input-align="right"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
          :item-height="pickerHeight"
        />
      </van-popup>
      <van-field
        v-model="amount"
        type="number"
        label="提交金额(元)"
        placeholder="请填写提交金额"
        :rules="[{ required: true, message: '请填写正确金额', pattern:/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/}]"
        input-align="right"
      />
      <van-field
        readonly
        clickable
        name="timePicker"
        :value="time"
        label="打款时间"
        placeholder="点击选择"
        @click="showTimePicker = true"
        :rules="[{ required: true, message: '请选择打款时间' }]"
        input-align="right"
        right-icon="arrow-down"
      />
      <van-popup v-model="showTimePicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmTime"
          @cancel="showTimePicker = false"
          :item-height="pickerHeight"
        />
      </van-popup>
      <van-cell-group v-if="backType === 0">
        <van-field name="radio" label="打款方式" input-align="right">
          <template #input>
            <van-radio-group v-model="nRepayType" direction="horizontal">
              <van-radio name="0">转账</van-radio>
              <van-radio name="1">现金汇款</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="bankUserName"
          label="打款人姓名"
          placeholder="请填写打款人姓名"
          :rules="[{ required: true, message: '请填写打款人姓名' }]"
          input-align="right"
        />
        <van-field
          v-if="nRepayType === '0'"
          v-model="bankCardNumber"
          label="打款银行卡号"
          placeholder="请填写打款银行卡号"
          :rules="[{ required: true, message: '请填写打款银行卡号' }]"
          input-align="right"
        />
        <van-field
          v-if="nRepayType === '1'"
          v-model="bankName"
          label="汇款银行"
          placeholder="请填写汇款银行"
          :rules="[{ required: true, message: '请填写汇款银行' }]"
          input-align="right"
        />
      </van-cell-group>
    </van-cell-group>
    <div class="line20"></div>
    <van-cell-group>
      <loading v-show="isUpImging" color="#48a1ff" text-color="#48a1ff">图片上传中...</loading>
      <h3 class="group-tit">上传还款凭证(必填)</h3>
      <van-field
        name="uploader"
        label=""
        :rules="[{ required: true, message: '请上传还款凭证' }]"
      >
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" :max-count="5" :before-delete="beforeDelete"/>
        </template>
      </van-field>
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
import axios from "axios";
import {
  Form,
  Field,
  CellGroup,
  Popup,
  Picker,
  DatetimePicker,
  Uploader,
  Radio,
  RadioGroup,
  Loading
} from "vant";
import { addReminder } from "@/api/data";
import { formatDate, isIOS } from "@/config/utils";
import { upload } from '@/api/upload';

export default {
  name: "repaymented",
  components: {
    vanForm: Form,
    vanField: Field,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
    vanPicker: Picker,
    vanDatetimePicker: DatetimePicker,
    vanUploader: Uploader,
    vanRadio: Radio,
    vanRadioGroup: RadioGroup,
    Loading
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
      columns: [
        { text: "线下还款", value: 0 },
        { text: "线上还款", value: 1 },
      ],
      showPicker: false,
      showTimePicker: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      uploader: [],
      imgArr: [],
      backType: "",
      backTypeText: "",
      amount: "",
      time: "",
      textAreaValue: "",
      nRepayType: "0",
      bankUserName: "",
      bankName: "",
      bankCardNumber: "",
      isUpImging: false
    };
  },
  mounted() {
    // console.log(this.$route.query);
  },
  watch: {
    nRepayType() {
      this.$nextTick(() => {
        this.$refs.form.validate();
      })
    }
  },
  methods: {
    async sub() {
      if(this.isUpImging) {
        this.$toast('图片上传中，请稍等');
        return;
      }
      let para = {
        lDebtorId: this.$route.query.lDebtorId,
        strDebtorName: this.$route.query.strDebtorName,
        nRecordType: this.type,
        nRepayType: this.backType,
        lRepayAmount: this.amount,
        strRemittanceDate: this.time,
        strImgs: this.imgArr.join(","),
        strRemark: this.textAreaValue,
        lEntrustId: this.$route.query.lEntrustId
      };
      if (this.backType === 0) {
        para = Object.assign(para, {
          nRemittanceType: this.nRepayType,
          strRemittanceName: this.bankUserName,
          strRemittanceBank: this.bankName,
          strRemittanceCard: this.bankCardNumber,
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
    onConfirm(ob) {
      console.log(ob);
      this.backType = ob.value;
      this.backTypeText = ob.text;
      this.showPicker = false;
    },
    onConfirmTime(value) {
      console.log(value);
      this.showTimePicker = false;
      this.time = formatDate(value, "yyyy-MM-dd hh:mm");
    },
    async afterRead(file) {
      this.isUpImging = true;
      const res = await upload(file.file);
      this.isUpImging = false;
      if(!res) {
        this.uploader.splice(detail.index, 1);
        return;
      }
      this.imgArr.push(res.strFilePath+res.strFileName);
    },
    beforeDelete(file, detail) {
      this.uploader.splice(detail.index, 1);
      this.imgArr.splice(detail.index, 1);
    }
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
