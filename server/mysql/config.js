// mySQL 80以上因为加密方式变更，需要先执行一下命令：
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
// password改成自己的密码即可

const config = {
    // 启动端口
    port: 3000,
    // 数据库配置
    database: {
        DATABASE: 'xujunyuan', //数据库名称
        USERNAME: 'root', //mysql用户名
        PASSWORD: 'YangYisql#1998', //mysql密码
        PORT: '3306', //mysql端口号
        HOST: 'localhost' //服务器ip
    }
}

module.exports = config


