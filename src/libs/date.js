//时间格式转换
function date(type, time) {
    let date = new Date(parseInt(time));
    let Y = date.getFullYear('YY') + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();
    let H = date.getHours();
    let MM = date.getMinutes();
    //月日时分
    if (type == 'MDHMM'){
        return  M + D +' '+ H + ':' + MM;
    }
    else if(type == 'YMD'){
        return  Y + M + D;
    }
}
export default date;