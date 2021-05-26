import axios from '@/config/axios'
import CDO from '@/config/cdo'
import { getStore } from '@/config/utils'
import { mGetCoordinate } from '@/native'

//任务详情
export const getDetailData = (options = {}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtData');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
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
  cdo.setStringValue('strIdentity', options.NoId); // 债权id集合
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
  cdo.setIntegerValue('nPageOffset', options.nPageOffset); // 分页页数
  cdo.setIntegerValue('nPageSize', options.nPageSize); // 每页条数
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
  if(mGetCoordinate()) {
    let gc = mGetCoordinate();
    options.strLon = gc.longitude + '';
    options.strLat = gc.latitude + '';
  }
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorPersonal');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  cdo.setStringValue('strLat', options.strLat || '39.916527');//纬度
  cdo.setStringValue('strLon', options.strLon || '116.397128');//经度
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
//获取新增信息
export const getNewContact = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionRecordService');
  cdo.setStringValue('strTransName', 'getCollectionContactList');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//删除新增信息
export const deleteNewContact = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'CollectionRecordService');
  cdo.setStringValue('strTransName', 'deleteContact');
  cdo.setLongValue('lId', options.lId); // 补充信息主键
  cdo.setLongValue('lRecordId', options.lRecordId); // 催记ID
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 催记ID
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
//获取委托协议信息
export const getClientAgree = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getDebtorBusinessProtocol');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}
//获取委托协议信息
export const getCheckLetter = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getEntrustProtocol');
  cdo.setLongValue('lDebtorId', options.lDebtorId); // 债务人id
  cdo.setLongValue('lCollectEmpId', getStore('lId')); // 催收员id
  cdo.setLongValue('lCreditId', options.lCreditId); // 债权方id
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}

//获取目标值信息
export const getTargetInfo = (options) =>{
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'DebtorService');
  cdo.setStringValue('strTransName', 'getCommissionData');
  cdo.setLongValue('lDebtPoolId', options.lDebtPoolId); // 债权主键
  return axios.request({
    method: 'post',
    data: cdo
  }) 
}