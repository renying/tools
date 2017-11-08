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
   <mt-popup v-model="popupSearch" position="right" class="mint-popup-3" :modal="false">
     <div class="popdiv">
       <div>
        <mt-field label="业务代码" placeholder="请输入业务代码" type="tel" ></mt-field>
       </div>
       <div>
         <p>短信通道</p>
         <p>
         <select >
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
          <p>{{item.BusinessCode}}</p><p>{{item.BusinessName}}</p><p>{{item.GateName}}</p>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>



<script type="es6">
import {mapGetters} from 'vuex';

export default {
  name: 'tools',
  computed: {
    ...mapGetters([
      'getGateResult',
      'getGateInfo'
    ])
  },
  data () {
    return {
      busdata: '',
      popupSearch: false,
      autoId: 0
    }
  },
  methods: {
    // 点击跳转操作
    handleClick (event) {
      if(!isNaN(event.target.parentNode.firstElementChild.innerHTML)){
        this.$router.push({path: '/justdo/' + event.target.parentNode.firstElementChild.innerHTML});
      }
      else{
        this.$router.push({path: '/justdo/' + event.target.firstElementChild.innerHTML});
      }
    },
    getResult: function () {
      this.$store.dispatch({
          type: 'getResult',
          actionid: 1001,
          aid: 0
      }).then(() => {
        this.getGate();
        var Rcount = this.getGateResult.BusinessList.length - 1;
        this.autoId = this.getGateResult.BusinessList[Rcount].AutoID;
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
            aid: this.autoId
        }).then(() => {
          var Rcount = this.getGateResult.BusinessList.length - 1;
          this.autoId = this.getGateResult.BusinessList[Rcount].AutoID;
        })
      }
    },
    doSearch () {
      this.popupSearch = false;
      this.$toast({
         message: '正在查询...',
         position: 'bottom',
                                duration: 1000
      });
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
