# Tai Chi

HG 可视化前端项目。**想要加入的小伙伴请联系微信：xueweihan（备注：前端）**

## 开发

项目使用`ant-design-pro`进行搭建，技术栈如下：  
`react + typescript + dva + umi + CSS module`

### 参与开发

> **Tips :**
>
> - 启动时[去掉了`umi ui`可视化编程辅助工具](https://github.com/ant-design/ant-design-pro/issues/5411)
> - 开启了`DllPlugin`打包优化，如果启动[发现问题](https://github.com/ant-design/ant-design-pro/issues/4665)可以关闭

#### 项目启动

```shell script
# 克隆代码
git clone git@github.com:HelloGitHub-Team/taichi.git
# 进入项目目录
cd taichi
# 安装依赖
yarn install
# 启动项目
yarn start
# 项目打包
yarn build
# 将打包文件压缩并且放到mac电脑桌面
yarn build:zip
```

#### 设置`token`

本地测试时，需要在`src`下新建`secretKeys.ts`来存放`token`：

```typescript jsx
// secretKeys.ts

// 导出token
export const token = 'xxx-xxx';
```

> 之后的一些私有配置也可以放进来管理

存放`token`的文件已在`.gitignore`文件中忽略： ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200415173023.png)

在开发时，要在本地存储`token`并根据是否为开发环境进行引入，具体的`token`可以向管理员询问。 ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200415173048.png)

## 项目目录结构

```text
├── LICENSE
├── README.md
├── config                          # uim 及项目配置目录
│   ├── config.ts                   # umi 配置文件
│   ├── defaultSettings.ts          # 项目布局等默认配置
│   ├── plugin.config.ts            # umi webpack插件配置
│   └── router.config.ts            # umi 项目路由配置文件
├── jsconfig.json                   # js 配置文件与tsconfig.json类似
├── mock                            # umi 接口数据mock目录
│   ├── notices.ts
│   ├── route.ts
│   └── user.ts
├── package.json                    # npm 相关配置文件
├── public
│   ├── favicon.png                 # 网站图标
│   ├── manifest.json               # PWA 映射文件
│   └── service-worker.js           # serviceWorker
├── src
│   ├── assets                      # 本地静态资源
│   │   ├── images                  # 图片
│   │   └── styles                  # 全局通用样式
│   ├── components                  # 业务通用组件
│   │   ├── GlobalHeader
│   │   └── PageLoading
│   ├── global.less                 # 全局样式
│   ├── global.tsx                  # 全局 ts
│   ├── http                        # 请求相关
│   │   ├── axiosRequest.ts         # axios 实例封装
│   │   ├── requestHooks.ts         # 请求自定义 hooks
│   │   └── requestTypes.tsx        # 请求相关类型变量
│   ├── layouts                     # 通用布局
│   │   ├── BasicLayout.tsx         # 基础布局
│   │   ├── BlankLayout.tsx         # 空白布局
│   │   └── SecurityLayout.tsx      # 安全布局(校验登录状态)
│   ├── models                      # 全局 dva model
│   │   ├── connect.d.ts
│   │   ├── global.ts
│   │   ├── login.ts
│   │   └── user.ts
│   ├── pages                       # 业务页面
│   │   ├── document.ejs            # HTML 模板
│   │   ├── test
│   │   └── user
│   ├── services                    # 后台接口配置目录
│   │   ├── login.ts
│   │   └── user.ts
│   ├── types                       # 自定义类型声明文件
│   │   └── typings.d.ts
│   └── utils                       # 项目工具库
│       └── helper.ts
├── tsconfig.json                   # ts 配置文件
└── yarn.lock                       # yarn 锁定依赖版本文件
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

接口文档:[传送门](https://gitlab.com/521xueweihan/HelloGitHub.com/blob/master/doc/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md)

### 发起请求

> 参考阿里飞冰的[简化请求](https://ice.work/docs/guide/dev/ajax#%E7%AE%80%E5%8C%96%E8%AF%B7%E6%B1%82%E7%8A%B6%E6%80%81)

在接口请求时，支持传入请求参数的类型、以及响应数据的类型，这样在开发时写好接口请求参数以及响应数据的类型，通过泛型传递过去，就可以很好的实现编辑器代码补全：

```typescript
// 分别设置请求参数泛型以及响应数据泛型
const request = <Req, Res = any>(config: RequestConfig<Req> = {}) =>
  axiosInstance(config).then((response: AxiosResponse<ResponseData<Res>>) => response.data);
```

由于书写接口响应的数据的类型比较耗费时间，我们可以使用社区提供的将`JSON`格式的数据转换为`TS`声明文件的开源库：[json-to-ts](https://github.com/MariusAlch/json-to-ts)。

> 如果你是`vscode`用户，可以使用[JSON to TS](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)

在使用了`json-to-ts`这个库之后，我们就可以利用`JSON`文件生成的`TypeScript`声明文件来为对应的元素添加类型，从而获得相比于`JavaScript`开发更好的代码提示。

#### 1. 在`services`中定义请求的相关配置项和参数类型：

根据接口文档提前在`services`中定义好接口请求的相应配置项，可以在开发时专心书写业务逻辑

```typescript
import { AxiosRequestConfig } from 'axios';

export interface TestParams {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export const fetchTest: AxiosRequestConfig = { url: '/api/test/success', method: 'post' };
```

#### 2. 在组件中使用：

在使用`request`的时候会通过泛型来约束请求时的参数、接口响应数据

```typescript
const ExampleTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = {
    userName: 'userName',
    password: 'password',
    mobile: 'mobile',
    captcha: 'captcha',
  };
  useEffect(() => {
    setLoading(true);
    request<ParamsType, ResponseDataType>({ ...fetchTest, params }).then(
      response => {
        setLoading(false);
        setDataSource(response.payload);
      },
      error => {
        setLoading(false);
        console.log('error', error);
      },
    );
  }, []);
  return (
    <Card>
      <Table loading={loading} dataSource={dataSource} columns={columns} />
    </Card>
  );
};
```

#### 3. 通过自定义`Hooks`使用：

自定义`hooks`会帮我们自动处理请求的加载`loading`,也支持传递泛型参数来约束请求参数和接口响应数据类型

```typescript
const ExampleTable = () => {
  const params = {
    userName: 'userName',
    password: 'password',
    mobile: 'mobile',
    captcha: 'captcha',
  };
  const { response = { payload = [] }, loading, fetch } = useRequest<ParamsType, ResponseDataType>({
    ...fetchTest,
    params,
  });
  const dataSource = response.payload;
  useEffect(() => {
    fetch().then();
  }, []);
  return (
    <Card>
      <Table loading={loading} dataSource={dataSource} columns={columns} />
    </Card>
  );
};
```
