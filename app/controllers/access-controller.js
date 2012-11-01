
module.exports = function(app){
    var handlebars = require("handlebars");
    var dateFormat = require('dateformat');
    var fs = require('fs');
    app.get('/show', function(req, res, next){
        //访问权限
        req.query.tpl = {name:'blue'};
        var url = req.query['url'];
        console.log('request url: ' + url);
        next();
    },function(req, res, next){
       //查找ip位置，入库
        next();
    },function(req, res){
        console.log(req.query['tpl']);
        //渲染模版，返回结果
        fs.readFile(__dirname + '../../../static/tpl/blue/index.html','utf-8', function (err, data) {
            if (err) throw err;
            data = data.replace( /\r|\n/ig , '' ); //去除换行及回车
            data = data.replace( /\/\*[\w\W]*?\*\//ig , ''); //去除注释
            data = data.replace( / {2,}/ig , ' '); //去除多余空格
            data = data.replace(/\'/g,'\\\''); //转义'
            console.log(data);
            res.writeHead(200, {"Content-Type": "application/x-javascript"});
            var callback = req.query["callback"];
            var tpl = [ callback, '(\'', data, '\')'];
            var template = handlebars.compile(tpl.join(''));
            var result = template({
                name:'miemiedev',
                highlight:true,
                title:'哈哈哈',
                pubDate:'08-15',
                basePath: 'http://'+req.host+':3000'
            })
            res.write(result);
            res.end();
        });
    });
}
