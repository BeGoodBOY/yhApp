import { encodeToXMLText } from './cdoUtil'
let strXML, str_JSON;
function HashMap() {
  this.arrKey = [];
  this.arrValue = [];
  this.exists = function(a) {
      a = "" + a;
      a = a.toLowerCase();
      for (var b = 0; b < this.arrKey.length; b++)
          if (this.arrKey[b].toLowerCase() == a)
              return true;
      return false
  }
  ;
  this.length = function() {
      return this.arrKey.length
  }
  ;
  this.put = function(a, c) {
      a = "" + a;
      for (var b = 0; b < this.arrKey.length; b++)
          if (this.arrKey[b].toLowerCase() == a.toLowerCase()) {
              this.arrValue[b] = c;
              return
          }
      this.arrKey[this.arrKey.length] = a;
      this.arrValue[this.arrValue.length] = c
  }
  ;
  this.get = function(a) {
      a = "" + a;
      a = a.toLowerCase();
      for (var b = 0; b < this.arrKey.length; b++)
          if (this.arrKey[b].toLowerCase() == a)
              return this.arrValue[b];
      return null
  }
  ;
  this.remove = function(b) {
      b = "" + b;
      b = b.toLowerCase();
      for (var a = 0; a < this.arrKey.length; a++)
          if (this.arrKey[a].toLowerCase() == b) {
              this.arrKey.splice(a, 1);
              var c = this.arrValue[a];
              this.arrValue.splice(a, 1);
              return c
          }
      return null
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
function FieldId() {
  this.nType = 0;
  this.strMainFieldId = "";
  this.strFieldId = "";
  this.strIndexFieldId = ""
}
function parseFieldId(b) {
  var d = b.length
    , a = null;
  if (b.charAt(d - 1) == "]") {
      var e = findMatchedChar(d - 1, b);
      if (e < 1)
          return null;
      a = new FieldId;
      a.nType = 2;
      a.strMainFieldId = b.substring(0, e);
      if (a.strMainFieldId.length == 0)
          return null;
      a.strIndexFieldId = b.substring(e + 1, d - 1);
      return a.strIndexFieldId.length == 0 ? null : a
  }
  for (var c = d - 1; c >= 0; c--) {
      var f = b.charAt(c);
      if (f == ".") {
          a = new FieldId;
          a.nType = 1;
          a.strMainFieldId = b.substring(0, c);
          if (a.strMainFieldId.length == 0)
              return null;
          a.strFieldId = b.substring(c + 1);
          return a.strFieldId.length == 0 ? null : a
      }
  }
  a = new FieldId;
  a.nType = 0;
  a.strFieldId = b;
  return a
}
function BooleanField(b, a) {
  this.strType = "BooleanField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = false;
  this.bValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.bValue
  }
  ;
  this.setValue = function(a) {
      this.bValue = a
  }
  ;
  this.toXML = function() {
      strXML = '<BF N="' + this.strName + '"';
      strXML += ' V="' + this.bValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<BF N="' + this.strName + '"';
      strXML += ' V="' + this.bValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      return '\\"' + this.getName() + '\\":' + this.bValue + ","
  }
  ;
  this.toJSON = function() {
      return '"' + this.getName() + '":' + this.bValue + ","
  }
}
function ByteField(b, a) {
  this.strType = "ByteField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.byValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.byValue
  }
  ;
  this.setValue = function(a) {
      this.byValue = a
  }
  ;
  this.toXML = function() {
      strXML = '<BYF N="' + this.strName + '"';
      strXML += ' V="' + this.byValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<BYF N="' + this.strName + '"';
      strXML += ' V="' + this.byValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.byValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.byValue + ",";
      return str_JSON
  }
}
function ShortField(b, a) {
  this.strType = "ShortField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.shValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.shValue
  }
  ;
  this.setValue = function(a) {
      this.shValue = a
  }
  ;
  this.toXML = function() {
      strXML = '<SF N="' + this.strName + '"';
      strXML += ' V="' + this.shValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<SF N="' + this.strName + '"';
      strXML += ' V="' + this.shValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.shValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.shValue + ",";
      return str_JSON
  }
}
function IntegerField(b, a) {
  this.strType = "IntegerField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.nValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.nValue
  }
  ;
  this.setValue = function(a) {
      this.nValue = a
  }
  ;
  this.toXML = function() {
      strXML = '<NF N="' + this.strName + '"';
      strXML += ' V="' + this.nValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<NF N="' + this.strName + '"';
      strXML += ' V="' + this.nValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.nValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      let str_JSON = '"' + this.getName() + '":' + this.nValue + ",";
      return str_JSON
  }
}
function LongField(b, a) {
  this.strType = "LongField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.lValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.lValue
  }
  ;
  this.setValue = function(a) {
      this.lValue = a
  }
  ;
  this.toXML = function() {
      let strXML = '<LF N="' + this.strName + '"';
      strXML += ' V="' + this.lValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<LF N="' + this.strName + '"';
      strXML += ' V="' + this.lValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.lValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.lValue + ",";
      return str_JSON
  }
}
function FloatField(b, a) {
  this.strType = "FloatField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.fValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.fValue
  }
  ;
  this.setValue = function(a) {
      this.fValue = a
  }
  ;
  this.toXML = function() {
      strXML = '<FF N="' + this.strName + '"';
      strXML += ' V="' + this.fValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<FF N="' + this.strName + '"';
      strXML += ' V="' + this.fValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.fValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.fValue + ",";
      return str_JSON
  }
}
function DoubleField(b, a) {
  this.strType = "DoubleField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.dblValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.dblValue
  }
  ;
  this.setValue = function(a) {
      this.dblValue = a
  }
  ;
  this.toXML = function() {
      strXML = '<DBLF N="' + this.strName + '"';
      strXML += ' V="' + this.dblValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<DBLF N="' + this.strName + '"';
      strXML += ' V="' + this.dblValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.dblValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.dblValue + ",";
      return str_JSON
  }
}
function StringField(b, a) {
  this.strType = "StringField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = b;
  if (a == null)
      a = "";
  this.strValue = a;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.strValue
  }
  ;
  this.setValue = function(a) {
      this.strValue = a
  }
  ;
  this.toXML = function() {
      let strXML = '<STRF N="' + this.strName + '"';
      strXML += ' V="' + encodeToXMLText(this.strValue) + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<STRF N="' + this.strName + '"';
      strXML += ' V="' + encodeToXMLText(this.strValue) + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":\\"' + this.strValue + '\\",';
      return str_JSON
  }
  ;
  this.toJSON = function() {
      let str_JSON = '"' + this.getName() + '":"' + this.strValue + '",';
      return str_JSON
  }
}
function DateField(b, a) {
  this.strType = "DateField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.strValue
  }
  ;
  this.setValue = function(a) {
      if (a.length > 0 && a.length != 10)
          throw "Invalid date format: " + a;
      if (a.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null)
          throw "Invalid date format: " + a;
      this.strValue = a
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.setValue(a);
  this.toXML = function() {
      strXML = '<DF N="' + this.strName + '"';
      strXML += ' V="' + this.strValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<DF N="' + this.strName + '"';
      strXML += ' V="' + this.strValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.strValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.strValue + ",";
      return str_JSON
  }
}
function TimeField(b, a) {
  this.strType = "TimeField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.strValue
  }
  ;
  this.setValue = function(a) {
      if (a.length > 0 && a.length != 8)
          throw "Invalid time format: " + a;
      if (a.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
          throw "Invalid time format: " + a;
      this.strValue = a
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.setValue(a);
  this.toXML = function() {
      strXML = '<TF N="' + this.strName + '"';
      strXML += ' V="' + this.strValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<TF N="' + this.strName + '"';
      strXML += ' V="' + this.strValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.strValue + ",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":' + this.strValue + ",";
      return str_JSON
  }
}
function DateTimeField(b, a) {
  this.strType = "DateTimeField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.strValue
  }
  ;
  this.setValue = function(a) {
      if (a.length == 0) {
          this.strValue = a;
          return
      }
      if (a.length != 19)
          throw "Invalid datetime format: " + a;
      if (a.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
          throw "Invalid datetime format: " + a;
      this.strValue = a
  }
  ;
  this.strName = b;
  if (a == null)
      a = 0;
  this.setValue(a);
  this.toXML = function() {
      strXML = '<DTF N="' + this.strName + '"';
      strXML += ' V="' + this.strValue + '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var c = "", b = 0; b < a; b = b + 1)
          c += "\t";
      strXML = c + '<DTF N="' + this.strName + '"';
      strXML += ' V="' + this.strValue + '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":"' + this.strValue + "\",";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":"' + this.strValue + "\",";
      return str_JSON
  }
}
function ByteArrayField() {
  this.strType = "ByteArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.bysValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return bysValue.length
  }
  ;
  this.getValue = function() {
      return this.bysValue
  }
  ;
  this.setValue = function(a) {
      this.bysValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.bysValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      this.bysValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<BYAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.bysValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.bysValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<BYAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.bysValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.bysValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.bysValue.length; a = a + 1) {
          var b = a == this.bysValue.length - 1 ? "" : ",";
          str_JSON += "" + this.bysValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.bysValue.length; a = a + 1) {
          var b = a == this.bysValue.length - 1 ? "" : ",";
          str_JSON += "" + this.bysValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function ShortArrayField() {
  this.strType = "ShortArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.shsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return shsValue.length
  }
  ;
  this.getValue = function() {
      return this.shsValue
  }
  ;
  this.setValue = function(a) {
      this.shsValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.shsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      this.shsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<SAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.shsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.shsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<SAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.shsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.shsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.shsValue.length; a = a + 1) {
          var b = a == this.shsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.shsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.shsValue.length; a = a + 1) {
          var b = a == this.shsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.shsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function IntegerArrayField() {
  this.strType = "IntegerArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.nsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return nsValue.length
  }
  ;
  this.getValue = function() {
      return this.nsValue
  }
  ;
  this.setValue = function(a) {
      this.nsValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.nsValue[a]
  }
  ;
  this.setValueAt = function(a, b) {
      this.nsValue[a] = b
  }
  ;
  this.toXML = function() {
      strXML = '<NAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.nsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.nsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<NAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.nsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.nsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.nsValue.length; a = a + 1) {
          var b = a == this.nsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.nsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.nsValue.length; a = a + 1) {
          var b = a == this.nsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.nsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function LongArrayField() {
  this.strType = "LongArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.lsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return lsValue.length
  }
  ;
  this.getValue = function() {
      return this.lsValue
  }
  ;
  this.setValue = function(a) {
      this.lsValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.lsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      this.lsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<LAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.lsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.lsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<LAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.lsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.lsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.lsValue.length; a = a + 1) {
          var b = a == this.lsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.lsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.lsValue.length; a = a + 1) {
          var b = a == this.lsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.lsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function FloatArrayField() {
  this.strType = "FloatArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.fsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return fsValue.length
  }
  ;
  this.getValue = function() {
      return this.fsValue
  }
  ;
  this.setValue = function(a) {
      this.fsValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.fsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      this.fsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<FAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.fsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.fsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<FAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.fsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.fsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.fsValue.length; a = a + 1) {
          var b = a == this.fsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.fsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.fsValue.length; a = a + 1) {
          var b = a == this.fsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.fsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function DoubleArrayField() {
  this.strType = "DoubleArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.dblsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return dblsValue.length
  }
  ;
  this.getValue = function() {
      return this.dblsValue
  }
  ;
  this.setValue = function(a) {
      this.dblsValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.dblsValue[a]
  }
  ;
  this.setValueAt = function(a) {
      this.dblsValue[a] = dblValue
  }
  ;
  this.toXML = function() {
      strXML = '<DBLAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.dblsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.dblsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<DBLAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.dblsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.dblsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.dblsValue.length; a = a + 1) {
          var b = a == this.dblsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.dblsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.dblsValue.length; a = a + 1) {
          var b = a == this.dblsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.dblsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function StringArrayField() {
  this.strType = "StringArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.strsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return strsValue.length
  }
  ;
  this.getValue = function() {
      return this.strsValue
  }
  ;
  this.setValue = function(a) {
      this.strsValue = a
  }
  ;
  this.getValueAt = function(a) {
      return this.strsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      this.strsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<STRAF N="' + this.strName + '">';
      for (var a = 0; a < this.strsValue.length; a = a + 1)
          strXML += "<STR>" + encodeToXMLText(this.strsValue[a]) + "</STR>";
      strXML += "</STRAF>";
      return strXML
  }
  ;
  this.toXMLWithIndent = function(c) {
      if (c == null)
          c = 0;
      for (var b = "", a = 0; a < c; a = a + 1)
          b += "\t";
      strXML = b + '<STRAF N="' + this.strName + '">\r\n';
      for (var a = 0; a < this.strsValue.length; a = a + 1)
          strXML += b + "\t<STR>" + encodeToXMLText(this.strsValue[a]) + "</STR>\r\n";
      strXML += b + "</STRAF>\r\n";
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON +=  '"' + this.strsValue[a] + '"' + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function DateArrayField() {
  this.strType = "DateArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.strsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return strsValue.length
  }
  ;
  this.getValue = function() {
      return this.strsValue
  }
  ;
  this.setValue = function(b) {
      for (var a = 0; a < b.length; a = a + 1) {
          if (b[a].length == 0)
              continue;
          if (b[a].length != 10)
              throw "Invalid date format: " + b[a];
          if (b[a].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null)
              throw "Invalid date format: " + b[a];
      }
      this.strsValue = b
  }
  ;
  this.getValueAt = function(a) {
      return this.strsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      if (a.length > 0 && a.length != 10)
          throw "Invalid date format: " + a;
      else if (a.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null)
          throw "Invalid date format: " + a;
      this.strsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<DAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.strsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<DAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.strsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function TimeArrayField() {
  this.strType = "TimeArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.strsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return strsValue.length
  }
  ;
  this.getValue = function() {
      return this.strsValue
  }
  ;
  this.setValue = function(b) {
      for (var a = 0; a < b.length; a = a + 1) {
          if (b[a].length == 0)
              continue;
          if (b[a].length != 8)
              throw "Invalid time format: " + b[a];
          if (b[a].match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
              throw "Invalid time format: " + b[a];
      }
      this.strsValue = b
  }
  ;
  this.getValueAt = function(a) {
      return this.strsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      if (a.length > 0 && a.length != 8)
          throw "Invalid time format: " + a;
      else if (a.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
          throw "Invalid time format: " + a;
      this.strsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<TAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.strsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<TAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.strsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function DateTimeArrayField() {
  this.strType = "DateTimeArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.strsValue = [];
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return strsValue.length
  }
  ;
  this.getValue = function() {
      return this.strsValue
  }
  ;
  this.setValue = function(b) {
      for (var a = 0; a < b.length; a = a + 1) {
          if (b[a].length == 0)
              continue;
          if (b[a].length != 19)
              throw "Invalid datetime format: " + b[a];
          if (b[a].match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
              throw "Invalid datetime format: " + b[a];
      }
      this.strsValue = b
  }
  ;
  this.getValueAt = function(a) {
      return this.strsValue[a]
  }
  ;
  this.setValueAt = function(b, a) {
      if (a.length > 0 && a.length != 19)
          throw "Invalid datetime format: " + a;
      else if (a.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
          throw "Invalid datetime format: " + a;
      this.strsValue[b] = a
  }
  ;
  this.toXML = function() {
      strXML = '<DTAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.strsValue[a]
      }
      strXML += '"/>';
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<DTAF N="' + this.strName + '"';
      strXML += ' V="';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          if (a > 0)
              strXML += ",";
          strXML += this.strsValue[a]
      }
      strXML += '"/>\r\n';
      return strXML
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
  ;
  this.toJSON = function() {
      str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.strsValue.length; a = a + 1) {
          var b = a == this.strsValue.length - 1 ? "" : ",";
          str_JSON += "" + this.strsValue[a] + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function CDOField() {
  this.strType = "CDOField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.cdoValue = null;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getValue = function() {
      return this.cdoValue
  }
  ;
  this.setValue = function(a) {
      this.cdoValue = a
  }
  ;
  this.toXML = function(a) {
      strXML = '<CDOF N="' + this.strName + '">';
      strXML += this.cdoValue.toXML(a + 1);
      strXML += "</CDOF>";
      return strXML
  }
  ;
  this.toXMLWithIndent = function(a) {
      if (a == null)
          a = 0;
      for (var b = "", c = 0; c < a; c = c + 1)
          b += "\t";
      strXML = b + '<CDOF N="' + this.strName + '">\r\n';
      strXML += this.cdoValue.toXMLWithIndent(a + 1);
      strXML += b + "</CDOF>\r\n";
      return strXML
  }
  ;
  this.toJSON = function() {
      let str_JSON = '"' + this.getName() + '":' + this.cdoValue.toJSON() + ",";
      return str_JSON
  }
  ;
  this.toJSONString = function() {
      str_JSON = '\\"' + this.getName() + '\\":' + this.cdoValue.toJSON() + ",";
      return str_JSON
  }
}
function CDOArrayField() {
  this.strType = "CDOArrayField";
  this.getType = function() {
      return this.strType
  }
  ;
  this.strName = "";
  this.cdosValue = null;
  this.getName = function() {
      return this.strName
  }
  ;
  this.setName = function(a) {
      this.strName = a
  }
  ;
  this.getLength = function() {
      return cdosValue.length
  }
  ;
  this.getValue = function() {
      return this.cdosValue
  }
  ;
  this.setValue = function(a) {
      this.cdosValue = a
  }
  ;
  this.toXML = function(b) {
      strXML = '<CDOAF N="' + this.strName + '">';
      for (var a = 0; a < this.cdosValue.length; a = a + 1)
          strXML += this.cdosValue[a].toXML(b + 1);
      strXML += "</CDOAF>";
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + '<CDOAF N="' + this.strName + '">\r\n';
      for (var a = 0; a < this.cdosValue.length; a = a + 1)
          strXML += this.cdosValue[a].toXMLWithIndent(b + 1);
      strXML += c + "</CDOAF>\r\n";
      return strXML
  }
  ;
  this.toJSONString = function() {
      let str_JSON = '\\"' + this.getName() + '\\":[';
      for (var a = 0; a < this.cdosValue.length; a = a + 1) {
          var b = a == this.cdosValue.length - 1 ? "" : ",";
          str_JSON += "" + this.cdosValue[a].toJSON() + b
      }
      str_JSON += "]";
      return str_JSON.toString()
  }
  ;
  this.toJSON = function() {
      let str_JSON = '"' + this.getName() + '":[';
      for (var a = 0; a < this.cdosValue.length; a = a + 1) {
          var b = a == this.cdosValue.length - 1 ? "" : ",";
          str_JSON += "" + this.cdosValue[a].toJSON() + b
      }
      str_JSON += "],";
      return str_JSON
  }
}
function CDO() {
  this.hmItem = new HashMap;
  this.setField = function(b, a) {
      this.hmItem.put(b, a)
  }
  ;
  function b(g, e) {
      if (g < 0)
          return -1;
      var f = e.charAt(g)
        , b = 0
        , h = -1
        , i = -1
        , c = " ";
      switch (f) {
      case "(":
          c = ")";
          break;
      case "{":
          c = "}";
          break;
      case "[":
          c = "]";
          break;
      case ")":
          c = "(";
          break;
      case "}":
          c = "{";
          break;
      case "]":
          c = "[";
          break;
      default:
          return -1
      }
      var a = 0
        , d = null;
      switch (f) {
      case "(":
      case "{":
      case "[":
          for (a = g + 1; a < e.length; a = a + 1) {
              d = e.charAt(a);
              if (d == f)
                  b = b + 1;
              else if (d == c)
                  if (b === 0) {
                      i = a;
                      break
                  } else
                      b = b - 1
          }
          return i;
      case ")":
      case "}":
      case "]":
          for (a = g - 1; a >= 0; a = a - 1) {
              d = e.charAt(a);
              if (d == f)
                  b = b + 1;
              else if (d == c)
                  if (b === 0) {
                      h = a;
                      break
                  } else
                      b = b - 1
          }
          return h;
      default:
          return -1
      }
  }
  this.fromXMLText = function(b) {
      var a = loadXML(b);
      return this.fromXML(a)
  }
  ;
  this.fromXML = function(q) {
      for (var p = q.childNodes, m = 0; m < p.length; m = m + 1) {
          var a = p[m];
          if (a.nodeType != 1)
              continue;
          var r = a.tagName;
          switch (r) {
          case "BYF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new ByteField(c,eval(d));
              this.hmItem.put(c, b);
              break;
          case "SF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new ShortField(c,eval(d));
              this.hmItem.put(c, b);
              break;
          case "NF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new IntegerField(c,eval(d));
              this.hmItem.put(c, b);
              break;
          case "LF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new LongField(c,eval(d));
              this.hmItem.put(c, b);
              break;
          case "FF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new FloatField(c,eval(d));
              this.hmItem.put(c, b);
              break;
          case "DBLF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new DoubleField(c,eval(d));
              this.hmItem.put(c, b);
              break;
          case "STRF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new StringField(c,d);
              this.hmItem.put(c, b);
              break;
          case "BF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new BooleanField(c,d);
              this.hmItem.put(c, b);
              break;
          case "DF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new DateField(c,d);
              this.hmItem.put(c, b);
              break;
          case "TF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new TimeField(c,d);
              this.hmItem.put(c, b);
              break;
          case "DTF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new DateTimeField(c,d);
              this.hmItem.put(c, b);
              break;
          case "CDOF":
              for (var c = a.getAttribute("N"), l = new CDO, h = a.childNodes, n, e = 0; e < h.length; e = e + 1)
                  if (h[e])
                      if (h[e].nodeType == 1) {
                          n = h[e];
                          break
                      }
              l.fromXML(n);
              var b = new CDOField;
              b.setName(c);
              b.setValue(l);
              this.hmItem.put(c, b);
              break;
          case "BYAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new ByteArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "SAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new ShortArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "NAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new IntegerArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "LAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new LongArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "FAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new FloatArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "DBLAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new DoubleArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "STRAF":
              for (var c = a.getAttribute("N"), b = new StringArrayField, i = a.childNodes, k = 0, h = [], j = 0, e = 0; e < i.length; e = e + 1)
                  if (i[e])
                      if (i[e].nodeType == 1) {
                          h[j] = i[e];
                          j = j + 1
                      }
              k = j;
              for (var f = new Array(k), g = 1; g <= k; g = g + 1)
                  if (h[g - 1].text != undefined)
                      f[g - 1] = h[g - 1].text;
                  else
                      f[g - 1] = h[g - 1].textContent;
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "DAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new DateArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "TAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new TimeArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "DTAF":
              var c = a.getAttribute("N")
                , d = a.getAttribute("V")
                , b = new DateTimeArrayField
                , f = d.split(",");
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b);
              break;
          case "CDOAF":
              for (var c = a.getAttribute("N"), b = new CDOArrayField, i = a.childNodes, k = 0, h = [], j = 0, e = 0; e < i.length; e = e + 1)
                  if (i[e])
                      if (i[e].nodeType == 1) {
                          h[j] = i[e];
                          j = j + 1
                      }
              k = j;
              for (var f = new Array(k), g = 1; g <= k; g = g + 1) {
                  var l = new CDO, o;
                  o = h[g - 1];
                  l.fromXML(o);
                  f[g - 1] = l
              }
              b.setName(c);
              b.setValue(f);
              this.hmItem.put(c, b)
          }
      }
  }
  ;
  function a(a, b) {
      var c = 0;
      if (a.charAt(0) >= "0" && a.charAt(0) <= "9")
          eval("nIndex=" + a);
      else
          return b.getFieldValue(a, b);
      return c
  }
  this.getFieldValue = function(a) {
      return getFieldValue(a, this)
  }
  ;
  this.getFieldValue = function(c, g) {
      var f = c.indexOf(".");
      if (f < 0) {
          var d = c.indexOf("[")
            , e = b(d, c);
          if (d < 0 && e < 0)
              return this.hmItem.exists(c) == false ? null : this.hmItem.get(c).getValue();
          else if (d >= 0 && e > 0 && e - d > 1) {
              var l = c.substring(d + 1, e)
                , h = a(l, g);
              return this.hmItem.get(c.substring(0, d)).getValue()[h]
          } else
              throw "Invalid FieldId " + c;
      }
      var d = c.indexOf("[");
      if (d < 0 || f < d) {
          var k = this.hmItem.get(c.substring(0, f));
          if (k == null)
              return null;
          var i = k.getValue();
          if (i instanceof CDO == false)
              throw "Invalid FieldId " + c;
          return i.getFieldValue(c.substring(f + 1), g)
      }
      var e = b(d, c);
      if (e == -1)
          throw "Invalid FieldId " + c;
      var l = c.substring(d + 1, e)
        , h = a(l, g)
        , j = this.hmItem.get(c.substring(0, d));
      return j instanceof CDOArrayField ? j.getValue()[h].getFieldValue(c.substring(e + 2), g) : this.hmItem.get(c.substring(0, d)).getValue()[h]
  }
  ;
  this.getField = function(a) {
      return this.getField(a, this)
  }
  ;
  this.getField = function(c, h) {
      if (c.lastIndexOf("]") == c.length - 1)
          throw "Invalid FieldId " + c;
      if (c.indexOf(".") < 0) {
          var d = c.indexOf("[")
            , e = c.indexOf("]");
          if (d < 0 && e < 0)
              return this.hmItem.exists(c) == false ? null : this.hmItem.get(c);
          else if (d >= 0 && e > 0 && e - d > 1)
              throw "FieldId " + c + " is invalid";
      }
      var g = c.indexOf(".")
        , d = c.indexOf("[");
      if (d < 0 || g < d) {
          var f = this.hmItem.get(c.substring(0, g));
          if (f == null)
              return null;
          else if (f instanceof CDOField == false)
              throw "Invalid FieldId " + c;
          return f.getValue().getField(c.substring(g + 1), h)
      }
      var e = b(d, c);
      if (e == -1)
          throw "Invalid FieldId " + c;
      var i = c.substring(d + 1, e)
        , j = a(i, h)
        , f = this.hmItem.get(c.substring(0, d));
      if (f instanceof CDOArrayField == false)
          throw "Invalid FieldId " + c;
      return f.getValue()[j].getField(c.substring(e + 2), h)
  }
  ;
  this.getByteValue = function(a) {
      return this.getFieldValue(a, this) & 255
  }
  ;
  this.getShortValue = function(a) {
      return this.getFieldValue(a) & 65535
  }
  ;
  this.getIntegerValue = function(a) {
      return this.getFieldValue(a) & 4294967295
  }
  ;
  this.getLongValue = function(a) {
      return this.getFieldValue(a)
  }
  ;
  this.getFloatValue = function(a) {
      return this.getFieldValue(a)
  }
  ;
  this.getDoubleValue = function(a) {
      return this.getFieldValue(a)
  }
  ;
  this.getStringValue = function(a) {
      return this.getFieldValue(a)
  }
  ;
  this.getBooleanValue = function(a) {
      return this.getFieldValue(a)
  }
  ;
  this.getDateValue = function(b) {
      var a = this.getFieldValue(b);
      if (a.length == 0 || a.length == 10) {
          var d = new DateField("","");
          d.setValue(a);
          return a
      } else if (a.length == 19) {
          var c = new DateTimeField("","");
          c.setValue(a);
          return a.substring(0, 10)
      } else
          return null
  }
  ;
  this.getTimeValue = function(b) {
      var a = this.getFieldValue(b);
      if (a.length == 0 || a.length == 8) {
          var d = new TimeField("","");
          d.setValue(a);
          return a
      } else if (a.length == 19) {
          var c = new DateTimeField("","");
          c.setValue(a);
          return a.substring(11, 19)
      } else
          return null
  }
  ;
  this.getDateTimeValue = function(b) {
      var a = this.getFieldValue(b);
      if (a.length == 0)
          return a;
      else if (a.length == 19) {
          var c = new DateTimeField("","");
          c.setValue(a);
          return a
      } else
          return null
  }
  ;
  this.getCDOValue = function(a) {
      return this.getFieldValue(a)
  }
  ;
  this.getByteArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getShortArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getIntegerArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getLongArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getFloatArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getDoubleArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getStringArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getDateArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getTimeArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.getCDOArrayValue = function(a) {
      return this.getFieldValue(a, this)
  }
  ;
  this.setByteValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new ByteField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setShortValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new ShortField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setIntegerValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new IntegerField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setLongValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new LongField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setBooleanValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new BooleanField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setFloatValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new FloatField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setDoubleValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new DoubleField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setStringValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new StringField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setDateValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new DateField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setTimeValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new TimeField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setDateTimeValue = function(c, h) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , g = b(j, c);
          if (g == -1)
              throw "Invalid FieldId " + c;
          var i = getField(c.substring(0, g));
          l = c.substring(g + 1, j);
          var n = a(l, this);
          i.setValueAt(n, h);
          return
      }
      try {
          var i = this.getField(c);
          i.setValue(h)
      } catch (o) {
          for (var f = -1, d = c.length - 1; d >= 0; d = d - 1) {
              var m = c.charAt(d);
              if (m == ".") {
                  f = d;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var e = null;
          if (f == -1)
              e = this;
          else {
              e = this.getFieldValue(c.substring(0, f), this);
              if (e instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(f + 1)
            , i = new DateTimeField(k,h);
          e.setField(k, i)
      }
  }
  ;
  this.setCDOValue = function(c, i) {
      if (c.charAt(c.length - 1) == "]") {
          var l = ""
            , j = c.length - 1
            , h = b(j, c);
          if (h == -1)
              throw "Invalid FieldId " + c;
          var d = getField(c.substring(0, h));
          l = c.substring(h + 1, j);
          var n = a(l, this);
          d.setValueAt(n, i);
          return
      }
      try {
          var d = this.getField(c);
          d.setValue(i)
      } catch (o) {
          for (var g = -1, e = c.length - 1; e >= 0; e = e - 1) {
              var m = c.charAt(e);
              if (m == ".") {
                  g = e;
                  break
              }
              if (m == "]")
                  throw "Invalid FieldId " + c;
          }
          var f = null;
          if (g == -1)
              f = this;
          else {
              f = this.getFieldValue(c.substring(0, g), this);
              if (f instanceof CDO == false)
                  throw "Type mismatch";
          }
          var k = c.substring(g + 1)
            , d = new CDOField;
          d.setName(k);
          d.setValue(i);
          f.setField(k, d)
      }
  }
  ;
  this.setByteArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new ByteArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setShortArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new ShortArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setIntegerArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new IntegerArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setLongArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new LongArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setFloatArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new FloatArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setDoubleArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new DoubleArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setStringArrayValue = function(b, c) {
      for (var h = new Array(c.length), a = 0; a < c.length; a = a + 1)
          h[a] = c[a];
      c = h;
      try {
          var f = this.getField(b);
          f.setValue(c)
      } catch (j) {
          for (var e = -1, a = b.length - 1; a >= 0; a = a - 1) {
              var i = b.charAt(a);
              if (i == ".") {
                  e = a;
                  break
              }
              if (i == "]")
                  throw "Invalid FieldId " + b;
          }
          var d = null;
          if (e == -1)
              d = this;
          else {
              d = this.getFieldValue(b.substring(0, e), this);
              if (d instanceof CDO == false)
                  throw "Type mismatch";
          }
          var g = b.substring(e + 1)
            , f = new StringArrayField;
          f.setName(g);
          f.setValue(c);
          d.setField(g, f)
      }
  }
  ;
  this.setDateArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new DateArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setTimeArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new TimeArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setDateTimeArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new DateTimeArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.setCDOArrayValue = function(a, g) {
      try {
          var e = this.getField(a);
          e.setValue(g)
      } catch (i) {
          for (var d = -1, b = a.length - 1; b >= 0; b = b - 1) {
              var h = a.charAt(b);
              if (h == ".") {
                  d = b;
                  break
              }
              if (h == "]")
                  throw "Invalid FieldId " + a;
          }
          var c = null;
          if (d == -1)
              c = this;
          else {
              c = this.getFieldValue(a.substring(0, d), this);
              if (c instanceof CDO == false)
                  throw "Type mismatch";
          }
          var f = a.substring(d + 1)
            , e = new CDOArrayField;
          e.setName(f);
          e.setValue(g);
          c.setField(f, e)
      }
  }
  ;
  this.getFieldIds = function() {
      return this.hmItem.getKeys()
  }
  ;
  this.exists = function(a) {
      var b = this.getField(a);
      return b == null ? false : true
  }
  ;
  this.removeField = function(b) {
      var d = this.hmItem.remove(b);
      if (d != null)
          return;
      var c = parseFieldId(b);
      if (c == null)
          throw new RuntimeException("Invalid FieldId " + b);
      if (c.nType == 1) {
          var e = b.lastIndexOf(".");
          this.getCDOValue(b.substring(0, e)).removeField(b.substring(e + 1));
          return
      }
      var g = a(c.strIndexFieldId, this)
        , f = parseFieldId(c.strMainFieldId);
      d = this.getField(f.strFieldId, this);
      d.getValue().splice(g, 1)
  }
  ;
  this.toXML = function(c) {
      let strXML = "<CDO>";
      for (var b = this.hmItem.getValues(), a = 0; a < b.length; a = a + 1)
          strXML += b[a].toXML(c + 1);
      strXML += "</CDO>";
      return strXML
  }
  ;
  this.toXMLWithIndent = function(b) {
      if (b == null)
          b = 0;
      for (var c = "", a = 0; a < b; a = a + 1)
          c += "\t";
      strXML = c + "<CDO>\r\n";
      for (var d = this.hmItem.getValues(), a = 0; a < d.length; a = a + 1)
          strXML += d[a].toXMLWithIndent(b + 1);
      strXML += c + "</CDO>\r\n";
      return strXML
  }
  ;
  this.toJSON = function() {
      var str_JSON = "{";
      for (var c = this.hmItem.getValues(), a = 0; a < c.length; a = a + 1)
          str_JSON += c[a].toJSON();
      var b = str_JSON.lastIndexOf(",")
        , d = str_JSON.length;
      if (b == d - 1)
          str_JSON = str_JSON.substring(0, b);
      str_JSON += "}";
      return str_JSON
  }
  ;
  this.toJSONString = function() {
      str_JSON = "{";
      for (var c = this.hmItem.getValues(), a = 0; a < c.length; a = a + 1)
          str_JSON += c[a].toJSONString();
      var b = str_JSON.lastIndexOf(",")
        , d = str_JSON.length;
      if (b == d - 1)
          str_JSON = str_JSON.substring(0, b);
      str_JSON += "}";
      return str_JSON
  }
  ;
  this.toString = function() {
      return this.toJSONString()
  }
}

export default CDO