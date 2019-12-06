const Router = require('koa-router') // koa 路由中间件
const mysql = require('./mysql');
const mailer = require('../lib/sendEmail');
const fs = require('fs')
const path = require('path')


//验证码
const svgCaptcha = require('svg-captcha');
const codeConfig = {
    size: 4,// 验证码长度
    ignoreChars: '0o', // 验证码字符中排除 0o1i
    noise: 4, // 干扰线条的数量
    height: 25,
    width:70,
    fontSize:35,
    background:"#C4C1C1",
    color:true,  //是否颜色不同
}
//加密
const md5 = require('md5')
const salt = '许洋溢最帅'
const encode=(pwd)=>{
    return md5(md5(pwd+salt,16),32)
}
//工具包
const { getNowFormatDate2 } = require("../lib/getDate")
const { write,read,deleteFile } =require('../lib/fileOparations')
const router = new Router()
function base64ToString(base64Str){
    return Buffer.from(base64Str,'base64').toString();
}

//配置相关
const PicSavePath = path.join(__dirname,'../public/articles')
const MdSavePath = path.join(__dirname,'./mysql/articles')



//获取验证码接口
router.get('/captcha',async (ctx)=>{
    let captcha = svgCaptcha.create(codeConfig);

    ctx.session.captcha = captcha.text.toLowerCase()
    ctx.body = captcha.data
});
//获取邮箱验证码
router.post('/getEmailCaptcha', async (ctx)=>{
    let captcha = svgCaptcha.create(codeConfig);
    ctx.session.emailCaptcha = captcha.text.toLowerCase()

    let mailOptions={
        from:'junyuanblog@163.com',
        to:ctx.request.body.email,
        subject:'欢迎注册均远的博客！',//主题
        text:`【均远】感谢关注，本次注册的验证码为：${captcha.text.toLowerCase()}（有效时限60s）\n任何技术讨论、交流均可通过该邮箱与我联系，或者博客留言，再次感谢关注！`,
    };
    await mailer.sendMail(mailOptions,(error,info)=>{
        if(error) { return ctx.body={error:'服务器出错，请稍后再试'} }
    });
    return ctx.body={code:'0'}
});
//找回密码时的邮箱验证码
router.post('/resetEmailCaptcha', async (ctx)=>{
    let captcha = svgCaptcha.create(codeConfig);
    ctx.session.resetEmailCaptcha = captcha.text.toLowerCase()

    let mailOptions={
        from:'junyuanblog@163.com',
        to:ctx.request.body.email,
        subject:'均远的博客:重置密码！',//主题
        text:`【均远】您正在通过邮箱重置密码，本次邮箱验证码为：${captcha.text.toLowerCase()}（有效时限60s）`,
    };
    await mailer.sendMail(mailOptions,(error,info)=>{
        if(error) { return ctx.body={error:'服务器出错，请稍后再试'} }
    });
    return ctx.body={code:'0'}
});



