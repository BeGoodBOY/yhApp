<template>
  <div v-show="show" class="filter-box">
    <div @click="maskClick" class="mask"></div>
    <div class="filter-main">
      <ul class="filter-list">
        <li v-for="(item,index) in list" :key="item.key" @click="itemClick(item.key, index)" class="list-item" :class="{active: item.active}">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { taskOrderFilter } from "@/api/base";
export default {
  name: "popFilter",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: taskOrderFilter,
    };
  },
  methods: {
    itemClick(key, index) {
      this.list.forEach((item,cIndex) => {
        if(cIndex === index) {
          item.active = true;
        }else {
          item.active = false;
        }
      })
      this.$emit('itemClick', key); 
      
    },
    maskClick() {
      this.$emit('maskClick')
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
@import "@/style/var.scss";
.filter-box {
  z-index: 9999;
  @include fixed();
  .mask {
    z-index: 3;
    @include fixed();
    background: $maskColor;
  }
  .filter-main {
    margin-top: calc(constant(safe-area-inset-top)*2);
    margin-top: calc(env(safe-area-inset-top)*2);
    &::after {
      content: '';
      position: absolute;
      top: -0.4rem;
      right: 0.2rem;
      width: 0;
      height: 0;
      border: 0.2rem solid;
      border-color: transparent transparent #fff;
    }
    z-index: 4;
    position: fixed;
    right: 0.2rem;
    top: 1rem;
    display: inline-block;
    background: #fff;
    border-radius: 0.1rem;
    .filter-list {
      .list-item {
        padding: 0 0.3rem;
        font-size: 0.3rem;
        line-height: 3em;
        border-bottom: 1px solid #eee;
        &.active {
          color: $color;
        }
      }
    }
  }
}
</style>
