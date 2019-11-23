# tai chi

HG 可视化前端项目

## 开发

项目使用`ant-design-pro`进行搭建，技术栈如下：  
`react + typescript + dva + umi + CSS module`

参与开发：

```shell script
# 克隆代码
git clone git@github.com:HelloGitHub-Team/taichi.git
# 进入项目目录
cd taichi
# 安装依赖
yarn install
# 启动项目
yarn start
```

## 接口

### 响应约定

> **Tips**:服务端字段说明会在响应中以`#`出现

响应状态通过 `HTTP status code` 反映，规则如下：

- 200：成功
- 400：参数错误
- 401：未登录
- 403：禁止访问
- 404：未找到
- 500：服务器异常

成功响应模板：

```text
{
  "message": "OK", # 成功一般为 OK
  "payload": [] # 请求返回的数据
}
```
