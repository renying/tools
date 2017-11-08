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
      <mt-field label="业务代码" :placeholder="test.BusinessCode" type="tel" disabled></mt-field>
      <mt-field label="业务名称" :placeholder="test.BusinessName" type="password" disabled></mt-field>
      <mt-field label="原短信通道" :placeholder="test.GateName" type="tel" disabled></mt-field>
    </div>
    <div class="change">
      <p>短信通道更改为</p>
      <p>
        <select >
         <option v-for="item in getGateInfo.GateList" :value="item.GateID">{{item.GateName}}</option>
        </select>
      </p>
      <mt-button v-on:click ="changeClick" size="large" type="primary">确认切换</mt-button>
    </div>
</div>
</template>

<script type="es6">
import {mapGetters} from 'vuex';

export default {
  name: 'gatechange',
 computed: {
    ...mapGetters([
      'getGateInfo'
    ])
  },
  data() {
    return {
      test: {
        AutoID: this.$route.params.bCode,
        BusinessCode: this.$route.params.bCode,
        BusinessName: 'VIP商城密保卡',
        GateName: '浙江云锋新通道'
      }
    }
  },
  methods: {
    changeClick: function () {
      this.$messagebox.confirm('确定执行此操作?', '提示').then(() => {
        this.$toast({
          message: '操作成功',
          iconClass: 'mintui mintui-success',
          duration: 1000
        });
        this.$router.push({path: '/tools'});
      })
    },
    getGate: function () {
      this.$store.dispatch({
        type: 'getGateInfo',
        actionid: 1002
      })
    }
  },
  mounted: function () {
    this.getGate();
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
