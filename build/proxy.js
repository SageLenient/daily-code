/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-12-10 15:09:47
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-12-10 15:22:54
 * @Description: IP 热切换
 */
const http = require('http')
const httpProxy = require('http-proxy')
const cprocess = require("child_process")
const readline = require('readline')
const os = require('os')

let target = process.argv[2] || '10.0.32.211:8080';
let server;
// 获取 IP
const getIP = () => {
  // if (process.env.LOCAL_IP) return process.env.LOCAL_IP;
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iFace = interfaces[devName];
    for (let i = 0; i < iFace.length; i++) {
      let alias = iFace[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
// 检查可用端口
async function portInUsed(port) {
  return new Promise((resolve, reject) => {
    let checkServer = http.createServer().listen(port, '0.0.0.0');
    checkServer.on('listening', () => {
      checkServer.close();
      resolve(port);
    });
    checkServer.on('error', (err) => {
      if (err.code == 'EADDRINUSE') {
        port++;
        reject(err);
      }
    });
  });
}
// 递增获取端口直到找到可用端口为止
const tryUsePort = (port, _portAvailableCallback) => {
  portInUsed(port).then((port) => {
    _portAvailableCallback(port);
  }).catch((err) => {
    console.log(port + " ====被占用====：\n");
    port++;
    tryUsePort(port, _portAvailableCallback);
  })
}

const createServer = (port) => {
  // 创建代理服务
  const proxy = httpProxy.createProxyServer();
  const createProxy = (host) => {
    server = http.createServer((req, res) => {
      proxy.web(req, res, {
        target: `http://${host}`
      })
      proxy.on('error', (err) => {})
    })
    console.log('代理服务创建成功');
    server.listen(port, '0.0.0.0');
    // 请求超时15s
    server.timeout = 15000;
  }
  createProxy(target)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  // 监听键入回车事件
  rl.on('line', (str) => {
    if (str.substr(0, 6) === 'switch') {
      const ip = str.split(' ')[1]
      if (!ip) {
        return console.error('请输入 IP')
      }
      console.log(`您切换的IP: ${ip}`)
      server.close()
      console.log('代理服务关闭中')
      createProxy(ip)
    }
  })
  console.log(getIP(), port);
  // 启动项目服务
  let cmd = `npm run dev -- --env.target=${getIP()}:${port}`
  let dev = cprocess.exec(
    cmd, {
      detached: true,
      maxBuffer: 8 * 1024 * 1024 // 8M
    },
    function (error, stdout, stderr) {
      if (error) console.log(error)
    },
  )
  dev.stdout.pipe(process.stdout);
  dev.stderr.pipe(process.stderr);
}

tryUsePort(9527, (port) => {
  createServer(port)
})