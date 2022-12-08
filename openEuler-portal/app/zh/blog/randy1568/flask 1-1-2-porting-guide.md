---
title: flask 1.1.2 移植指南（openEuler 20.03 LTS SP1）
titleTemplate: 服务器系统迁移 | openEuler社区官网
head:
  - - meta
    - name: description
      content: 本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署flask 1.1.2。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: flask移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具
category: blog
date: 2021-12-29
tags:
  - flask
  - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything of the flask 1.1.2 Porting Case
---

## 介绍

### 简要介绍

Flask 是一个使用 Python 编写的轻量级 Web 应用框架。其 WSGI 工具箱采用 Werkzeug ，模板引擎则使用 Jinja2 。
本案例使用 x86_64 架构虚拟机，通过评估工具 x2openEuler 评估 flask 1.1.2 软件移植到 openEuler 操作系统的兼容性，并根据评估结果完成软件移植。

开发语言：Python

开源协议：BSD

### 建议的版本

建议使用版本为 flask 1.1.2。

> 说明:
> 本文档适用于 flask 1.1.2，其他版本的 flask 移植步骤也可参考本文档。

## 环境要求

### 操作系统要求

| 操作系统  | 版本          |
| :-------- | :------------ |
| openEuler | 20.03 LTS SP1 |
| CentOS    | 7.6           |

### 安装操作系统

如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。
安装 openEuler 操作系统请参考：[https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html。](https://bbs.huaweicloud.com/forum/thread-116157-1-1.html#)

## 兼容性评估

### 获取 flask 的 RPM 包

```
wget https://download-ib01.fedoraproject.org/pub/epel/7/x86_64/Packages/p/python36-flask-1.1.2-4.el7.noarch.rpm
```

#### 下载 x2openEuler 工具

```
下载指引：https://www.openeuler.org/zh/other/migration/
```

#### 部署工具

```
rpm -ivh x2openEuler-2.0.0-1.x86_64.rpm
```

> 注意：安装 rpm 时需要使用 root 用户，且目前需要网络（用于下载安装依赖）
> 注意：根据提示安装依赖包如 bzip2-devel 等

```
su x2openEuler
x2openEuler redis-db -init
```

> 依次录入 redis 数据库的 ip:127.0.0.1
> 端口：6379
> 数据库索引号（0-16）：0
> 密码（工具会对密码加密处理）：如果 redis 密码没有设置或者为空时，直接回车即可

```
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

> 备注：x2openEuler 使用 rpm 安装完成后会在/opt/x2openEuler 目录下带有 source_centos7.6-openEuler20.03-LTS-SP1.tar.gz 这个默认资源包
> 需要支持 centos8.2 到 openEuler20.03-LTS-SP1 的评估，则需获取对应的静态资源包导入，如对应的资源包为 source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，导入此包命令：`x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz`，请示情况选择对应的资源包

#### 扫描软件

```
x2openEuler scan python36-flask-1.1.2-4.el7.noarch.rpm
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
扫描完成后会在/opt/x2openEuler/output目录生成html格式的报告
```

## 查看评估结果

软件兼容性评估报告分三块内容展示软件兼容性，分别是依赖包兼容性、C/C++接口兼容性、java 接口兼容性，依赖包兼容性反映了软件包安装过程中的直接依赖，非 100%表明无法正确安装；接口兼容性反映的是单个软件运行过程中对其他软件包、动态库或系统接口的调用变化，非 100%表明在某个功能调用时可能会触发异常，未调用到时可能表现正常；部分结果建议人工复核，最终软件包使用建优先级建议 openEuler 已移植包>openEuler 上人工重编译包>centos 软件包。

<img src="./image/flask.png">

结果：通过报告可知外部接口兼容性 100%，依赖包兼容性人工复核后确认缺失，由于该软件包属于 python 包，建议使用 pip3 方式安装依赖及 python-flask 对应版本。

## 安装 flask

### rpm 安装

由于兼容性报告显示依赖包缺失，尝试直接用下载的 rpm 包安装做个验证。

```
[root@localhost test]# yum install -y python36-flask-1.1.2-4.el7.noarch.rpm
Last metadata expiration check: 1:39:08 ago on Mon 22 Mar 2021 10:35:29 AM CST.
Error:
 Problem: conflicting requests
  - nothing provides python36-setuptools needed by python36-flask-1.1.2-4.el7.noarch
  - nothing provides python(abi) = 3.6 needed by python36-flask-1.1.2-4.el7.noarch
  - nothing provides python36-click >= 5.1 needed by python36-flask-1.1.2-4.el7.noarch
  - nothing provides python36-itsdangerous >= 0.24 needed by python36-flask-1.1.2-4.el7.noarch
  - nothing provides python36-jinja2 >= 2.10.1 needed by python36-flask-1.1.2-4.el7.noarch
  - nothing provides python36-werkzeug >= 0.15 needed by python36-flask-1.1.2-4.el7.noarch
(try to add '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

由于依赖原因未能安装。

### pip 方式安装

使用 pip 安装同版本的 flask，由于 flask 依赖 python3，使用 pip3。

```
[root@localhost ~]# pip3 install flask
WARNING: Running pip install with root privileges is generally not a good idea. Try `pip3 install --user` instead.
Collecting flask
  Using cached Flask-1.1.2-py2.py3-none-any.whl (94 kB)
Requirement already satisfied: itsdangerous>=0.24 in /usr/lib/python3.7/site-packages (from flask) (1.1.0)
Requirement already satisfied: Werkzeug>=0.15 in /usr/local/lib/python3.7/site-packages (from flask) (1.0.1)
Requirement already satisfied: click>=5.1 in /usr/local/lib/python3.7/site-packages (from flask) (7.1.2)
Requirement already satisfied: Jinja2>=2.10.1 in /usr/lib/python3.7/site-packages (from flask) (2.11.2)
Requirement already satisfied: MarkupSafe>=0.23 in /usr/lib64/python3.7/site-packages (from Jinja2>=2.10.1->flask) (1.1.1)
Installing collected packages: flask
Successfully installed flask-1.1.2
```

## 运行和验证

### 检查版本

```
[root@localhost ~]# python3
Python 3.7.9 (default, Dec 16 2020, 03:16:57)
[GCC 7.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import flask
>>> flask.__version__
'1.1.2'
```

### 使用 flask

使用 flask 官网 ([https://flask.palletsprojects.com/en/1.1.x/quickstart/#a-minimal-application](https://bbs.huaweicloud.com/forum/thread-115817-1-1.html#)) 提供的入门程序

```
vim hello.py
```

编辑内容如下:

```
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
```

编辑后保存退出，在终端输入如下命令：

```
[root@localhost ~]# export FLASK_APP=hello.py
[root@localhost ~]# python3 -m flask run
 * Serving Flask app "hello.py"
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

可见运行成功。
