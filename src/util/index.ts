import jsonSchema2JavaBean from './jsonSchema2JavaBean'

/**
 * 参照 java 日期格式标准
 */
class DateFormat {
  public static DATE_TIME_FMT = "yyyy-MM-dd hh:mm:ss";
  public static DATE_FMT = "yyyy-MM-dd";

  date: Date;

  constructor(date: Date = new Date()) {
    this.date = date;
  }

  format(fmt: string) {
    const date = this.date;
    const o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        // @ts-ignore
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
}

export {
  DateFormat,
  jsonSchema2JavaBean,
}