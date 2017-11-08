<template>
<div class="page-swipe">
    <h1 class="page-title">游戏工具手机版</h1>
    <p class="page-swipe-desc">短信通道切换</p>
    <mt-swipe ref="swipe" class="swipe" :auto="0">
      <mt-swipe-item class="slide1"  @click.native="openOne">单个业务短信通道切换</mt-swipe-item>
      <mt-swipe-item class="slide1"  @click.native="openMore">批量通道切换</mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script type="es6">

export default {
  name: 'index',
   methods: {
    openOne() {
      this.$router.push({path: '/tools'});
    },
    openMore() {
      this.$router.push({path: '/login'});
    }
   }
}

</script>



<style scoped>
    .page-swipe-desc {
      text-align: center;
      color: #666;
      margin-bottom: 5px;
    }
    .mint-swipe {
      height: 200px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
    .mint-swipe-item {
      line-height: 200px;
    }
    .slide1 {
      background-color: #0089dc;
      color: #fff;
    }

</style>
