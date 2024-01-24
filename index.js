const http = require('http');
const { URL } = require('url');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const targetServer = process.env.TARGET_SERVER || 'http://127.0.0.1:19099';
const backEnd = new URL(targetServer)

let server = http.createServer(function (req0, res0) {
  const url = req0.url
  const method = req0.method

  const options = {
    hostname: backEnd.hostname,
    port: backEnd.port,
    path: url,
    method: method
  }

  const req1 = http.request(options, (res1) => {
    res1.on('data', (chunk) => {
      res0.write(chunk)
    });
    res1.on('end', () => {
      res0.end()
    });
  }).on("error", (err) => {
    console.log(err)
    res0.end()
  })
  req0.on('data', (chunk) => {
    req1.write(chunk)
  })

  req0.on('end', () => {
    req1.end()
  })
});
server.listen(19999, () => {
  console.log('listening on 19999')
});
