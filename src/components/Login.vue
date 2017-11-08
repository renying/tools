<template>
<div class="page-swipe">
    <h1 class="page-title">游戏工具手机版</h1>
      <div class="page-part">
        <mt-field label="用户名" placeholder="请输入用户名" type="tel" ></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" ></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号后四位" type="tel" ></mt-field>
        <mt-field label="验证码" placeholder="输入验证码">
          <mt-button type="primary" size="small" v-on:click = "btnCaptcha" :disabled="btnStatus">{{txtCaptcha}}</mt-button>
        </mt-field>
        </br>
        <mt-button type="primary" size="large" v-on:click = "btnLogin" >登录</mt-button>
      </div>
  </div>
</template>

<script type="es6">

export default {
  name: 'login',
  data () {
    return {
      reGetsec: 29,
      txtCaptcha: "获取验证码",
      btnStatus: false
    }
  },
  methods: {
    btnCaptcha() {
      this.btnStatus = true;
      if(this.reGetsec>-1){
        setTimeout(() => {
          this.txtCaptcha = "重新发送("+ this.reGetsec +")";
          this.reGetsec-=1;
          this.btnCaptcha();
        }, 1000);
      }
      else {
        this.reGetsec = 29;
        this.btnStatus = false;
        this.txtCaptcha = "重新发送";
        return;
      }
    },
    btnLogin() {
      this.$router.push({path: '/index'});
    }
  }
}

</script>

<style scoped>

</style>
