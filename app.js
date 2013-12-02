/**
 * Created by Rwing on 13-12-2.
 */
var http = require("http");
var async = require("async");
var myCrawler = require("./myCrawler");
//var iconv = require('iconv-lite');
//var BufferHelper = require('bufferhelper');

(function () {
    var args = process.argv.splice(2);
    if (args.length < 2) {
        console.log("args error，the correct format is: node app.js keyword ext1 [ext2 ext3...]")
    }
    var urlList = [];
    var registableList = [];
    var apiUrl = "http://www.51web.com/index/product/DomainIndexAction!checkForAjax.action?domain={0}&idx=1";
    for (var i = 1; i < args.length; i++) {
        var domain = args[0] + args[i];
        urlList.push({name: domain, url: apiUrl.replace("{0}", domain)});
    }
    //调用async来进行流程控制
    async.each(urlList, function (item, callback) {
        myCrawler.get(item.url, function (data) {
            var result = JSON.parse(data);
            if (result.registable)
                registableList.push(item.name);
            callback(null);
        });
    }, function (err) {
        console.log("finish, the registable domain names: ");
        console.log(registableList);
    });

    console.log("searching ... please wait ...");
})();
