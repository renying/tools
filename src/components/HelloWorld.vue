<template>

  <div class="hello">
    <mt-loadmore >
      <ul >
        <li >
          <p>业务代码</p><p>业务名称</p><p>短信通道</p>
        </li>
        <li v-on:click="handleClick" v-for="item in busdata.ResultObj.BusinessList">
          <p>{{item.BusinessCode}}</p><p>{{item.BusinessName}}</p><p>{{item.GateName}}</p>
        </li>
      </ul>
    </mt-loadmore>
  </div>

</template>



<script type="es6">
import gateinfo from '../api/postData.js'

export default {
  name: 'HelloWorld',
  methods: {
    onValuesChange (picker, values) {
      //gate.getGateInfo();
    },
    handleClick (event) {

      if(!isNaN(event.target.parentNode.firstElementChild.innerHTML)){
        alert(event.target.parentNode.firstElementChild.innerHTML);
      }
      else{
        alert(event.target.firstElementChild.innerHTML);
      }
    }
  },
  data () {
    return {
      busdata: ''
    }
  },
  mounted () {
    gateinfo.get({
      actionid: 1001,
      aid: 0
    }).then((response) => {
      this.busdata = response.data;
    });
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

a {
  color: #42b983;
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
width:40%;
}
li p:nth-child(3) {
width:30%;
}
</style>
