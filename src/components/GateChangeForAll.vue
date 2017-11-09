<template>
 <div>
     <div class="change">
       <p>修改前的通道(1)</p>
       <p>
         <select v-model="selOne" @change="selChange">
          <option v-for="item in getGateInfo.GateList" :value="item.GateID" >{{item.GateName}}</option>
         </select>
       </p>
     </div>
     <div class="change2">
       <p>修改后的通道(2)</p>
       <p>
         <select v-model="selTwo">
          <option v-for="item in getGateInfo.GateList" :value="item.GateID">{{item.GateName}}</option>
         </select>
       </p>
     </div>
     <mt-button v-on:click ="changeClick" size="large" type="primary">确认切换</mt-button>

     <mt-loadmore >
       <ul >
         <li style="font-weight:bold">
           <p >业务代码</p><p>业务名称</p><p>短信通道</p>
         </li>
         <li  v-for="item in getGateResult.BusinessList">
           <p >{{item.BusinessCode}}</p><p>{{item.BusinessName}}</p><p>{{item.GateName}}</p>
           <p style="display:none;" >{{item}}</p>
         </li>
         <li v-if="getGateResult.BusinessList.length==0">无数据</li>
       </ul>
     </mt-loadmore>
 </div>
 </template>


<script type="es6">
import {mapGetters} from 'vuex';

export default {
  name: 'gateforall',
  computed: {
    ...mapGetters([
      'getGateResult',
      'getGateInfo',
      'getReload',
      'getUserInfo'
    ])
  },
  data() {
    return {
      selOne: 0,
      selTwo: 0,
      autoId: 0
    }
  },
  methods: {
    changeClick: function () {

    },
    getResult: function () {
      this.$store.dispatch({
          type: 'getResult',
          actionid: 1001,
          aid: 0,
          gateid: this.selOne
      }).then(() => {
        this.checkLogin();
        var Rcount = this.getGateResult.BusinessList.length - 1;
        if(Rcount > -1){
          this.autoId = this.getGateResult.BusinessList[Rcount].AutoID;
         }
      })
    },
    getGate: function () {
      this.$store.dispatch({
        type: 'getGateInfo',
        actionid: 1002
      }).then(() => {
      })
    },
    // 处理上拉自动加载
    handleScroll () {
      var currentHeight = document.body.clientHeight - document.documentElement.clientHeight -150;
      if(window.scrollY>currentHeight && this.getGateResult.NeedGet) {
        this.$store.dispatch({
            type: 'loadMoreResult',
            actionid: 1001,
            aid: this.autoId,
            gateid: this.selOne
        }).then(() => {
          this.checkLogin();
          var Rcount = this.getGateResult.BusinessList.length - 1;
          this.autoId = this.getGateResult.BusinessList[Rcount].AutoID;
        })
      }
    },
    checkLogin () {
       if(!this.getReload && (typeof(this.getUserInfo) === 'undefined' || typeof(this.getUserInfo.LCode) ==='undefined')) {
         this.$toast({
           message: '登录失效',
           iconClass: 'mintui mintui-field-error',
           duration: 1500
         });
         //this.$router.push({path: '/login'});
      }
      else if (typeof(this.getUserInfo) === 'undefined' || typeof(this.getUserInfo.LCode) ==='undefined'){
        // todo 需要请求服务端来判断用户是否登录
      }
    },
    selChange: function () {
      this.getResult();
    }

  },
   mounted: function () {
    this.getGate();
    window.addEventListener('scroll', this.handleScroll);
   }
}
</script>



<style lang="css">
  .change, .change2 {
    float: left;
    width: 100%;
  }
  .change p,.change2 p{
    margin-left:15px;
    float: left;
  }
  .change p:nth-child(2),.change2 p:nth-child(2) {
    width:50%;
  }
  .change select,.change2 select {
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
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    width: 100%;
  }

  li p {
    float: left;
    text-align: center;
    padding-left: 10px;
  }
  li p:nth-child(1) {
    width:20%;
  }
  li p:nth-child(2) {
    width:38%;
  }
  li p:nth-child(3) {
    width:32%;
  }
  ul li:nth-of-type(odd){
    background:#AFEEEE;
  }
</style>
