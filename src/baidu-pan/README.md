# 百度网盘直链下载

本脚本是修改自[软件小妹](https://greasyfork.org/zh-CN/users/707117-%E8%BD%AF%E4%BB%B6%E5%B0%8F%E5%A6%B9)的[百度网盘简易下载助手（直链下载复活版）](https://greasyfork.org/zh-CN/scripts/418182)，去除了公众号引流，纯为学习与自用，请勿传播。

## 使用说明

可直接参考软件小妹的[教程](https://www.cnblogs.com/softxmm/p/13972678.html)。

但要注意[油猴浏览器扩展](https://www.tampermonkey.net/)的下载一定要从官网走，避免扩展被篡改。

## 脚本取直链原理

1. 首先脚本会将文件分享（随机加密，1天过期）
2. 将分享的文件信息发送到服务器，服务器读取分享文件的直链地址
3. 服务端再返回直链地址给脚本

因为需要有服务器，所以一旦用的人多，就会产生成本。如果插件制作者不想硬性收费，也没什么人赞助，那做点广告引流就情有可原了。