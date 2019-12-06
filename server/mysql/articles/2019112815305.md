# Linux学习（七）定时任务  
定时任务类似闹钟，有时我们需要系统在特定情况下自动执行一些命令，如定期生成日志等。  
定时任务软件最常用的是：cronie  
### 安装  
yum安装或者rpm安装（需要安装包）  
### 操作方法  
1. 修改软件自带文件：  
   > 每小时：/etc/cron.hourly  
   > 每一天：/etc/cron.daily  
   > 每一周：/etc/cron.weekly  
   > 每个月：/etc/cron.monthly  
2. 用户自定义编辑：  
   编写定时任务:`crontab -e`  
   用户定时任务查看:`crontab -l`  
### 具体使用  
1. 保证cronie服务开启：`systemctl status crond`  
2. `crontab -e`配置文件:  
   ```
   编写规范：
       # 定时器注释
       *   *   *  *   *  待执行的命令
       分  时  日  月 星期
   ```
3. 定时任务的屏幕输出会默认发邮件通知用户。如若不需要，可以在设置定时的时候放入黑洞  
