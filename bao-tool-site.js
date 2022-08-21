let express = require('express')
let bodyParser = require('body-parser')
let compression = require('compression')
let server = express()

//尽量在其他中间件前使用compression
server.use(compression());
server.use(bodyParser.json({limit: '50mb'}))
server.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

//the cores config
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (req.method == 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

const port = 10001

server.listen(port, () => {
    console.log(`正在监听 ${port} 端口`)
})
server.use(express.static('./dist'))