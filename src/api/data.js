import axios from '@/config/axios'
import CDO from '@/config/cdo'
import { isNull, getStore } from '@/config/utils';
import { mGetCoordinate } from '@/native';
import { Toast } from 'vant';
// 纬度: 39.918219124795925
// 经度: 116.48275006366437
//获取抢单列表
export const getIndex = (options={}) => {
  if(mGetCoordinate()) {
    let gc = mGetCoordinate();
    // Toast(gc.longitude)
    options.strLon = gc.longitude + '';
    options.strLat = gc.latitude + '';
  }
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'GrabOrderService');
  cdo.setStringValue('strTransName', 'getOrderList');
  cdo.setStringValue('strLon', options.strLon || '116.397128');//经度
  cdo.setStringValue('strLat', options.strLat || '39.916527');//纬度
  cdo.setLongValue('lId', getStore('userId')); //催收员ID
  !isNull(options.nPage) && cdo.setIntegerValue('nPage', options.nPage);
  options.nSize && cdo.setIntegerValue('nSize', options.nSize);
  options.strDebtorName && cdo.setStringValue('strDebtorName', options.strDebtorName); //精确查询债务人姓名
  options.strMobile && cdo.setStringValue('strMobile', options.strMobile); //精确查询债务人手机号
  options.strName && cdo.setStringValue('strName', options.strName); //精确查询债务人姓名
  options.strIdentity && cdo.setStringValue('strIdentity', options.strIdentity); //精确查询身份证
  return axios.request({
    method: 'post',
    data: cdo
  })
}

//抢单
export const grabOrder = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'GrabOrderService');
  cdo.setStringValue('strTransName', 'grabOrder');
  cdo.setLongValue('lId', options.lId); // 债务主键id
  cdo.setStringValue('strLon', options.strLon); //当前经度
  cdo.setStringValue('strLat', options.strLat); //当前纬度
  cdo.setStringValue('strAddress', options.strAddress);
  cdo.setIntegerValue('nAddressType', options.nAddressType);
  cdo.setStringValue('strEmpLat', options.strLat || '39.91');//当前纬度
  cdo.setStringValue('strEmpLon', options.strLon || '116.48');//当前经度
  
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//查询委托列表
export const getDelegateList = (options = {}) => {
  if(mGetCoordinate()) {
    let gc = mGetCoordinate();
    options.strLon = gc.longitude + '';
    options.strLat = gc.latitude + '';
  } 
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionEntrustService');
  cdo.setStringValue('strTransName', 'getCollectionEntrustList');
  cdo.setLongValue('lCollectEmpId', getStore('lId')); // 催收员idid
  cdo.setStringValue('strLon', options.strLon || '116.397128');//经度
  cdo.setStringValue('strLat', options.strLat || '39.916527');//纬度
  options.strSearchKey && cdo.setStringValue('strSearchKey', options.strSearchKey); //搜索框输入内容  姓名或者手机号；此字段与nStatus、nIsFollow、nFilter互斥，传此字段，其他3个字段为默认值即可
  !isNull(options.nStatus) && cdo.setIntegerValue('nStatus', options.nStatus); //案件状态：-1:全部;0:未开案;1:已关注;2:申请案件
  !isNull(options.nFilter) && cdo.setIntegerValue('nFilter', options.nFilter); //筛选：-1:默认;0:距离由近到远;1:倒计时由长到短;2:倒计时由短到长;3:金额由大到小;4:逾期由长到短;5:逾期由短到长;
  !isNull(options.nPageIndex) && cdo.setIntegerValue('nPageIndex', options.nPageIndex);
  options.nPageSize && cdo.setIntegerValue('nPageSize', options.nPageSize);

  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

// 加关注
export const followOrder = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionEntrustService');
  cdo.setStringValue('strTransName', 'addFollow');
  cdo.setLongValue('lCollectEmpId', getStore('lId')); // 催收员id
  cdo.setLongValue('lId', options.lId); //催收委托关系主键id

  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

// 取消关注
export const cancelFollowOrder = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionEntrustService');
  cdo.setStringValue('strTransName', 'cancelFollow');
  cdo.setLongValue('lCollectEmpId', getStore('lId')); // 催收员id
  cdo.setLongValue('lId', options.lId); //催收委托关系主键id

  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

// 取消关注
export const cancelCase = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'ApplyCaseService');
  cdo.setStringValue('strTransName', 'cancelCase');
  cdo.setLongValue('lId', options.lId); //催收委托关系主键id

  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

// 打电话-查询联系人电话
export const queryOrderMobiles = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'ContactorService');
  cdo.setStringValue('strTransName', 'getAllPhoneList');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 催收员id

  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//新增催记
