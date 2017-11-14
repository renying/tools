<template>
 <div>
    <div class="page-header-main">
      <mt-header title="更换短信通道">
        <router-link to="/tools" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
      </mt-header>
    </div>
    <div class="page-part">
      <mt-field label="业务代码" :placeholder="bInfo.BusinessCode" type="tel" disabled></mt-field>
      <mt-field label="业务名称" :placeholder="bInfo.BusinessName" type="password" disabled></mt-field>
      <mt-field label="原短信通道" :placeholder="bInfo.GateName" type="tel" disabled></mt-field>
    </div>
    <div class="change">
      <p>短信通道更改为</p>
      <p>
        <select v-model="selected">
         <option v-for="item in getGateInfo.GateList" :value="item.GateID">{{item.GateName}}</option>
        </select>
      </p>
      <mt-button v-on:click ="changeClick" size="large" type="primary">确认切换</mt-button>
    </div>
</div>
</template>

<script type="es6">
import {mapGetters} from 'vuex';
import GetInfo from '../api/postData.js'

export default {
  name: 'gatechange',
  computed: {
    ...mapGetters([
      'getGateInfo',
      'getUserInfo'
    ])
  },
  data() {
    return {
      selected: 0,
      bInfo: {
        AutoID: this.$route.params.a,
        BusinessCode: this.$route.params.b,
        BusinessName: this.$route.params.c,
        GateName: this.$route.params.d
      }
    }
  },
  methods: {
    changeClick: function () {
      if(this.selected==0){
        this.$messagebox.alert('请选择切换通道','错误');
        return;
      }
      this.$messagebox.confirm('确定执行此操作?', '提示').then(() => {
        GetInfo.post({
          actionid: 1006,
          aid: this.bInfo.AutoID,
          gateid: this.selected
        }).then(response => {
          let data =response.data;
          if(data.Code==1){
            this.$toast({
              message: '操作成功',
              iconClass: 'mintui mintui-success',
              duration: 1000
            });
            this.$router.push({path: '/tools'});
          }
        });
      })
    },
    checkLogin () {
      // 刷新后，判断用户登录情况
      if(!this.getReload && (typeof(this.getUserInfo) === 'undefined' || typeof(this.getUserInfo.LCode) ==='undefined')) {
        this.$store.dispatch({ type: 'checkLoginUser' }).then( res =>{
          if(res.Code ===1 && res.ResultObj && res.ResultObj.LCode === 0) {
            this.getUserInfo = res.ResultObj;
          }
          else {
            this.$toast({
              message: '登录失效',
              iconClass: 'mintui mintui-field-error',
              duration: 1500
            });
            this.$router.push({path: '/login'});
          }
        });
      }
      else if (typeof(this.getUserInfo) === 'undefined' || typeof(this.getUserInfo.LCode) ==='undefined'){
        this.$store.dispatch({ type: 'checkLoginUser' }).then( res =>{
          if(res.Code ===1 && res.ResultObj && res.ResultObj.LCode === 0) {
          } else {
            this.$toast({
              message: '登录失效',
              iconClass: 'mintui mintui-field-error',
              duration: 1500
            });
            this.$router.push({path: '/login'});
          }
        });
      }
    }
  },
  mounted: function () {
    this.checkLogin();
  }
}

</script>



<style lang="css">
  @component-namespace page {
    @component header {
      @descendent main {
        margin-top: 50px;
        min-height: 120vh;
        > * {
          margin-bottom: 15px;
        }
      }
    }
  }
  .change p{
    float: left;
    margin-left:15px;
  }
  .change p:nth-child(2) {
    width:50%;
  }
  .change select {
      border: 0 !important;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: url('../assets/arrow.png') no-repeat;
      background-position: 100% 50%;
      width: 100%;
      text-indent: 0.01px;
      text-overflow: "";
      color: #1455a2;
      font-size:15px;
  }
</style>
