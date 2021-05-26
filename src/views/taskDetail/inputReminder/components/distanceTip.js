import { Dialog } from 'vant';
export default () => {
  Dialog.alert({
    title: '提示',
    message: '您当前GPS位置与所选地址距离大于1000米，解决办法如下：\n1,到所选位置时再填写\n2,如已获得债务人新地址，请至填写催记 新增信息处添加后再填写',
    messageAlign: 'left',
    confirmButtonColor: '#48a1ff'
  })
}
