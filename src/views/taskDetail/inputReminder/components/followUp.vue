<template>
  <van-form @submit="sub">
    <van-cell-group>
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
          :item-height="pickerHeight"
        />
      </van-popup>
      <template v-if="this.CollectionMethod === 0">
        <van-field
          readonly
          clickable
          name="picker"
          :value="addressOb.value"
          label="催收地址"
          placeholder="点击选择"
          @click="addressOb.showPicker = true"
          :rules="[{ required: true, message: '请选择催收地址' }]"
          input-align="right"
          right-icon="arrow-down"
        />
        <van-popup v-model="addressOb.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="cAddressList"
            @confirm="onConfirmOb($event, addressOb, true)"
            @cancel="addressOb.showPicker = false"
            :item-height="pickerHeight"
          />
        </van-popup>
        <div class="line-item">
          <div class="line-item-l">GPS位置核验</div>
          <div class="line-item-r warn">{{ gpsText }}</div>
        </div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="visitState.text"
          label="外访情况"
          placeholder="点击选择"
          @click="visitState.showPicker = true"
          :rules="[{ required: true, message: '请选择外访情况' }]"
          input-align="right"
          right-icon="arrow-down"
        />
        <van-popup v-model="visitState.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="visitState.list"
            @confirm="onConfirmVisitState"
            @cancel="visitState.showPicker = false"
            :item-height="pickerHeight"
          />
        </van-popup>
      </template>
      <template v-if="this.CollectionMethod === 1">
        <van-field
          readonly
          clickable
          name="picker"
          :value="mobileListOb.text"
          label="拨打电话"
          placeholder="点击选择"
          @click="mobileListOb.showPicker = true"
          :rules="[{ required: true, message: '请选择电话' }]"
          input-align="right"
          right-icon="arrow-down"
        />
        <van-popup v-model="mobileListOb.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="cMobileList"
            @confirm="onConfirmOb($event, mobileListOb)"
            @cancel="mobileListOb.showPicker = false"
            :item-height="pickerHeight"
          />
        </van-popup>
        <!-- <div class="line-item">
          <div class="line-item-l">电话记录核验</div>
          <div class="line-item-r warn">不通过</div>
        </div> -->
        <van-field
          readonly
          clickable
          name="picker"
          :value="mobileState.text"
          label="拨打情况"
          placeholder="点击选择"
          @click="mobileState.showPicker = true"
          :rules="[{ required: true, message: '请选择拨打情况' }]"
          input-align="right"
          right-icon="arrow-down"
        />
        <van-popup v-model="mobileState.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="mobileState.list"
            @confirm="onConfirmMobileState"
            @cancel="mobileState.showPicker = false"
            :item-height="pickerHeight"
          />
        </van-popup>
      </template>
    </van-cell-group>
    <div class="line20"></div>
    <van-cell-group>
      <loading v-show="isUpImging" color="#48a1ff" text-color="#48a1ff">图片上传中...</loading>
      <h3 class="group-tit">上传催收图片(必填)</h3>
      <van-field
        name="uploader"
        label=""
        :rules="[{ required: true, message: '请上传还款凭证' }]"
      >
        <template #input>
          <van-uploader
            v-model="uploader"
            :after-read="afterRead"
            :before-delete="beforeDelete"
          />
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
import { Form, Field, CellGroup, Popup, Picker, Uploader, Loading } from "vant";
import { addReminder } from "@/api/data";
import { upload } from "@/api/upload";
import { adressType } from "@/api/base";
import { mobileStateArr, visitStateArr } from './data';
import { mDistanceToSw } from "@/native";
import distanceTip from './distanceTip';
import { isIOS } from '@/config/utils';
export default {
  name: "followUp",
  components: {
    vanForm: Form,
    vanField: Field,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
    vanPicker: Picker,
    vanUploader: Uploader,
    Loading
  },
  props: {
    type: {
      type: Number,
      require: true,
    },
    mobileList: {
      type: Array,
      require: true,
    },
    addressList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      pickerHeight: isIOS ? '7vw': '',
      columns: [
        { text: "外访", value: 0 },
        { text: "电话", value: 1 },
      ],
      showPicker: false,
      uploader: [],
      amount: "",
      textAreaValue: "",
      CollectionMethod: "",
      CollectionMethodText: "",
      imgArr: [],
      addressOb: {
        showPicker: false,
        value: "",
        text: "",
      },
      mobileListOb: {
        showPicker: false,  
        value: "",
        text: "",
      },
      mobileState: {
        list: mobileStateArr,
        showPicker: false,  
        value: "",
        text: "", 
        nAnswer: '', //是否接听 0未接通 1接通
        nCallSituation: '', //拨打情况 0称不认识客户1称非本人2同意转达客户3拒绝转达客户4其他5拒听6忙线7空号8关机9停机
      },
      visitState: {
        list: visitStateArr,
        showPicker: false,  
        value: "",
        text: "", 
        nFound: '', //是否找到人 0找不到人 1找到人
        nSituation: '', //拨打情况 0称不认识客户1称非本人2同意转达客户3拒绝转达客户4其他5拒听6忙线7空号8关机9停机
      },
      distanceFlag: false,
      isUpImging: false
    };
  },
  computed: {
    cAddressList() {
      return this.addressList.map((item) => ({
          text: adressType[item.nType] + ':' + item.strAddress,
          value: adressType[item.nType],
          longitude: item.strLongitude,
          latitude: item.strLatitude
        }))
    },
    gpsText() {
      return  this.distanceFlag ? '通过' : '不通过'
    },
    cMobileList() {
      return this.mobileList.map((item) => ({
          text: `${item.strRelation}(${item.strRealName})${item.strMobile}`,
          value: item.strMobile,
        }))
    }

  },
  methods: {
    async sub() {
      if(this.isUpImging) {
        this.$toast('图片上传中，请稍等');
        return;
      }
      if(this.CollectionMethod === 0) { //距离校验
        if(!this.distanceFlag) {
          distanceTip();
          return ;
        }
      }
      let para = {
        lDebtorId: this.$route.query.lDebtorId,
        strDebtorName: this.$route.query.strDebtorName,
        nRecordType: this.type,
        nCollectionWay: this.CollectionMethod,
        strImgs: this.imgArr.join(","),
        strRemark: this.textAreaValue,
        lEntrustId: this.$route.query.lEntrustId,
        strAddress: this.addressOb.text,
        nFound: this.visitState.nFound,
        nSituation: this.visitState.nSituation,
        nAnswer: this.mobileState.nAnswer,
        nCallSituation: this.mobileState.nCallSituation,  
        // nRelationship: ,
        strCallNumber: this.mobileListOb.text,
      };

      const res = await addReminder(para);
      if (!res) return;
      this.$toast("提交成功");
      this.$store.commit('changeRefreshFlag', {flag: true});
      this.$router.replace({
        path: "/tasklist/taskdetail",
        query: {
          lDebtorId: this.$route.query.lDebtorId,
          strDebtorName: this.$route.query.strDebtorName,
          lEntrustId: this.$route.query.lEntrustId,
        },
      });
    },
    onConfirmVisitState(arr1, arr2) {
      this.visitState.text = arr1.join(' ');
      this.visitState.nFound = visitStateArr[arr2[0]].value;
      this.visitState.nSituation = visitStateArr[arr2[0]].children[arr2[1]].value;
      this.visitState.showPicker = false;
    },
    onConfirmMobileState(arr1, arr2) {
      this.mobileState.text = arr1.join(' ');
      this.mobileState.nAnswer = mobileStateArr[arr2[0]].value;
      this.mobileState.nCallSituation = mobileStateArr[arr2[0]].children[arr2[1]].value;
      this.mobileState.showPicker = false;
    },
    onConfirmOb(ob, paraOb, address=false) {
      paraOb.text = ob.text;
      paraOb.value = ob.value;
      console.log(ob.value)
      paraOb.showPicker = false;
      if(address) {
        const distance = mDistanceToSw({latitude: ob.latitude,longitude:ob.longitude});
        if(distance > 1000) { //
          this.distanceFlag = false;
        }else {
          this.distanceFlag = true;
        }
      }
    },
    onConfirm(ob) {
      this.CollectionMethod = ob.value;
      this.CollectionMethodText = ob.text;
      this.showPicker = false;
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
@import "@/style/mixin.scss";
.group-tit {
  padding: 0.32rem;
  font-size: 0.28rem;
  text-align: left;
  color: #646566;
}
.line-item {
  @include flex();
  padding: 0.2rem 0.32rem;
  font-size: 0.28rem;
  color: #646566;
  line-height: 0.48rem;
}
</style>
