import axios from '@/config/axios'
import CDO from '@/config/cdo'

//获取月度排行榜
export const getMLeaderboard = (options={}) => {
  let cdo = new CDO();
  cdo.setStringValue('strServiceName', 'RefundRankService');
  cdo.setStringValue('strTransName', 'getPersonalMonthlyRefund');
  cdo.setStringValue('strDate', options.strDate);

  return axios.request({
    method: 'post',
    data: cdo
  })
}