//用户信息，包括登录、注册
router.post('/userInfo', async (ctx) => {
    try{
        let data = ctx.request.body
        //存在mail为注册，否则为登陆操作
        if(data.email){
            if(data.eCaptcha!==ctx.session.emailCaptcha){ return ctx.body={msg:'邮箱验证码错误',code:1} }

            let user1 = await mysql.query(`select * from user where name="${data.user}"`)
            user1=JSON.parse(JSON.stringify(user1))

            if (user1[0]){ return ctx.body={ msg:'用户名已存在！',code:1 } }

            let user2 = await mysql.query(`select * from user where email="${data.email}"`)
            user2=JSON.parse(JSON.stringify(user2))

            if (user2[0]){ return ctx.body={ msg:'该邮箱已被注册！',code:1 } }

            await mysql.query(`insert into user (name,pwd,email) values ('${data.user}','${encode(data.pwd)}','${data.email}')`)

            ctx.cookies.set('uid', Buffer.from(data.user).toString('base64'), {
                domain: 'localhost', // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            })
            return ctx.body={user:data.user,code:0,redirect:'/registerSuccess'}
        }
        else {

            if(data.code!==ctx.session.captcha){ return ctx.body={msg:'验证码错误',code:1} }

            let user = await mysql.query(`select * from user where name="${data.user}"`)
            user=JSON.parse(JSON.stringify(user))

            if (!user[0]){ return ctx.body={ msg:'用户名不存在',code:1 } }

            if (encode(data.pwd)!==user[0].pwd){
                return ctx.body={msg:'用户名或密码错误',code:1}
            }

            ctx.cookies.set('uid', Buffer.from(data.user).toString('base64'), {
                domain: 'localhost', // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            })
            return ctx.body={user:user[0].name,code:0,redirect:'/'}
        }
    }catch (e) {
        console.log(e)
        return ctx.body={ msg:'服务器正在维护，请稍候再试',code:1 }
    }
});
//用户重置密码
router.post('/userReset', async (ctx) => {
    try{
        let data = ctx.request.body

        if(data.eCaptcha!==ctx.session.resetEmailCaptcha){ return ctx.body={msg:'邮箱验证码错误',code:1} }

        let user1 = await mysql.query(`select * from user where email="${data.email}"`)
        user1=JSON.parse(JSON.stringify(user1))
        if (!user1[0]){ return ctx.body={ msg:'该邮箱尚未注册！',code:1 } }

        await mysql.query(`update user set pwd='${encode(data.pwd)}' where email='${data.email}' `)
        let user = await mysql.query(`select * from user where email="${data.email}"`)
        user=JSON.parse(JSON.stringify(user))
        ctx.session.user = user[0].name

        return ctx.body={user:user[0].name,code:0,redirect:'/resetSuccess'}

        }catch (e) {
            return ctx.body={ msg:'服务器正在维护，请稍候再试',code:1 }
        }
});
//根据cookie初始化用户状态
router.post('/userInit',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){
            u = Buffer.from(u,'base64').toString()
            let users = await mysql.query(`select * from user where name='${u}'`)
            let user = JSON.parse(JSON.stringify(users))[0]

            if (user){ return ctx.body={ code:0,user:user.name } }
        }
        return ctx.body={code:1}

    }catch (e) {
        console.log(e);
        return ctx.body={code:1}
    }

});
//用户退出，清除cookie
router.post('/userLogout',async (ctx)=>{
    try{
        ctx.cookies.set('uid','',{ signed:true,maxAge:0})

        return ctx.body={code:0}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1}
    }

});
//获取用户
router.post('/users-backend/getAll',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let users = await mysql.query('select * from user')
        users = JSON.parse(JSON.stringify(users))

        return ctx.body={code:0,users:users}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据库查询出错'}
    }

});
//删除用户
router.post('/user-backend/delete',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        await mysql.query(`delete from user where id='${ctx.request.body.id}'`)
        return ctx.body={code:0}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据删除出错！'}
    }
});


