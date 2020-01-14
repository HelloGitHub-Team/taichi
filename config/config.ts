import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/
import slash from 'slash2';
import webpackPlugin from './plugin.config';
import routes from './router.config';
import pkg from '../package.json';

const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        default: 'zh-CN', //默认语言 zh-CN，如果 baseSeparator 设置为 _，则默认为 zh_CN
        baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
        antd: true, // 是否启用antd的<LocaleProvider />
        baseSeparator: '-', // 语言默认分割符 -
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            manifestOptions: 'public/manifest.json',
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
              swSrc: 'public/service-worker.js',
            },
          }
        : false,
      // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      dll: {
        include: Object.keys(pkg.dependencies),
        // include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
        exclude: ['@babel/runtime', 'netlify-lambda'],
      },
    },
  ],
];
export default {
  plugins,
  hash: true,
  base: '/taichi/',
  publicPath: '/taichi/',
  targets: {
    ie: 11,
  },
  devtool: false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    // @see:https://github.com/umijs/umi/issues/1142
    'process.env.MOCK': process.env.MOCK !== 'none',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const projectName = match[1].replace('.less', '');
        const arr = slash(projectName)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `tai-chi${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  treeShaking: true,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
} as IConfig;
