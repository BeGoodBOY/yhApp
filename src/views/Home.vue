<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CDO from "@/config/cdo";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    var cdo = new CDO();
    cdo.setStringValue("strServiceName", "UserService");
    cdo.setStringValue("strTransName", "queryUserBankInfo");
    console.log(cdo.toJSON());
    console.log(cdo.toXML());
    axios({
      method: "post",
      data: "$$CDORequest$$=" + encodeURIComponent(cdo.toXML()),
      url:
        "/handleTrans.cdo?strServiceName=UserService&strTransName=queryUserBankInfo",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Accept": "*/*",
      },
    })
      .then(function (response) {
        console.log(response.request.responseXML);
        var f = response.request.responseXML.documentElement.childNodes;
        var t = new CDO;
        var e = new CDO;
        t.fromXML(f[0].childNodes[0]);
        f.length > 1 && e.fromXML(f[1].childNodes[0]);
        console.log(JSON.parse(t.toJSON()))
        console.log(JSON.parse(e.toJSON()))
        // let t = new CDO();
        // t.fromXML(f[0].childNodes[0]);
        // console.log(t)
        
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
