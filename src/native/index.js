import { isAndroid } from '@/config/utils';
import { Toast } from 'vant';
import router from '@/router';

export const inApp = typeof TheYHClient !== 'undefined';
/*
** 获取经纬度
** var jsonString = window.prompt("getCoordinate","")
** JSON.parse(jsonString)
** {'longitude':'116.393859','latitude':'39.0093939'}
*/

export const mGetCoordinate = () => {
  if(!inApp) return false;
  try {
    if(isAndroid) {
      if (TheYHClient && TheYHClient.getCoordinate) {
        return JSON.parse(TheYHClient.getCoordinate());
      }
    }else {
      const jsonString = window.prompt("getCoordinate","");
      return JSON.parse(jsonString);
    }
    
  } catch (e) {
    // console.log(e);
    return false;
  }
}

/*
** 拨打电话
** var dict = {"params":{"dialNumber":"130998984848"}}
** var strParams = JSON.stringify(dict)
** TheYHClient.dial(strParams);
*/
export const mDial = (number) => {
  if(!inApp) return false;
  let dict = JSON.stringify({ "params": { dialNumber: number } });
  if(isAndroid) {
    TheYHClient.dial(dict);
  }else {
    TheYHClient.dial(dict);
  }
  
}

/*
** 获取某个坐标点距离当前位置距离
** function complete(meters){
**     console.log('异步回调完成')
**     console.log("距离（米）：" + meters)
** }
** var dict = {"callBackFuncName":"complete","params":{"latitude":"39.0494384","longitude":"116.03893349"}}
** var strParams = JSON.stringify(dict)
** TheYHClient.distanceBetweenUserAndPoint(strParams);
*/
export const mDistanceToSw = (coordinate) => {
  if(!inApp) return 0;
  try {
    return 0; //暂时不用判断距离
    let dict = JSON.stringify({params: coordinate});
    if(isAndroid) { 
      return TheYHClient.distanceBetweenUserAndPoint(dict);
    }else {
      return window.prompt("distanceBetweenUserAndPoint", dict);
    }
    
  } catch (e) {
    console.log('mDistanceToSw error');
  }

}

/*
** 退出登陆
*/
export const mLoginOut = () => {
  if(!inApp) {
    router.replace('login');
    return false;
  }else {
    TheYHClient.logOut();
  }
}

/*
** 退出登陆
*/
export const back = () => {
  try {
    if(inApp) {
      TheYHClient.back();
    }else {
      router.back();
    }
  } catch(e) {
    console.log('back error');
  }
}

// 1.
// TheYHClient.logOut();
// 2.
// TheYHClient.openMapPage();
// 3.
// var dict = {"params":{"dialNumber":"130998984848"}}
// var strParams = JSON.stringify(dict)
// TheYHClient.dial(strParams);
// 4.
// function complete(meters){
//     console.log('异步回调完成')
//     console.log("距离（米）：" + meters)
// }
// var dict = {"callBackFuncName":"complete","params":{"latitude":"39.0494384","longitude":"116.03893349"}}
// var strParams = JSON.stringify(dict)
// TheYHClient.distanceBetweenUserAndPoint(strParams);
// 5.
// var jsonString = window.prompt("getCoordinate","")
// //JSON.parse(jsonString)
// {'longitude':'116.393859','latitude':'39.0093939'}
// 6.
// var jsonString = window.prompt("getLoginInfo","")
// //JSON.parse(jsonString)
// '{"cdologiner":{"lCollLeaderId":3,"lUserId":14,"lCollectionId":3,"strCollectionName":"李四一的催收团队","strName":"李四一三","strMobile":"18603293432","lId":10},"strMobileRandom":"LDxddRXRQh+BbcUNTYcqdUKZqa\/K\/w2c"}'