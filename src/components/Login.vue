<template>
<div class="page-swipe">
    <h1 class="page-title">游戏工具手机版</h1>
      <div class="page-part">
        <mt-field label="用户名" placeholder="请输入用户名"  v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <!-- <mt-field label="手机号" placeholder="请输入手机号后四位" type="tel" v-model="mobileno"></mt-field> -->
        <mt-field label="验证码" placeholder="输入验证码" v-model="checkno">
          <!-- <mt-button type="primary" size="small" v-on:click = "btnCaptcha" :disabled="btnStatus">{{txtCaptcha}}</mt-button> -->
        </mt-field>
        </br>
        <mt-button type="primary" size="large" v-on:click = "btnLogin" >登录</mt-button>
      </div>
  </div>
</template>

<script type="es6">
import {mapGetters} from 'vuex';
import GetInfo from '../api/postData.js'

export default {
 computed: {
    ...mapGetters([
    'getUserInfo'
    ])
    },

  name: 'login',
  data () {
    return {
      reGetsec: 29,
      txtCaptcha: "获取验证码",
      btnStatus: false,
      username:"",
      password:"",
      //mobileno:"",
      checkno:""
    }
  },
  methods: {
    btnCaptcha() {
    if(this.username=='' ||this.password==''){
      this.$toast({message: '用户名或密码错误',duration: 1500});
      return;
    }
    if(this.mobileno==''){
      this.$toast({message: '手机号错误',duration: 1500});
      return;
    }
    GetInfo.post({
         actionid: 1004,
         //mobileno: this.mobileno,
         username: this.username,
         password: this.password
        }).then(response => {
        let data =response.data;
        if(data.Code==1){
          this.$toast({message: data.ResultObj.Msg,duration: 1500});
          if(data.ResultObj.Msg == '发送成功') {
            this.setSmsBtn();
          }
        }
        })
    },
    setSmsBtn() {
      this.btnStatus = true;
      if(this.reGetsec>-1){
        setTimeout(() => {
          this.txtCaptcha = "重新发送("+ this.reGetsec +")";
          this.reGetsec-=1;
          this.setSmsBtn();
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
        this.$store.dispatch({
            type: 'loginUser',
            actionid: 1005,
            //uphone: this.mobileno,
            uname: this.username,
            upassword: this.password,
            ucode: this.checkno
        }).then(() =>{
          if(this.getUserInfo && this.getUserInfo.LCode === 0) {
            this.$toast({
              message: '登录成功',
              iconClass: 'mintui mintui-success',
              duration: 1500
            });
            GetInfo.post({actionid: 1009,msg:1});
            this.$router.push({path: '/index'});
          }
          else if (this.getUserInfo.LCode === 1) {
            this.$toast({
              message: '用户名或密码错误',
              iconClass: 'mintui mintui-field-error',
              duration: 1500
            });
          } else if (this.getUserInfo.LCode === 2) {
            this.$toast({
              message: '手机号后四位错误',
              iconClass: 'mintui mintui-field-error',
              duration: 1500
            });
          } else if (this.getUserInfo.LCode === 3) {
            this.$toast({
              message: '验证码错误',
              iconClass: 'mintui mintui-field-error',
              duration: 1500
            });
          }
        })
    }
  }
}

</script>

<style scoped>

</style>
