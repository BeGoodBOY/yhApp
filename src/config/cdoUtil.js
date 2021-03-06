//***********************************Utility.js
function rand(nMaxNumber) {
  return Math.round(Math.random() * nMaxNumber)
}
export function encodeToXMLText(strText) {
  var strOutput = "";
  var nLength = strText.length;
  for (var i = 0; i < nLength; i = i + 1) {
      var ch = strText.charAt(i);
      switch (ch) {
      case "&":
          strOutput += "&amp;";
          break;
      case "/":
          strOutput += "&#47;";
          break;
      case "'":
          strOutput += "&#039;";
          break;
      case ">":
          strOutput += "&gt;";
          break;
      case "<":
          strOutput += "&lt;";
          break;
      case '"':
          strOutput += "&quot;";
          break;
      case "\r":
          strOutput += "&#xd;";
          break;
      case "\n":
          strOutput += "&#xa;";
          break;
      default:
          strOutput += ch
      }
  }
  return strOutput
}
export function encodeToHTMLText(strText) {
  var strOutput = "";
  var nLength = strText.length;
  for (var i = 0; i < nLength; i = i + 1) {
      var ch = strText.charAt(i);
      switch (ch) {
      case "&":
          strOutput += "&amp;";
          break;
      case "/":
          strOutput += "&#47;";
          break;
      case " ":
          strOutput += "&nbsp;";
          break;
      case "'":
          strOutput += "&#039;";
          break;
      case ">":
          strOutput += "&gt;";
          break;
      case "<":
          strOutput += "&lt;";
          break;
      case '"':
          strOutput += "&quot;";
          break;
      case "\r":
          strOutput += "&#xd;";
          break;
      case "\n":
          strOutput += "&#xa;";
          break;
      default:
          strOutput += ch
      }
  }
  return strOutput
}
function replaceChar(strText, chFromChar, chToChar) {
  var strResult = "";
  for (var i = 0; i < strText.length; i = i + 1) {
      var ch = strText.charAt(i);
      if (ch == chFromChar) {
          strResult += chToChar
      } else {
          strResult += ch
      }
  }
  return strResult
}
function trimLeft(strText) {
  var nIndex = 0;
  for (var i = 0; i < strText.length; i = i + 1) {
      var ch = strText.charAt(i);
      if (ch == " " || ch == "\n" || ch == "\t") {
          nIndex++
      } else {
          break
      }
  }
  return strText.substr(nIndex)
}
function trimRight(strText) {
  var nIndex = strText.length;
  for (var i = strText.length - 1; i >= 0; i = i - 1) {
      var ch = strText.charAt(i);
      if (ch == " " || ch == "\n" || ch == "\t") {
          nIndex--
      } else {
          break
      }
  }
  return strText.substr(0, nIndex)
}
function trim(strText) {
  var strResult = trimLeft(strText);
  strResult = trimRight(strResult);
  return strResult
}
function getBrowserType() {
  var OsObject = "";
  if (navigator.userAgent.indexOf("MSIE") >= 0) {
      return "MSIE"
  }
  if (navigator.userAgent.indexOf("Firefox") >= 0) {
      return "Firefox"
  }
  if (navigator.userAgent.indexOf("Safari") >= 0) {
      return "Safari"
  }
  if (navigator.userAgent.indexOf("Camino") >= 0) {
      return "Camino"
  }
  if (navigator.userAgent.indexOf("Gecko/") >= 0) {
      return "Gecko"
  }
  return ""
}
String.prototype.formatTextToHTML = function() {
  return this.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#47;/g, "/").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/""/g, "\r")
}
;
String.prototype.getLength = function() {
  var arr = this.match(/[\u00FF-\uFFFF]/gi);
  if (!arr || arr == null) {
      return this.length
  }
  var len = this.length + arr.length;
  return len
}
;
function richTextInputEncoder(source) {
  var resultStr = source;
  if (source == null) {
      return source
  }
  resultStr = resultStr.replace(/[ ]/g, "");
  resultStr = resultStr.replace(/[\r\n\t]/g, "");
  return resultStr
}
function numberArrayToText(arrNumber, strSeperator) {
  var strNumber = "";
  for (var i = 0; i < arrNumber.length; i = i + 1) {
      if (i > 0) {
          strNumber += strSeperator
      }
      strNumber += arrNumber[i]
  }
  return strNumber
}
function sortNumber(arrNumber, sortMode) {
  if (sortMode == null) {
      sortMode = 0
  }
  for (var i = 0; i < arrNumber.length - 1; i = i + 1) {
      for (var j = i + 1; j < arrNumber.length; j = j + 1) {
          if (sortMode == 0) {
              if (arrNumber[i] > arrNumber[j]) {
                  var nTemp = arrNumber[i];
                  arrNumber[i] = arrNumber[j];
                  arrNumber[j] = nTemp
              }
          } else {
              if (arrNumber[i] < arrNumber[j]) {
                  var nTemp = arrNumber[i];
                  arrNumber[i] = arrNumber[j];
                  arrNumber[j] = nTemp
              }
          }
      }
  }
}
function randSelectNumber(nMinNumber, nMaxNumber, nOutputCount) {
  var arrNumber = new Array(nMaxNumber - nMinNumber + 1);
  for (var i = nMinNumber; i <= nMaxNumber; i = i + 1) {
      arrNumber[i - nMinNumber] = i
  }
  var nLeftCount = nMaxNumber - nMinNumber + 1;
  var arrOutput = new Array(nOutputCount);
  for (i = 0; i < nOutputCount; i = i + 1) {
      var nRandNumber = rand(nLeftCount - 1);
      arrOutput[i] = arrNumber[nRandNumber];
      for (var j = nRandNumber + 1; j < arrNumber.length; j = j + 1) {
          arrNumber[j - 1] = arrNumber[j]
      }
      nLeftCount = nLeftCount - 1
  }
  sortNumber(arrOutput);
  return arrOutput
}
function stakeToText(strStake, nNumberLength, chSeperator) {
  var strText = "";
  var nNumberCount = strStake.length / nNumberLength;
  var nIndex = 0;
  for (var i = 0; i < nNumberCount; i = i + 1) {
      if (i > 0) {
          strText += chSeperator
      }
      strText += strStake.substr(nIndex, nNumberLength);
      nIndex += nNumberLength
  }
  return strText
}
function Cab(nA, nB) {
  var nResult = 1;
  for (var i = 0; i < nB; i += 1) {
      nResult *= (nA - i);
      nResult /= (i + 1)
  }
  return nResult
}
function integerToMoney(nMoney) {
  var s
  trYuan = nMoney / 100;
  var nCent = nMoney % 100;
  if (nCent < 10) {
      return "" + strYuan + ".0" + nCent
  } else {
      return "" + strYuan + "." + nCent
  }
}
function integerToString(nValue, nLength, chChar) {
  var strValue = "" + nValue;
  var nSize = strValue.length;
  for (var i = 0; i < nLength - nSize; i++) {
      strValue = chChar + strValue
  }
  return strValue
}
function loadXML(xmlString) {
  var xmlDoc = null;
  if (!window.DOMParser && window.ActiveXObject) {
      var xmlDomVersions = ["MSXML.2.DOMDocument.6.0", "MSXML.2.DOMDocument.3.0", "Microsoft.XMLDOM"];
      for (var i = 0; i < xmlDomVersions.length; i++) {
          try {
              xmlDoc = new ActiveXObject(xmlDomVersions[i]);
              xmlDoc.async = false;
              xmlDoc.loadXML(xmlString);
              break
          } catch (e) {}
      }
  } else {
      if (window.DOMParser && document.implementation && document.implementation.createDocument) {
          try {
              domParser = new DOMParser();
              xmlDoc = domParser.parseFromString(xmlString, "text/xml")
          } catch (e) {}
      } else {
          return null
      }
  }
  return xmlDoc.documentElement
}
function findMatchedChar(nIndex, strText) {
  if (nIndex < 0) {
      return -1
  }
  var chChar = strText.charAt(nIndex);
  var nCount = 0;
  var nStartIndex = -1;
  var nEndIndex = -1;
  var chFind = " ";
  switch (chChar) {
  case "(":
      chFind = ")";
      break;
  case "{":
      chFind = "}";
      break;
  case "[":
      chFind = "]";
      break;
  case ")":
      chFind = "(";
      break;
  case "}":
      chFind = "{";
      break;
  case "]":
      chFind = "[";
      break;
  default:
      return -1
  }
  var nLength = strText.length;
  switch (chChar) {
  case "(":
  case "{":
  case "[":
      for (var i = nIndex + 1; i < nLength; i++) {
          var ch = strText.charAt(i);
          if (ch == chChar) {
              nCount++
          } else {
              if (ch == chFind) {
                  if (nCount == 0) {
                      nEndIndex = i;
                      break
                  } else {
                      nCount--
                  }
              }
          }
      }
      return nEndIndex;
  case ")":
  case "}":
  case "]":
      for (var i = nIndex - 1; i >= 0; i--) {
          var ch = strText.charAt(i);
          if (ch == chChar) {
              nCount++
          } else {
              if (ch == chFind) {
                  if (nCount == 0) {
                      nStartIndex = i;
                      break
                  } else {
                      nCount--
                  }
              }
          }
      }
      return nStartIndex;
  default:
      return -1
  }
}
function dateToString(date) {
  var strDate = date.getFullYear() + "-" + integerToString(date.getMonth() + 1, 2, "0") + "-" + integerToString(date.getDate(), 2, "0");
  return strDate
}
function stringToDate(strDate) {
  return new Date(eval(strDate.substring(0, 4)),eval(strDate.substring(5, 7)) - 1,eval(strDate.substring(8, 10)))
}
function getRequestParameter(strParaName) {
  var url = location.href;
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  for (i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
  }
  var returnValue = paraObj[strParaName.toLowerCase()];
  if (typeof (returnValue) == "undefined") {
      return null
  } else {
      return returnValue
  }
}
function allChildren(element) {
  var arrOutput = [];
  var arr = element.children;
  for (var i = 0; i < arr.length; i++) {
      arrOutput[arrOutput.length] = arr[i];
      var arrChildren = allChildren(arr[i]);
      for (var j = 0; j < arrChildren.length; j++) {
          arrOutput[arrOutput.length] = arrChildren[j]
      }
  }
  return arrOutput
}
function numberTextToInteger(strText, nDigitCount) {
  if (strText.length == 0) {
      return null
  }
  var lValue = 0;
  var nDotCount = 0;
  var nDotPos = strText.length;
  for (var i = 0; i < strText.length; i++) {
      if (strText.charAt(i) == ".") {
          if (nDotCount > 0) {
              return null
          }
          if (i + nDigitCount + 1 < strText.length) {
              return null
          }
          nDotCount++;
          nDotPos = i
      } else {
          if (strText.charAt(i) < "0" || strText.charAt(i) > "9") {
              return null
          } else {
              if (nDotCount > 0 && i - nDotPos > nDigitCount) {
                  return null
              }
              lValue = lValue * 10 + (strText.charAt(i) - "0")
          }
      }
  }
  if (nDotCount == 0) {
      for (var i = 0; i < nDigitCount; i++) {
          lValue *= 10
      }
      return lValue
  }
  for (var i = 0; i < nDigitCount - (strText.length - nDotPos - 1); i++) {
      lValue *= 10
  }
  return lValue
}
function integerToNumberText(lValue, nDigitCount) {
  var strDigit = "";
  var lTemp = lValue;
  for (var i = 0; i < nDigitCount; i++) {
      if (lTemp >= 0) {
          strDigit = "" + lTemp % 10 + strDigit
      } else {
          strDigit = "" + (-lTemp % 10) + strDigit
      }
      lTemp = Math.floor(lTemp / 10)
  }
  if (strDigit.length > 0) {
      if (lTemp == 0 && lValue < 0) {
          return "-" + lTemp + "." + strDigit
      } else {
          return "" + lTemp + "." + strDigit
      }
  } else {
      return "" + lTemp + strDigit
  }
}
function clearTextById(strId, strVal) {
  document.getElementById(strId).value = strVal
}
;
function isStringNull(n) {
  var t = !1;
  return typeof n == "undefined" && (t = !0),
  "" == n && (t = !0),
  null == n && (t = !0),
  t
}
function HashMap() {
  this.arrKey = [];
  this.arrValue = [];
  this.exists = function(n) {
      n = "" + n;
      n = n.toLowerCase();
      for (var t = 0; t < this.arrKey.length; t++)
          if (this.arrKey[t].toLowerCase() == n)
              return !0;
      return !1
  }
  ;
  this.length = function() {
      return this.arrKey.length
  }
  ;
  this.put = function(n, t) {
      n = "" + n;
      for (var i = 0; i < this.arrKey.length; i++)
          if (this.arrKey[i].toLowerCase() == n.toLowerCase()) {
              this.arrValue[i] = t;
              return
          }
      this.arrKey[this.arrKey.length] = n;
      this.arrValue[this.arrValue.length] = t
  }
  ;
  this.get = function(n) {
      n = "" + n;
      n = n.toLowerCase();
      for (var t = 0; t < this.arrKey.length; t++)
          if (this.arrKey[t].toLowerCase() == n)
              return this.arrValue[t];
      return null
  }
  ;
  this.remove = function(n) {
      var t, i;
      for (n = "" + n,
      n = n.toLowerCase(),
      t = 0; t < this.arrKey.length; t++)
          if (this.arrKey[t].toLowerCase() == n)
              return this.arrKey.splice(t, 1),
              i = this.arrValue[t],
              this.arrValue.splice(t, 1),
              i;
      return null
  }
  ;
  this.removeAll = function() {
      this.arrKey = [];
      this.arrValue = []
  }
  ;
  this.getKeys = function() {
      return this.arrKey
  }
  ;
  this.getValues = function() {
      return this.arrValue
  }
}
function Return() {
  this.nCode = 0;
  this.getCode = function() {
      return this.nCode
  }
  ;
  this.setCode = function(n) {
      this.nCode = n
  }
  ;
  this.strText = "";
  this.getText = function() {
      return this.strText
  }
  ;
  this.setText = function(n) {
      this.strText = n
  }
  ;
  this.strInfo = "";
  this.getInfo = function() {
      return this.strInfo
  }
  ;
  this.setInfo = function(n) {
      this.strInfo = n
  }
}
