import { Dialog } from 'vant'

export default list => {
  let html = '';
  list.forEach(item => {
    html+= `
      <p class="mobile-para" style="font-size: 0.28rem; line-height: 0.8rem;">${item.strRealName}(${item.strRelation}): <a style="color: blue;" href="tel:${item.strMobile}">${item.strMobile}</a></p>
    `
  })
  Dialog({
    title: "点击号码拨打",
    message: html,
    width: '80%',
    className: 'mobile-dialog'
  }).then(() => {
    // on close
  });
}
