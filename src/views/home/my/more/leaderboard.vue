<template>
  <div class="ldbd">
    <yh-header @lClick="$router.back()"></yh-header>
    <div>
      <p @click="showPicker=true" class="date-select">{{ formatCrtDate }} <i class="iconfont">&#xe691;</i> </p>
      <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="confirmDate"
        @cancel="showPicker = false"
        :item-height="pickerHeight"
      />
      </van-popup>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(item,index) in list" :key="item.lCollectEmpId">
        <span>{{ index+1 }}</span>
        <span>{{ item.strCollectEmpName }}</span>
        <span>{{ item.strCollectionName }}</span>
        <span class="focus">{{ getFormatMoney(item.lRefundTotal) }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getMLeaderboard } from '@/api/my';
import yhHeader from '@/components/header';
import { formatMoney, isIOS, formatDate } from '@/config/utils';
import { DatetimePicker, Popup } from 'vant';
export default {
  name: 'Leaderboard',
  components: {
    yhHeader,
    vanDatetimePicker: DatetimePicker,
    vanPopup: Popup 
  },
  data() {
    return {
      list: [],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      pickerHeight: isIOS ? '7vw': '',
      showPicker: false,
      formatCrtDate: this.getDisDate(new Date())
    }
  },
  created() {
    this.getList({
      strDate: formatDate(new Date(), "yyyy-MM")
    });
  },
  methods: {
    async getList(options={}) {
      const res = await getMLeaderboard({
        strDate: options.strDate
      });
      if(!res) return;
      this.list = res.cdoList;
    },
    getFormatMoney(val) {
      return formatMoney(val/100)
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    confirmDate(val) {
      console.log(val)
      console.log(formatDate(val, "yyyy-MM"))
      this.getList({strDate: formatDate(val, "yyyy-MM")});
      this.showPicker = false;
      this.formatCrtDate = this.getDisDate(val)
    },
    getDisDate(val) {
      var fmtArr = formatDate(val, "yyyy-MM").split('-');
      return fmtArr[0] + '年' + fmtArr[1] + '月';
    } 
  }
}
</script>
<style lang="scss" scoped>
  @import "@/style/mixin.scss";
  .date-select {
    font-size: 0.28rem;
    // color: #fff;
    line-height: 3em;
    // background: rgba(72, 161, 255, 0.6);
  }
  .list {
    padding: 0 0.32rem;
    .list-item{
      @include flex(baseline);
      font-size: 0.26rem;
      line-height: 3em;
      text-align: left;
      border-top: 1px solid #ccc;
      &:last-child {
        border-bottom: none;
      }
      .focus {
        color: #d06305eb;
        font-weight: bolder;
      }
      span {
        white-space: nowrap;
        overflow: hidden;
        &:first-child {
          width: 0.8rem;
        }
        &:nth-child(2) {
          width: 1.5rem;
        }
        &:nth-child(3) {
          flex: 1;
        }
        &:last-child {
          width: 1.4rem;
          text-align: right;
        }
      }
    }
  }
</style>