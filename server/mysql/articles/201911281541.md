# Linux学习（二）配置文件目录  
> 二、三是关于系统配置知识，直接记忆比较枯燥乏味，建议实际动手操作，如果系统运行无误，也可以先跳过，学习后面内容时遇上需要配置的地方再回过头学习  
 
Linux配置文件的内容大部分存储在`/etc`目录下，关于这么目录名称的理解，Unix起初是用它来存储零碎文件的（etc:诸如此类的意思），但现在大部分配置文件其实都存储在这里，推荐另一个方便记忆的理解方式etc:`Editable Text Configuration`，这样学到后面就不会混淆目录关系了。
> 注意：linux中任何配置修改都不会立即生效，需要重启服务；命令行修改方式大部分都是临时修改；永久修改配置需要修改配置文件（重启系统或服务后生效）  
  
该目录下重要文件有：  
```
网卡配置       : /etc/sysconfig/network-scripts
DNS配置       ： /etc/resolv.conf 
主机名称配置    ：/etc/hostname
系统版本信息    ：/etc/redhat-release
映射文件配置    ：/etc/hosts
自动挂载配置    ：/etc/fastab
自启动服务      ：/etc/rc.local
永久变量信息    ：/etc/profile
命令行别名信息   ：/etc/bashrc
登录提示配置    ：登录前/etc/issue 登录后/etc/motd
```
## 网卡配置  
1. 重要文件-网卡配置文件 （重点）  
    1）文件内容信息查看
    ``` 
    查看配置文件：cat /etc/sysconfig/network-scripts/ifcfg-eth0
    
    显示内容：
    TYPE=Ethernet       --指定网络类型 Ethernet:以太网 
    BOOTPROTO=none      --网络启动协议 如何让主机得到IP地址
                           a 自己手动配置 none static（静态）
                           b 自动获取地址 dhcpd
    NAME=eth0           -- 主机网卡的名称 逻辑名称
    UUID=xxxxx          -- 虚拟主机，会给每个硬件一个标识
    DEVICE=eth0         -- 主机网卡的名称 设备名称物理名称
    ONBOOT=yes          -- 设置网卡是否处于开启状态（激活状态）
    IPADDR=...          -- 静态配置IP地址 标识主机身份
    PREFIX=...          -- 子网掩码的位数。定义网络中可以有多少主机         
    GATEWAY=...         -- 网关
    DNS1=...            -- DNS（建立名称和IP地址的对应关系）
    ```  
    2）配置文件修改重启服务
    ```
    针对所有网卡进行重启：
    systemctl restart network  
    systemctl status  network 
     
    针对指定网卡进行重启：
    ifdown eth0 && ifup eth0   

    异常问题修复：网卡配置文件正确，无法重启网络服务
    systemctl stop NetworkManager   关闭网络管理服务
    ```  
2. 修改DNS解析配置文件	
    ```
      修改方法:
      编辑/etc/resolv.conf => vi /etc/resolv.conf
      
      修改：nameserver 10.10.10.10
    ```  
## 主机名称配置  
查看主机名命令:`hostname`  
查看系统版本命令:`cat /etc/redhat-release` or `uname` 

修改主机名称:  
```
Cent7:
  临时修改:hostname newname
  永久修改:vi /etc/hostname
  临时+永久：hostnamectl set-hostname newname
Cent6:
  临时修改:同7
  永久修改:vi /etc/sysconfig/network
```  
## 映射文件配置  
hosts文件：在本地建立IP与主机名称的对应关系  
win下：c/windows/system32/driver/etc/hosts  
linux下：/etc/hosts  
## 磁盘挂载信息  
/etc/fastab   :存储开机时设备自动挂载配置文件，即永久挂载配置。如果只是临时挂载的话，系统重启后原挂载会自动卸载  
```
mount  设备目录 挂载点目录   ：挂载设备/磁盘
umount 挂载点目录           ：卸载设备/磁盘
```  
## 服务自启动配置  
1. 开机后系统会去加载`/etc/rc.local`文件中的命令去执行。修改该文件可添加/删除开机自动执行的命令（还需要文件可执行，即属性有x）  
   如在该文件中添加：`touch ~/test.txt`，每次开机后系统都会在用户家目录下创建一个test.txt文件  
2. 有些服务默认开机自动启动，查看某服务开机自启情况，举例sshd：`systemctl status sshd ` 
   ```
   ...
   ● sshd.service - OpenSSH server daemon
      Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   ...
   
   enabled表示开机启动
   ```   
## 变量/别名/字符编码配置  
重要文件:  
>/etc/profile　　　~/.bashrc　　　 存储永久设置的变量信息，别名信息  
>/etc/bashrc　　　~/.bashrc 　　　别名等信息  
>前者全局生效，后者对具体用户生效（优先生效）    
  
linux系统的变量分为两种:  
>1. 普通变量：用于简化脚本的编写  
>2. 环境变量：系统的环境配置有关 PATH(可以让命令操作可简便)  
  
命令也算为两种：外置命令（需要进行安装）、内置命令（所有系统自带）  
  
当系统执行外置命令时，如果命令没有直接带上命令所在的具体路径，系统则会从**环境变量**寻找，找到后执行，若找不到，执行失败；如果别名中可找到则优先执行别名中的命令。内置命令不受路径影响。  
1. 变量操作  
    直接声明变量：`X=abc `  
    调用变量：`$X`。如:`echo $X`输出=> abc  
    临时修改变量:`X=newValue`  
    永久修改变量:`vi /etc/profile`，修改对应内容即可  
    
    注意：export修饰的为环境变量，如：export PATH=xxx
2. 别名，即给单条命令或整合的命令起一个别名，执行效果相同，但便于输入。
   ```
   查看别名：alias
   临时修改别名：alias 别名='命令'
   永久修改别名：
      vi ~/.bashrc    (优先级高，对具体用户生效)
      vi /etc/bashrc  (优先级次高，对所有用户生效)
      vi /etc/profile (优先级低)
   删除别名：unalias 别名
   ```  
3. 字符编码  
   两种常用的对中文支持较好的编码：UTF-8（支持所有中文），GBK（国际通用，支持多国语言）  
   字符的编码方式存储在变量**LANG**中，该变量在Cent7中存储于`/etc/locale.conf`，Cent6中`/etc/sysconfig/i18n`  
   ```
   查看编码：  echo $LANG
   临时修改：  LANG=xxx
   centos6:
      永久修改：  修改/etc/profile（优先） 或者 /etc/sysconfig/i18n
   centos7:
      永久修改：  修改/etc/profile（优先 ）或者 /etc/locale.conf  
      
   临时且永久修改（不用重启）：localectl set-locale LANG=xxx 
   ```
## 登录提示配置  
有时候我们需要修改系统登录前/后的信息提示，比如提供注意事项等，我们只需在相关文件中编辑内容即可：  
登录前：`/etc/issue`　`/etc/issue.net`（提供给telnet远程登录程序使用）  
登录后：`/etc/motd`


	   