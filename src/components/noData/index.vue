<template>
  <div class="nodata-box">
    <i class="iconfont">&#xe644;</i>
    <p class="nodata-text">暂无数据</p>
  </div>
</template>

<script>
export default {
  name: "noData",
  props: {
    
  },
};
</script>
<style lang="scss" scoped>
.nodata-box {
  color: #999;
  padding-top: 2rem;
  .iconfont {
    font-size: 1.6rem;
  }
  .nodata-text {
    margin-top: 0.2rem;
    font-size: 0.28rem;
  }
}
</style>
