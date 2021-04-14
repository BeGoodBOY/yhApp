// 地址类型
export const adressType = {
  '1':'身份证住址',
  '2':'现住址',
  '3':'工作地址(单位地址)'
}

// 任务单筛选
export const taskOrderFilter = [
  {
    key: -1,
    text: '默认',
    active: true
  },
  {
    key: 0,
    text: '距离由近到远'
  },
  {
    key: 1,
    text: '倒计时由长到短'
  },
  {
    key: 2,
    text: '倒计时由短到长'
  },
  {
    key: 3,
    text: '金额由大到小'
  },
  {
    key: 4,
    text: '逾期由长到短'
  },
  {
    key: 5,
    text: '逾期由短到长'
  },
  {
    key: 6,
    text: '出库由近到远'
  }
]