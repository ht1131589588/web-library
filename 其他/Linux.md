# Linux 使用记录

## Linux 常用命令

mkdir 创建文件夹
rm 删除文件
rm -rf 删除文件夹及子文件

## 阿里云静态服务器搭建

- 上传文件到有权限的目录，比如/home/reactApp

- 配置 nginx

```nginx
server {
  listen 80;
  server_name sportsadmin.htonlinezone.cn; #域名

  # gzip config
	gzip on;
	gzip_min_length 1k;
	gzip_comp_level 9;
	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	gzip_vary on;
	gzip_disable "MSIE [1-6]\.";

  root /home/reactApp;

	location / {

    index index.html;
		# 用于配合 browserHistory使用
		try_files $uri $uri/ /index.html;
	}
}
```

## 公钥信任

```bash
cd
# 进入.ssh目录
cd .ssh
# 生成密钥
ssh-keygen -t rsa -P ''
# 查看密钥
cat id_rsa.pub
# 登录远程服务器 需要输入密码
ssh root@47.xx.xxx.xxx

# 进入远程服务器.ssh目录
cd .ssh/
# 编辑远程服务器authorized_keys
vi authorized_keys
# 退出
exit
# 登录远程服务器 不需要输入密码
ssh root@47.xx.xxx.xxx
```

## 参考资料

[Centos 文件和目录访问权限设置](https://blog.csdn.net/zhwxl_zyx/article/details/41961317)