export const addReminder = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionRecordService');
  cdo.setStringValue('strTransName', 'addCollectionRecord');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  cdo.setLongValue('lEntrustId', options.lEntrustId); // 关联关系id 
  cdo.setStringValue('strDebtorName', options.strDebtorName); // 债务人姓名
  // cdo.setStringValue('strDebtorMobile', options.strDebtorMobile); // 债务人手机号
  // cdo.setStringValue('strDebtorIdentity', options.strDebtorIdentity); // 债务人身份证号
  cdo.setIntegerValue('nRecordType', options.nRecordType); //催记类型

  //根据业务需求传
  !isNull(options.strAddress) && cdo.setStringValue('strAddress', options.strAddress);//外访地址-
  !isNull(options.strCallNumber) && cdo.setStringValue('strCallNumber', options.strCallNumber);//外访地址-
  !isNull(options.nAnswer) && cdo.setIntegerValue('nAnswer', options.nAnswer);//是否接听 0未接通 1接通
  !isNull(options.nCallSituation) && cdo.setIntegerValue('nCallSituation', options.nCallSituation);//拨打情况 0称不认识客户1称非本人2同意转达客户3拒绝转达客户4其他5拒听6忙线7空号8关机9停机

  if(options.nRecordType === 0) {// 已还款
    cdo.setIntegerValue('nRepayType', options.nRepayType);//还款方式
    cdo.setLongValue('lRepayAmount', options.lRepayAmount*100); //提交还款金额(分)
    cdo.setStringValue('strRemittanceDate', options.strRemittanceDate); //打款时间 2019-02-22 09:00
    cdo.setStringValue('strImgs', options.strImgs); //还款凭证图片，字符串“,”拼接
    !isNull(options.nRemittanceType) && cdo.setIntegerValue('nRemittanceType', options.nRemittanceType);//打款方式
    !isNull(options.strRemittanceName) && cdo.setStringValue('strRemittanceName', options.strRemittanceName);//打款/汇款人姓名
    !isNull(options.strRemittanceBank) && cdo.setStringValue('strRemittanceBank', options.strRemittanceBank);//汇款银行名称
    !isNull(options.strRemittanceCard) && cdo.setStringValue('strRemittanceCard', options.strRemittanceCard);//打款银行卡号 
  }
  if(options.nRecordType === 1) {// 申请减免
    !isNull(options.lSettleAmount) && cdo.setLongValue('lSettleAmount', options.lSettleAmount*100);//结清金额（分）
    !isNull(options.nCollectionWay) && cdo.setLongValue('nCollectionWay', options.nCollectionWay);//催收方式0:外访;1:电话催收
    !isNull(options.strImgs) && cdo.setStringValue('strImgs', options.strImgs); //凭证图片，字符串“,”拼接
  }
  if(options.nRecordType === 2) {// 承诺还款
    !isNull(options.strPromiseDate) && cdo.setStringValue('strPromiseDate', options.strPromiseDate); //承诺还款时间
    !isNull(options.nCollectionWay) && cdo.setLongValue('nCollectionWay', options.nCollectionWay);//催收方式0:外访;1:电话催收
    !isNull(options.strImgs) && cdo.setStringValue('strImgs', options.strImgs); //凭证图片，字符串“,”拼接
  }
  if(options.nRecordType === 3) {// 继续跟进
    !isNull(options.nCollectionWay) && cdo.setLongValue('nCollectionWay', options.nCollectionWay);//催收方式0:外访;1:电话催收
    !isNull(options.strImgs) && cdo.setStringValue('strImgs', options.strImgs); //凭证图片，字符串“,”拼接
  }
  // 需要传就传看具体业务
  !isNull(options.nFound) && cdo.setIntegerValue('nFound', options.nFound); //是否找到人 0找不到人 1找到人
  !isNull(options.nSituation) && cdo.setIntegerValue('nSituation', options.nSituation); //外访情况 0称非本人1否认债务2经济困难3称已结清4亲人5其他6已更换地址7地址错误8无人在家
  !isNull(options.nRelationship) && cdo.setIntegerValue('nRelationship', options.nRelationship); //与客户关系 0本人1家庭成员2第三方
  /**
   * 联系方式数组，在cdoRequest层级内- 
   * nContactType:0 现住地址 1单位地址 2其他地址
   * strContact: 联系方式
   */
  !isNull(options.cdosContact) && cdo.setCDOArrayValue('cdosContact', getCdoArr(options.cdosContact, ['nContactType', 'strContact'])); //
  /**
   * 地址数组，在cdoRequest层级内
   * nAddressType:0 现住地址 1单位地址 2其他地址
   * strAddress: 地址
   */
  !isNull(options.cdosAddress) && cdo.setCDOArrayValue('cdosAddress', getCdoArr(options.cdosAddress, ['nAddressType', 'strAddress'])); //  
   /**
   * 社交账号数组，在cdoRequest层级内
   * nSocialType:0 QQ 1微信 2邮箱
   * strSocial: 社交账号
   */
  !isNull(options.cdosSocial) && cdo.setCDOArrayValue('cdosSocial', getCdoArr(options.cdosSocial, ['nSocialType', 'strSocial'])); //  

   /**
   * 拒绝还款原因 0有能力还款 1无能力还款 2只还本金 3想还款但没钱
   */
  !isNull(options.nRefuseReason) && cdo.setIntegerValue('nRefuseReason', options.nRefuseReason);

  !isNull(options.strRemark) && cdo.setStringValue('strRemark', options.strRemark.trim()); //备注
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

function getCdoArr(arr, keys) {
  var cdoArr = arr.map(item => {
    let cdo = new CDO();
    cdo.setIntegerValue(keys[0], item[keys[0]]);
    cdo.setStringValue(keys[1], item[keys[1]]);
    return cdo;
  })
  return cdoArr;
}