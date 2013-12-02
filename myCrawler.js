/**
 * Created by Rwing on 13-12-2.
 */
var http = require('http'),
    fs = require('fs');

function myCrawler(){}
myCrawler.prototype.get = function(url, callback, charset) {
    var defaultCharset = "utf8";
    if(charset)
        defaultCharset = charset;
    http.get(url,function(res){
        var data = "";
        var status = res.statusCode;
        var headers = res.headers;
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end',function(){
            callback(data, status, headers);
        });
    })
}
var _myCrawler = new myCrawler();
module.exports = _myCrawler;