//上传文章
router.post('/article-backend/upload',async (ctx) => {
    let u = ctx.cookies.get('uid')
    if(u){ u = Buffer.from(u,'base64').toString() }
    if(u!=='许洋溢'){ return ctx.body={code:1} }

    const {img,md,title,intro,cls} = ctx.request.body;
    let create_time = getNowFormatDate2().replace(/[- :]/g,'')

    //pic文件保存在public目录下方便读取，和上传其他文件
    let picPath=path.join(PicSavePath,`./${create_time}.png`).replace(/\\/g,'/')
    //md文件保存在mysql目录下
    let filePath=path.join(MdSavePath,`./${create_time}.md`).replace(/\\/g,'/')
    let dataBuffer = Buffer.from(img, 'base64');
    try{
        await write(picPath,dataBuffer);
        await write(filePath,base64ToString(md));
        await mysql.query(`insert into arti (title,intro,file,pic,cls,create_time,pageviews) values
                        (?,?,?,?,?,?,?)`,[title,intro,filePath,picPath,cls,create_time,0])
    }catch (e) {
        console.log(e)
        //数据库操作在后，如果数据库插入失败，应该讲之前存储的数据删除
        if(fs.existsSync(picPath)){ fs.unlinkSync(picPath)}
        if(fs.existsSync(filePath)){ fs.unlinkSync(filePath)}

        return ctx.body={code:1,msg:'上传数据库失败，请检查文件是否符合要求' }
    }

    return ctx.body={code:0}
});
//获取所有文章
router.post('/articles/getAll',async (ctx) => {
    try{
        let articles = await mysql.query('select * from arti')
        articles = JSON.parse(JSON.stringify(articles))
        return ctx.body={code:0,articles:articles}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据库查询出错'}
    }
});
//修改指定文章
router.post('/article-backend/alter',async (ctx) => {
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1,msg:"none"} }

        let {i,title,intro,cls,create_time,pageviews} = ctx.request.body
        let t = await mysql.query(`select * from arti where id='${i}'`)
        t = JSON.parse(JSON.stringify(t))[0]

        let fOld = t.file
        let fNew = fOld.replace(/\d+(?=\.md)/,create_time)
        let pOld = t.pic
        let pNew = pOld.replace(/\d+(?=\.png)/,create_time)

        await mysql.query(`update arti set title='${title}',intro='${intro}',file='${fNew}',pic='${pNew}',cls='${cls}',create_time='${create_time}',pageviews='${pageviews}' where id='${i}'`)
        fs.renameSync(fOld,fNew)
        fs.renameSync(pOld,pNew)

        return ctx.body={code:0}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据修改出错！'}
    }
});
//删除指定文章
router.post('/articles-backend/delete',async (ctx) => {
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let t = await mysql.query(`select * from arti where id='${ctx.request.body.id}'`)
        t = JSON.parse(JSON.stringify(t))[0]

        await mysql.query(`delete from arti where id='${ctx.request.body.id}'`)
        let dirPath = path.join(__dirname,`./mysql/articles/${t.create_time}`)
        deleteFile(dirPath)

        return ctx.body={code:0}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据删除出错！'}
    }
});
//客户端获取文章内容
router.post('/articles/getContent',async (ctx)=>{
    let num = ctx.request.body.file
    try{
        let Ar = await mysql.query(`select id,file,pageviews from arti where create_time='20${num}'`)
        Ar = JSON.parse(JSON.stringify(Ar))[0]

        await mysql.query(`update arti set pageviews='${Ar.pageviews+1}' where id='${Ar.id}'`)
        let res = await read(Ar.file)
        return ctx.body={code:0,data:res,artiId:Ar.id}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }


})
//添加文章主题
router.post('/topics/add',async (ctx)=>{
    let add = ctx.request.body.add
    try{
        await mysql.query(`insert into topic (topic) values ('${add}')`)
        return ctx.body={code:0}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }


})
//获取文章主题
router.post('/topics/getAll',async (ctx)=>{
    try{
        let res = await mysql.query(`select * from topic`)
        return ctx.body={code:0,data:res}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1,msg:'服务器端出错，请检查代码'}
    }


})
//删除文章主题
router.post('/topic/delete',async (ctx) => {
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1,msg:'数据删除出错'} }

        await mysql.query(`delete from topic where topic='${ctx.request.body.tp}'`)
        return ctx.body={code:0}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据删除出错！'}
    }
});
//修改文章主题
router.post('/topic/alter',async (ctx) => {
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1,msg:'数据修改出错'} }

        await mysql.query(`update topic set articles='${ctx.request.body.alter}' where id='${ctx.request.body.id}'`)
        return ctx.body={code:0}
    }catch (e) {
        console.log(e);
        return ctx.body={code:1,msg:'数据修改出错！'}
    }
});


