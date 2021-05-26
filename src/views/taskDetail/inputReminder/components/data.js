// 新增信息需要数据
export const relationArr =  [
  { text: "本人", value: 0 },
  { text: "家庭成员", value: 1 },
  { text: "第三方", value: 2 }
]

export const contactTypeArr = [
  { text: "手机", value: 0 },
  { text: "家庭电话", value: 1 },
  { text: "单位电话", value: 2 }
]

export const addressTypeArr = [
  { text: "现住地址", value: 0 },
  { text: "单位地址", value: 1 },
  { text: "其他地址", value: 2 }
]

export const socialTypeArr = [
  { text: "QQ", value: 0 },
  { text: "微信 ", value: 1 },
  { text: "邮箱", value: 2 }
]

// 拒绝还款需要信息
export const refuseReasonArr = [
  { text: "有能力还款", value: 0 },
  { text: "无能力还款 ", value: 1 },
  { text: "只还本金", value: 2 },
  { text: "想还款但没钱", value: 3 }
]

// 继续跟进-拨打情况
export const mobileStateArr = [
  {
    text: '未接通',
    value: 0,
    children: [
      {
        text: '拒听', 
        value: 5
      },
      {
        text: '忙线',
        value: 6
      },
      {
        text: '空号',
        value: 7
      },
      {
        text: '关机',
        value: 8
      }, 
      {
        text: '停机',
        value: 9
      }
    ]
  },
  {
    text: '接通',
    value: 1,
    children: [
      {
        text: '称不认识客户',
        value: 0
      },
      {
        text: '称非本人',
        value: 1
      },
      {
        text: '同意转达客户',
        value: 2
      },
      {
        text: '拒绝转达客户',
        value: 3
      },
      {
        text: '其他',
        value: 4
      }
    ]
  }
]

// 继续跟进-拨打情况展示需要 
export const mobileStateS1 = [
  {
    text: '未接通',
    value: 0
  },
  {
    text: '接通',
    value: 1
  }
]

export const mobileStateS2 = {
  '0': '称不认识客户',
  '1': '称非本人',
  '2': '同意转达客户',
  '3': '拒绝转达客户',
  '4': '其他',
  '5': '拒听',
  '6': '忙线',
  '7': '空号',
  '8': '关机',
  '9': '停机'
}

// 继续跟进-外访情况
export const visitStateArr = [
  {
    text: '找不到人',
    value: 0,
    children: [
      {
        text: '已更换地址',
        value: 6
      },
      {
        text: '地址错误',
        value: 7
      },
      {
        text: '无人在家',
        value: 8
      },
    ]
  },
  {
    text: '找到人',
    value: 1,
    children: [
      {
        text: '称非本人', 
        value: 0
      },
      {
        text: '否认债务',
        value: 1
      },
      {
        text: '经济困难',
        value: 2
      },
      {
        text: '称已结清',
        value: 3
      }, 
      {
        text: '亲人',
        value: 4
      },
      {
        text: '其他',
        value: 5
      }
    ]
  }
]