/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/12.
 */
define(['zepto'],function ($) {
    var GetQueryString = function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    };
    var formatTime = function (time) {
        var unixTimestamp = new Date( time * 1000);
        var year = unixTimestamp.getFullYear();
        var month = unixTimestamp.getMonth()+1;
        var date = unixTimestamp.getDate();
        return [year,month,date].join('-');
    };
    return {
        GetUrlParam:GetQueryString,
        FormatTime:formatTime
    };
});