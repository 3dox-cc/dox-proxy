const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const targetServer = process.env.TARGET_SERVER;

proxy.on('proxyReq', function (proxyReq, req, res, options) {
  //proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

let server = http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: targetServer,
    changeOrigin: true
  });
  proxy.on('error', function (err) {
    console.log(err);
  });
});
server.listen(19999, () => {
  console.log('listening on 19999')
});

