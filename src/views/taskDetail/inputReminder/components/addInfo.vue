<template>
  <van-form @submit="sub">
    <div class="line20"></div>
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="picker"
        :value="relation.text"
        label="与客户关系"
        placeholder="请选择"
        @click="relation.showPicker = true"
        :rules="[{ required: true, message: '请选择与客户关系' }]"
        input-align="right"
        right-icon="arrow-down"
      />
      <van-popup v-model="relation.showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm($event, relation)"
          @cancel="showPicker = false"
          item-height="0.44rem"
        />
      </van-popup>
    </van-cell-group>
    <div class="line20"></div>
    <div class="item-block">
      <div class="item-list">
        <div class="item-l">
          <span>联系方式</span>
        </div>
        <div class="item-r">
          <span>
            <i @click="addRow(contact)" class="iconfont">&#xe636;</i>
          </span>
        </div>
      </div>
      <div
        class="item-list"
        v-for="(item, index) in contact.arr"
        :key="contact.tag + index"
      >
        <div class="item-l">
          <span @click="item.showPicker=true" class="label dropdown">{{ contact.columns[item.value].text }}</span>
          <van-popup v-model="item.showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="contact.columns"
              @confirm="onConfirm($event,item)"
              @cancel="item.showPicker = false"
              item-height="0.44rem"
            />
          </van-popup>
          <input
            class="l-input"
            type="number"
            v-model="item.inputValue"
            placeholder="请输入联系方式"
          />
        </div>
        <div class="item-r">
          <span>
            <i @click="contact.arr.splice(index, 1)" class="iconfont icon-red"
              >&#xe600;</i
            >
          </span>
        </div>
      </div>
    </div>
    <div class="line20"></div>
    <div class="item-block">
      <div class="item-list">
        <div class="item-l">
          <span>地址</span>
        </div>
        <div class="item-r">
          <span>
            <i @click="addRow(address)" class="iconfont">&#xe636;</i>
          </span>
        </div>
      </div>
      <div
        class="item-list"
        v-for="(item, index) in address.arr"
        :key="address.tag + index"
      >
        <div class="item-l">
          <span @click="item.showPicker=true" class="label dropdown">{{ address.columns[item.value].text }}</span>
          <van-popup v-model="item.showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="address.columns"
              @confirm="onConfirm($event,item)"
              @cancel="item.showPicker = false"
              item-height="0.44rem"
            />
          </van-popup>
          <input
            class="l-input"
            type="text"
            placeholder="请输入地址"
            v-model="item.inputValue"
          />
        </div>
        <div class="item-r">
          <span>
            <i @click="address.arr.splice(index, 1)" class="iconfont icon-red"
              >&#xe600;</i
            >
          </span>
        </div>
      </div>
    </div>
    <div class="line20"></div>
    <div class="item-block">
      <div class="item-list">
        <div class="item-l">
          <span>社交账号</span>
        </div>
        <div class="item-r">
          <span>
            <i @click="addRow(social)" class="iconfont">&#xe636;</i>
          </span>
        </div>
      </div>
      <div
        class="item-list"
        v-for="(item, index) in social.arr"
        :key="social.tag + index"
      >
        <div class="item-l">
          <span @click="item.showPicker=true" class="label dropdown">{{ social.columns[item.value].text }}</span>
          <van-popup v-model="item.showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="social.columns"
              @confirm="onConfirm($event,item)"
              @cancel="item.showPicker = false"
              item-height="0.44rem"
            />
          </van-popup>
          <input
            class="l-input"
            type="text"
            placeholder="请输入社交账号"
            v-model="item.inputValue"
          />
        </div>
        <div class="item-r">
          <span>
            <i @click="social.arr.splice(index, 1)" class="iconfont icon-red"
              >&#xe600;</i
            >
          </span>
        </div>
      </div>
    </div>
    <input class="btn-btm-large" type="submit" value="提交" />
  </van-form>
</template>

<script>
import { Form, Field, CellGroup, Popup, Picker } from "vant";
import { addReminder } from "@/api/data";
import * as dropData from "./data";
export default {
  name: "addInfo",
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
      columns: dropData.relationArr,
      showPicker: false,
      relation: {
        value: "",
        text: "",
        showPicker: false,
      },
      contact: {
        tag: "contact",
        columns: dropData.contactTypeArr,
        arr: [
          // {
          //   value: 0,
          //   text: "",
          //   showPicker: false,
          //   inputValue: "",
          // },
        ],
      },
      address: {
        tag: "address",
        columns: dropData.addressTypeArr,
        arr: [
          // {
          //   value: 0,
          //   text: "",
          //   showPicker: false,
          //   inputValue: "",
          // },
        ],
      },
      social: {
        tag: "social",
        columns: dropData.socialTypeArr,
        arr: [
          // {
          //   value: 0,
          //   text: "",
          //   showPicker: false,
          //   inputValue: "",
          // },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    async sub() {
      let para = {
        lDebtorId: this.$route.query.lDebtorId,
        strDebtorName: this.$route.query.strDebtorName,
        nRecordType: this.type,
        nRelationship: this.relation.value,
        lEntrustId: this.$route.query.lEntrustId
      };
      if(this.contact.arr.length) {
        para = Object.assign(para, {
          cdosContract: this.contact.arr.map(item => {
            return { nContactType: item.value, strContact: item.inputValue }
          })
        });
      }
      if(this.address.arr.length) {
        para = Object.assign(para, {
          cdosAddress: this.address.arr.map(item => {
            return { nAddressType: item.value, strAddress: item.inputValue }
          })
        });
      }
      if(this.social.arr.length) {
        para = Object.assign(para, {
          cdosSocial: this.social.arr.map(item => {
            return { nSocialType: item.value, strSocial: item.inputValue }
          })
        });
      }

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
    onConfirm(ob, item) {
      console.log(ob);
      item.value = ob.value;
      item.text = ob.text;
      item.showPicker = false;
    },
    addRow(ob) {
      ob.arr.push({
        value: 0,
        text: "",
        showPicker: false,
        inputValue: "",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
@import "@/style/var.scss";
.item-block {
  font-size: 0.28rem;
  color: #323233;
  line-height: 0.48rem;
  background: #fff;
  .item-list {
    & + .item-list {
      border-top: 1px solid #eee;
    }
    @include flex();
    padding: 0.2rem 0.32rem;
    .item-l {
      flex: 1;
      -webkit-flex: 1;
      color: #646566;
      text-align: left;
      .label {
        position: relative;
        display: inline-block;
        width: 1.4rem;
        &.dropdown::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.04rem;
          border: 0.08rem solid;
          border-color: #aaa transparent transparent transparent;
        }
      }
      .l-input {
        width: 4.4rem;
        text-indent: 0.3rem;
      }
    }
    .item-r {
      .iconfont {
        font-size: 0.32rem;
        color: $color;
        &.icon-red {
          color: red;
        }
      }
    }
  }
}
</style>