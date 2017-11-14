<template>
  <div class="tools">
  <mt-header title="业务列表">
    <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button @click.native="popupSearch = true" slot="right">查询条件</mt-button>
  </mt-header>
  <div class="btn">

   </div>
   <mt-popup v-model="popupSearch" position="right" class="mint-popup-3">
     <div class="popdiv">
       <div>
        <mt-field label="业务代码" placeholder="请输入业务代码" type="tel" v-model="txtcode"></mt-field>
       </div>
       <div>
         <p>短信通道</p>
         <p>
         <select v-model="selected">
          <option v-for="item in getGateInfo.GateList" :value="item.GateID">{{item.GateName}}</option>
         </select>
         </p>
       </div>
       <mt-button @click.native="doSearch"  type="primary">查询</mt-button>
        <mt-button @click.native="popupSearch = false"  type="primary">返回</mt-button>
     </div>
   </mt-popup>
    <mt-loadmore >
      <ul >
        <li style="font-weight:bold">
          <p >业务代码</p><p>业务名称</p><p>短信通道</p>
        </li>
        <li v-on:click="handleClick" v-for="item in getGateResult.BusinessList">
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
import GetInfo from '../api/postData.js'

export default {
  name: 'tools',
  computed: {
    ...mapGetters([
      'getGateResult',
      'getGateInfo',
      'getReload',
      'getUserInfo'
    ])
  },
  data () {
    return {
      busdata: '',
      popupSearch: false,
      autoId: 0,
      selected: 0,
      txtcode: '',
      isgetdata:true
    }
  },
  methods: {
    // 点击跳转操作
    handleClick (event) {
      var jdata;
      if(!isNaN(event.target.parentNode.firstElementChild.innerHTML)){
        jdata= JSON.parse(event.target.parentNode.lastElementChild.innerHTML);
      }
      else{
        jdata= JSON.parse(event.target.lastElementChild.innerHTML);
      }
      GetInfo.post({actionid: 1009,msg:4});
      this.$router.push({path: '/justdo/' + jdata.AutoID +'/' + jdata.BusinessCode + '/' + encodeURIComponent(jdata.BusinessName) + '/' + encodeURI(jdata.GateName)});
    },
    getResult: function () {
      this.$store.dispatch({
          type: 'getResult',
          actionid: 1001,
          aid: 0,
          bcode: this.txtcode,
          gateid: this.selected
      }).then(() => {
        this.checkLogin();
        this.getGate();
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
        if(this.isgetdata){
          this.isgetdata =false;
          this.$store.dispatch({
              type: 'loadMoreResult',
              actionid: 1001,
              aid: this.autoId,
              bcode: this.txtcode,
              gateid: this.selected
          }).then(() => {
            this.isgetdata=true;
            this.checkLogin();
            var Rcount = this.getGateResult.BusinessList.length - 1;
            this.autoId = this.getGateResult.BusinessList[Rcount].AutoID;
          })
        }
      }
    },
    doSearch () {
      this.getResult();
      this.popupSearch = false;
      this.$toast({
         message: '正在查询...',
         position: 'bottom',
         duration: 1000
      });
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
    this.getResult();
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
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


.btn .mint-button {
  margin-top: 20px;
}
.mint-popup-3 {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.mint-popup-3 .popdiv {
  padding-top: 50px;
}
.mint-popup-3 .popdiv div {
  width:100%;
  float: left;
}
.mint-popup-3 .popdiv div p{
  float: left;
  margin-left:30px;
}
.popdiv p:nth-child(2) {
    width:50%;
  }
.popdiv select {
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
.mint-popup-3 .mint-button {
  width: 30%;
}

</style>
