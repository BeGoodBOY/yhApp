import axios from '@/config/axios'
import CDO from '@/config/cdo'

//获取手机验证码
export const getMobileCode = (options={}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'LoginHelpService');
  cdo.setStringValue('strTransName', 'sendLoginMobileCode');
  cdo.setStringValue('strMobile', options.strMobile);

  return axios.request({
    method: 'post',
    data: cdo
  })
}

//登陆
export const login = (options={}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'LoginHelpService');
  cdo.setStringValue('strTransName', 'mobileCodeLogin');
  cdo.setStringValue('strMobile', options.strMobile);
  cdo.setStringValue('strMobileCode', options.strMobileCode);
  cdo.setIntegerValue('nLoginType', 0); //登录平台选择: 0:app, 1:boss后台

  return axios.request({
    method: 'post',
    data: cdo
  })
} 