//提交评论到数据库
router.post('/articles/handInComment',async (ctx)=>{
    try{
        let {content,user,artiId} = ctx.request.body
        let t = getNowFormatDate2()

        await mysql.query('insert into comment (user,artiId,content,cTime,state) values (?,?,?,?,?)',
            [user,artiId,content,t,'unchecked'])
        await mysql.query('insert into operation (user,action,target,o_time) values (?,?,?,?)',
            [user,'comment',artiId,t])
        return ctx.body={code:0}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
//评论处理（显示or删除）
router.post('/articles/commentsCheck',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let {order,cId} = ctx.request.body
        if(order==='pass'){
            await mysql.query(`update comment set state='pass' where commentId='${cId}'`)
            return ctx.body={code:0}
        }
        if(order==='del'){
            await mysql.query(`delete from comment where commentId='${cId}'`)
            return ctx.body={code:0}
        }
        return ctx.body={code:1}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
//后台显示所有评论
router.post('/articles/getComments',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let t = await mysql.query(`select * from comment`)
        t = JSON.parse(JSON.stringify(t))
        return ctx.body={code:0,data:t}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
//客户端显示单条文章的评论
router.post('/articles/getOneComments',async (ctx)=>{
    try{
        let artiId = ctx.request.body.artiId
        let t = await mysql.query(`select * from comment where artiId='${artiId}'`)
        t = JSON.parse(JSON.stringify(t))
        return ctx.body={code:0,data:t}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})


//用户点赞
router.post('/articles/like',async (ctx)=>{
    try{
        let {user,artiId} = ctx.request.body
        let t = getNowFormatDate2()

        let res = await mysql.query(`select * from operation where user='${user}' and target=${artiId} and action='like'`)
        res = JSON.parse(JSON.stringify(res))[0]
        if(res){ return ctx.body={code:0,msg:'你已经点过赞了，感谢！'}}

        await mysql.query('insert into operation (user,action,target,o_time) values (?,?,?,?)',
            [user,'like',artiId,t])
        return ctx.body={code:0,msg:'收到点赞！感谢您的鼓励！'}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
//用户留言
router.post('/leaveMsg',async (ctx)=>{
    try{
        let {user,msg} = ctx.request.body;
        let t = getNowFormatDate2().split(" ")[0];

        let res = await mysql.query(`select * from operation where user='${user}' and action='msg' and o_time='${t}'`)
        res = JSON.parse(JSON.stringify(res))
        if(res.length>=2){ return ctx.body={code:1,msg:'超出每日留言上限'} }

        await mysql.query('insert into operation (user,action,target,o_time,msg) values (?,?,?,?,?)',
            [user,'msg',0,t,msg])
        return ctx.body={code:0,msg:'已收到留言！请留意后续邮箱回复，谢谢！'}

    }catch(e){
        console.log(e)
        return ctx.body={code:1,msg:'系统繁忙，请稍候再试'}
    }

    


})


//用户操作（点赞，评论）用于前端显示数据量
router.post('/operations/getInfo',async (ctx)=>{
    try{
        let t = await mysql.query(`select * from operation where action='comment' or action='like'`)
        t = JSON.parse(JSON.stringify(t))
        return ctx.body={code:0,data:t}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
//用户操作（留言）用于后台查看
router.post('/operations/getMsg',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let t = await mysql.query(`select * from operation where action='msg'`)
        t = JSON.parse(JSON.stringify(t))
        return ctx.body={code:0,data:t}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
router.post('/operations/msgCheck',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }


        let {order,oId} = ctx.request.body
        if(order==='read'){
            await mysql.query(`update operation set target=1 where o_id='${oId}'`)
            return ctx.body={code:0}
        }
        if(order==='del'){
            await mysql.query(`delete from operation where o_id='${oId}'`)
            return ctx.body={code:0}
        }
        return ctx.body={code:1}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
router.post('/operations/getAll',async (ctx)=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let t = await mysql.query(`select * from operation`)
        t = JSON.parse(JSON.stringify(t))
        return ctx.body={code:0,data:t}
    }
    catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})

//后台高级操作
router.post('/operations/db_operation',async ctx=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1,msg:"查询出错"} }

        let { sql } = ctx.request.body;
        if(!(sql.slice(0,6)==='xyysql')){
            return ctx.body={code:1,msg:'非法查询！'}
        }

        let res = await mysql.query(sql.slice(6))
        res = JSON.parse(JSON.stringify(res))

        return ctx.body={code:0,msg:res}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1,msg:'查询出错！'}
    }


    })
router.post('/operations/file_operation/read_dir',async ctx=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let { filename } = ctx.request.body
        filename = path.join(__dirname,`../${filename}`)

        let l = fs.readdirSync(filename)
        return ctx.body={code:0,l:l}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
router.post('/operations/file_operation/mk_dir',async ctx=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let { dirName } = ctx.request.body
        fs.mkdirSync(dirName)
        return ctx.body={code:0}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
router.post('/operations/file_operation/upload_file',async ctx=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        let { f,fName } = ctx.request.body
        if(fName.indexOf('.md')>-1){
            fs.writeFileSync(fName,base64ToString(f))
        }else
        if (fName.indexOf('.png')>-1 || fName.indexOf('.jpg')>-1){
            fs.writeFileSync(fName,Buffer.from(f,'base64'))
        }
        else return ctx.body={code:1}

        return ctx.body={code:0}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})
router.post('/operations/file_operation/rm_dir',async ctx=>{
    try{
        let u = ctx.cookies.get('uid')
        if(u){ u = Buffer.from(u,'base64').toString() }
        if(u!=='许洋溢'){ return ctx.body={code:1} }

        deleteFile(ctx.request.body.fName)

        return ctx.body={code:0}
    }catch (e) {
        console.log(e)
        return ctx.body={code:1}
    }
})


module.exports=router;


