<template>
  <van-form @submit="sub">
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="timePicker"
        :value="time"
        label="还款时间"
        placeholder="请选择还款时间"
        @click="showTimePicker = true"
        :rules="[{ required: true, message: '请选择还款时间' }]"
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
          item-height="0.44rem"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="CollectionMethodText"
        label="催收方式"
        placeholder="点击选择"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择催收方式' }]"
        input-align="right"
        right-icon="arrow-down"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
          item-height="0.44rem"
        />
      </van-popup>
    </van-cell-group>
    <div class="line20"></div>
    <van-cell-group>
      <h3 class="group-tit">上传还款评证(必填)</h3>
      <van-field
        name="uploader"
        label=""
        :rules="[{ required: true, message: '请上传还款凭证' }]"
      >
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" :before-delete="beforeDelete"/>
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
    <!-- <button class="btn-btm" type="submit">提交</button> -->
  </van-form>
</template>

<script>
import {
  Form,
  Field,
  CellGroup,
  Popup,
  Picker,
  Uploader,
  DatetimePicker,
} from "vant";
import { addReminder } from "@/api/data";
import { formatDate } from '@/config/utils';
import { upload } from '@/api/upload'
export default {
  name: "applyExemption",
  components: {
    vanForm: Form,
    vanField: Field,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
    vanPicker: Picker,
    vanUploader: Uploader,
    vanDatetimePicker: DatetimePicker,
  },
  props: {
    type: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      columns: [
        { text: "外访", value: 0 },
        { text: "电话", value: 1 },
      ],
      showPicker: false,
      uploader: [],
      amount: "",
      textAreaValue: "",
      CollectionMethod: '',
      CollectionMethodText: '',
      showTimePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      time: '',
      imgArr: []
    };
  },
  mounted() {
  },
  methods: {
    async sub() {
      let para = {
        lDebtorId: this.$route.query.lDebtorId,
        strDebtorName: this.$route.query.strDebtorName,
        nRecordType: this.type,
        strPromiseDate: this.time,
        nCollectionWay: this.CollectionMethod,
        strImgs: this.imgArr.join(","),
        strRemark: this.textAreaValue,
        lEntrustId: this.$route.query.lEntrustId
      };

      const res = await addReminder(para);
      if(!res) return;
      this.$toast('提交成功');
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
      this.CollectionMethod = ob.value;
      this.CollectionMethodText = ob.text;
      this.showPicker = false;
    },
    onConfirmTime(value) {
      console.log(value);
      this.showTimePicker = false;
      this.time = formatDate(value, "yyyy-MM-dd hh:mm");
    },
    async afterRead(file) {
      const res = await upload(file.file);
      if(!res) return;
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
