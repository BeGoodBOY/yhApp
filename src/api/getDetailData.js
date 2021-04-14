import axios from '@/config/axios'
import CDO from '@/config/cdo'

//任务详情
export const getDetailData = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtData');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  cdo.setLongValue('lEntrustId', options.lCollectEmpId); // 催收员id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//债务列表
export const getDebtData = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtDataList');
  cdo.setLongValue('lDebtorId', options.NoId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//客户本人信息
export const getPersonMsg = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorAddress');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//还款渠道
export const getReplayChannel = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getCreditRefundList');
  cdo.setLongValue('lDebtorId', options.creditIds); // 债权id集合
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//还款记录查询
export const getRepayCords = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getRefundRecordList');
  cdo.setLongValue('strIdentity', options.NoId); // 债权id集合
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//催收记录、催回记录
export const getRecyRecords = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionRecordService');
  cdo.setStringValue('strTransName', 'getCollectionRecordList');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债权id集合
  cdo.setIntegerValue('nRecordType', options.nRecordType); // 0为催回记录 为-1催收记录
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//申请退单
export const applyRefundFuc = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionEntrustService');
  cdo.setStringValue('strTransName', 'applyRetreatEntrust');
  cdo.setLongValue('lEntrustId', options.lEntrustId); // 催收关联关系id
  cdo.setLongValue('lDebtPoolId', options.lDebtPoolId); // 债权主键id
  cdo.setStringValue('strAbandonReason', options.strAbandonReason); // 债权主键id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//获取客户本人信息
export const getSelfInfo = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorPersonal');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  cdo.setStringValue('strLat', options.strLat || '39.91');//纬度
  cdo.setStringValue('strLon', options.strLon || '116.48');//经度
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//获取相关联系人信息
export const getRelatedContact = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorContactor');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//获取其它信息
export const getOtherContact = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorOtherInfo');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//获取诉讼信息
export const getlawuitMsg = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorLawsuit');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}