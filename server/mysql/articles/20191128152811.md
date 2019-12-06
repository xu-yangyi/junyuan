# Linux学习（三）其他目录  
## 操作系统运行级别  
linux有7种运行级别，分别对应不同的运行状态，不同的运行级别对系统的功效与限制也不一样。  
在Cent6中称为runlevel，存放于/etc/inittab中；Cent7中称为target。    
Cent 6（级别）  
   ```   
   0  关机级别   不能设置默认为0
   1  单用户级别 （维护，可重置密码）  
   2  多用户级别  无网络  
   3  多用户级别  有网络  
   4  预留  
   5  图形化级别  
   6  重启级别 
   ```  
Cent 7（target）    
   ```   
   查看所有target信息：ll /usr/lib/systemd/system/runlevel*target
   runlevel0.target -> poweroff.target
   runlevel1.target -> rescue.target
   runlevel2.target -> multi-user.target
   runlevel3.target -> multi-user.target
   runlevel4.target -> multi-user.target
   runlevel5.target -> graphical.target
   runlevel6.target -> reboot.target
   ```  
  
命令相关：  
```  
Cent 6中：
查看当前级别：runlevel
修改当前级别：临时修改:init 级别值  永久修改:vi /etc/inittab
       
Cent 7中
查看默认运行的target:   systemctl get-default
修改默认运行target:     systemctl set-default xxx.target
```  
## 安全相关配置  
### 一、防火墙  
防火墙作用是将内部网络与外网有效隔离开，对非法用户进行阻隔，并将一些不安全的服务全部滤除掉。防火墙相关目录：  
Cent6:`/etc/init.d`  
   1. 查看防护墙服务状态`/etc/init.d/iptables status`
   2. 临时关闭防火墙服务`/etc/init.d/iptables stop`
   3. 永久关闭防火墙服务`chkconfig iptables off`  
   
Cent7: `/usr/lib/firewalld`  
   1. 查看防火墙服务状态`systemctl status firewalld`
   2. 临时关闭防火墙服务`systemctl stop firewalld`  
   3. 永久关闭/开启防火墙服务`systemctl disable/enable firewalld`  
     
便捷操作：  
   检查服务是否正常运行:`systemctl is-active firewalld`  
   检查确认服务是否开机运行:`systemctl is-enabled firewalld`  
  
### 二、selinux服务程序  
selinux服务：`/etc/selinux`；对root用户权限进行限制。  
```
getenforce       :检查服务开启情况。对应以下三种状态
   -Enforcing    :开启selinux
   -Permissive   :临时关闭selinux
   -Disabled     :永久关闭
setenforce       :临时设置服务开启情况

永久修改：vi /etc/selinux/config => SELINUX=disabled 重启后生效
```  
  

## 软件程序
程序软件安装相关的目录：/usr/local  
  
linux安装软件的方法及其特点：  
```
1.yum         :简单方便，一键安装
2.rpm         :需要有软件安装包
3.编译安装软件  :DIY，自定义配置
```  
### 一、yum安装:  
命令汇总：  
```
yum install -y xx               直接安装软件
yum remove xx                   卸载软件，但只会卸载本身，卸载依赖建议用rpm
yum groupinstall -y 包组         直接安装软件包组
yum repolist                    查看yum源信息
yum list                        查看可安装/已安装的软件
yum grouplist                   查看可安装/已安装的软件包组
yum --help                      显示命令的参数帮助信息
yum provides locate             获取命令属于哪个软件包
```  
默认国外安装镜像源，查看具体安装源信息查看：  
`cat /etc/yum.repos.d/CentOS-Base.repo`  
替换修改yum安装的镜像源，举例阿里云：  
`curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`  

### 二、rpm安装
rpm安装需要安装包，rpm也可用于管理软件包，命令汇总：  
```
rpm
     -ivh name.rpm         安装软件 -v显示过程 -h指定加密方式为hash
     -qa 软件名称            查看软件包是否安装成功
     -ql 软件名称            查看软件包中内容
     -qf 文件绝对路径         查看文件属于哪个软件包
     -e  软件名称            卸载软件
     -e  软件名称  --nodeps  卸载软件包和依赖
```
## 日志文件  
/var/log/  
|--message:记录系统或程序服务运行的状态信息和错误信息  
|--secure:用户登录信息。记录了用户登录主机，登录时间，方式等内容  
tail -f file跟踪查看  

## 硬件信息查看  
目录/proc：  
内核控制中心，存储可以改变内核运行状态的文件，也是内核状态的查询中心，用户可以通过它查看系统硬件及当前运行的进程信息。
1. CPU：  
    利用文件查看：`cat /proc/cpuinfo`  
    利用命令查看：`lscpu`  
    ```
    model name: Intel(R) Core(TM) i5.....            -- CPU品牌型号
    physical id : 0                                  -- 表示CPU颗数  1颗
    processor   : 0                                  -- 表示CPU核数  1核
    cpu cores   : 1
    ```  
    查看负载：`cat /proc/loadavg`或者命令`w`  
    ```
                  1分钟平均   5分钟平均负载   15分钟平均负载
    load average:   0.00,      0.01,         0.05
    ```
2. 内存：  
   文件查看：`cat /proc/meminfo `  
   命令查看：`free -h`  
3. 磁盘信息  
   文件查看：`cat /proc/mounts`  
   命令查看：`df -h`  
   ```
   Filesystem      Size  Used Avail Use% Mounted on
   /dev/vda1        40G  3.9G   34G  11% /
   devtmpfs        910M     0  910M   0% /dev
   tmpfs           920M  4.0K  920M   1% /dev/shm
   tmpfs           920M   97M  824M  11% /run
   ...
   ```