const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const next = require('next')
const path = require('path')
const router = require('./server-router')
const proxy = require('http-proxy-middleware')

const dev = process.env.NODE_ENV!=='production'  //判断是开发状态还是正式服务器状态
const app = next({ dev });                        //初始化NextJs的app
const handle = app.getRequestHandler()            //用这个handle来处理http响应

//prepare即等待app将pages下的目录全部编译完成
app.prepare().then(()=>{
    const server = new Koa()

    server.use(koaBody())

    server.keys = ["xuJunYuanBlog"];  // 这个是配合signed属性的签名key

    const session_config = {
        key: 'jy:sess', /**  cookie的key。 (默认是 koa:sess) */
        maxAge: 60000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
        autoCommit: true, /** 自动提交到响应头。(默认是 true) */
        overwrite: true, /** 是否允许重写 。(默认是 true) */
        httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
        signed: true, /** 是否签名。(默认是 true) */
        rolling: false, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
        renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
    };
    server.use(session(session_config,server))
    //跨域代理
    server.use(async (ctx, next) => {
        if(ctx.url.startsWith('/cityjson')) {
            ctx.respond = false
            return proxy({
                target: 'http://pv.sohu.com', // 服务器地址
                changeOrigin: true,
            })(ctx.req, ctx.res, next)
        }
        return next()
    })

    server.use(router.routes()).use(router.allowedMethods());

    server.use(require('koa-static')( path.join(__dirname,'public') ));


    server.use(async (ctx, next) => {
        // ctx.cookies.set('id', 'userid:xxxxx')
        // ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })


    server.listen(3000,()=>{
        console.log('koa server listening on 3000 port')
    })
    }
)

