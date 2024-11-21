const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');


// SSE
http.createServer(function (req, res) {
  var fileName = req.url;
  if (fileName === "/chat") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("event: chatStream\n");
    res.write("data: Hi \n\n");
    interval = setInterval(function () {
      res.write("data: Hello \n\n");
    }, 1000);
    req.connection.addListener("close", function () {
      clearInterval(interval);
      res.end();
    }, false);
  }
}).listen(4456);


// static
// 从命令行参数获取root目录，默认是当前目录:
var root = path.join(__dirname, './', 'client.html');
//创建服务器
var server = http.createServer(function (request, response) {
  //获得ur的path 类似'/css/index.css'
  var pathName = url.parse(request.url).pathname;
  //获得对应的本地文件路径 类似’static/css/index.css‘
  var filePath = path.join(root);
  //获取文件状态
  console.log(filePath);
  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filePath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });
});
server.listen(8080);
console.log('Server is running at http://127.0.0.1:4458/');