const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const targetServer = process.env.TARGET_SERVER;

let server = http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: targetServer
  });
  proxy.on('error', function (err) {
    console.log(err);
  });
});
server.listen(19099,()=>{
    console.log('listening on 19099')
});

