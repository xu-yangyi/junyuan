const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
    host : 'smtp.163.com',
    port : '465',
    secure: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'junyuanblog@163.com', //发送邮件的邮箱
        pass : 'xuyicheng0522' //第三方授权密码，POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
    },
});
module.exports= mailTransport;

