# Note-Wxapp

组件库使用：MinUI组件库，安装方法：https://meili.github.io/min/docs/min-cli/third-project/install/index.html

```shell
min install @minui/wxc-toast
```
安装目录：src/components 不启用ES6转ES5

组件库文档：https://meili.github.io/min/docs/minui/index.html

动态图片打包问题：
wxml-loader并不能解析动态图片url引入，需要借助copy-webpack-plugin将图片直接copy打包，url配置在package.json的copyWebpack字段中

## 功能

* 支持引用 `node_modules` 模块
* 合成vedux库，使用类redux开发方式开发小程序
* 异步action支持redux-thunk开发，也可以视实际情况删除
* 合成BundleAnalyzerPlugin，实时分析包体积，为包体积提供可视化优化方向
* 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
* 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
* 使用 `scss` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
* 提供 `__DEV__` 和 `process.env.NODE_ENV` 全局常量辅助开发
* 通过命令行快速创建微信小程序页面
* 支持在 `production` 环境下压缩代码

## vedux

wxapp-redux 微信小程序和redux绑定库，类react-redux

### 简介

在[**wechat-weapp-redux**](https://github.com/charleyw/wechat-weapp-redux)的基础上改进，控制setdata次数与渲染次数，在页面的交互、加载、跳转时setdata次数减少50-80%，渲染时间减少约50%。

有如下功能特性：

- Redux store变化时禁止后台页面setdata，后台页面的setdata汇总到此页面onload时进行；
- 优化stateDiff算法；
- 过滤与当前页面无关的变更；
- 内部对action触发做节流处理，允许不节流，默认节流；
- 支持给action传入callback，在action触发后执行；
- connect的传参mapStateToData，支持传入options（即onLoad的options）；
- connect新增参数mergeProps（对mapStateToData的返回结果做进一步处理）；
- connect新增参数extraOptions（给mergeProps方法传参）；



## 内置命令

* `yarn start` 启动 `webpack` 开发微信小程序项目，能监听文件变化自动重新编译
* `yarn build` 编译生成 `production` 环境的代码到 `release` 文件夹
* `yarn lint:build` 执行 `yarn build` 命令，并使用 eslint 和 stylelint 来校验代码规范
* `yarn prettier` 执行 `prettier` 来格式化 src 目录下的代码
* `yarn create-page` 快速创建微信小程序页面（更多 `create-page` 的用法，请查看 [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page)）
