import axios from 'axios'
import config from './index'
import CDO from './cdo'
import { Toast } from 'vant'
import { getStore } from '@/config/utils'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getDefaultConfig() {
    const config = {
      baseURL: this.baseUrl,
      //xml
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Accept": "*/*",
      }
    }
    return config
  }

  interceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      // console.log('请求拦截')
      // console.log(config)
      return config
    })
    instance.interceptors.response.use((res) => {
      //处理响应
      // console.log('处理响应')
      // console.log(res)
      // 解析xml
      let f = res.request.responseXML.documentElement.childNodes;
      let t = new CDO;
      let e = new CDO;
      t.fromXML(f[0].childNodes[0]);
      f.length > 1 && e.fromXML(f[1].childNodes[0]);
      // return;
      const returnObj = Object.assign(JSON.parse(t.toJSON()), JSON.parse(e.toJSON()));
      if(returnObj.nCode !== 0) {
        Toast(returnObj.strText);
        return false;
      }
      return returnObj
    }, (error) => {
      // console.log(error)
      return { error: '网络异常' }
    })
  }

  request(options) {
    const instance = axios.create()
    var cdo = options.data;
    // 登陆信息
    if(getStore('userId')) {
      let cdoLoginer = new CDO();
      // lCollectEmpId
      // strCollectEmpName
      // strCollectEmpMobile
      // lCollectionId
      // strCollectionName
      // lCollLeaderId
      cdoLoginer.setLongValue('lCollectEmpId', getStore('lUserId')); //催收员用户id
      cdoLoginer.setStringValue('strCollectEmpName', getStore('strName')); //催收员姓名
      cdoLoginer.setStringValue('strCollectEmpMobile', getStore('strMobile')); //催收员手机号
      cdoLoginer.setLongValue('lCollectionId', getStore('lCollectionId'));  //催收员归属机构id
      cdoLoginer.setStringValue('strCollectionName', getStore('strCollectionName')); //催收员归属机构名称
      cdoLoginer.setLongValue('lCollLeaderId', getStore('lCollLeaderId'));  //催收员归属机构领导的员工id
      cdo.setCDOValue('cdoLoginer', cdoLoginer)
    }
    
    // 请求配置
    if(options.method === 'post') {
      options.url = `/handleTrans.cdo?strServiceName=${cdo.getStringValue('strServiceName')}&strTransName=${cdo.getStringValue('strTransName')}`
      options.data = "$$CDORequest$$=" + encodeURIComponent(cdo.toXML())
    }
    if(options.method === 'get') {
      const para = "$$CDORequest$$=" + encodeURIComponent(cdo.toXML())
      options.url = `/handleTrans.cdo?${para}`
      options.responseType = 'json'
    }
    options = Object.assign(this.getDefaultConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
// axios({
//   method: "post",
//   data: "$$CDORequest$$=" + encodeURIComponent(cdo.toXML()),
//   url:
//     "/handleTrans.cdo?strServiceName=UserService&strTransName=queryUserBankInfo",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//     "Accept": "*/*",
//   },
// })
//   .then(function (response) {
//     console.log(response.request.responseXML);
//     var f = response.request.responseXML.documentElement.childNodes;
//     var t = new CDO;
//     var e = new CDO;
//     t.fromXML(f[0].childNodes[0]);
//     f.length > 1 && e.fromXML(f[1].childNodes[0]);
//     console.log(JSON.parse(t.toJSON()))
//     console.log(JSON.parse(e.toJSON()))
//     // let t = new CDO();
//     // t.fromXML(f[0].childNodes[0]);
//     // console.log(t)

//   })
//   .catch(function (error) {
//     console.log(error);
//   })