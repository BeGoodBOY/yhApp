export const outputmoney =(number) => {
  number = number.replace(/\,/g, "");
  if(isNaN(number) || number == "")return "";
  number = Math.round(number * 100) / 100;
      if (number < 0)
          return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
      else
          return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
  } 
//格式化金额
const outputdollars =(number) =>{
  if (number.length <= 3)
      return (number == '' ? '0' : number);
  else {
      var mod = number.length % 3;
      var output = (mod == 0 ? '' : (number.substring(0, mod)));
      for (var i = 0; i < Math.floor(number.length / 3); i++) {
          if ((mod == 0) && (i == 0))
              output += number.substring(mod + 3 * i, mod + 3 * i + 3);
          else
              output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
      return (output);
  }
}
export const  outputcents =(amount) => {
  amount = Math.round(((amount) - Math.floor(amount)) * 100);
  return (amount < 10 ? '.0' + amount : '.' + amount);
}