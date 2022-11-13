
## 部署

1 安装 nodejs 环境
[如何在Ubuntu 18.04安装Node.js和npm | myfreax](https://www.myfreax.com/how-to-install-node-js-on-ubuntu-18-04/)
```shell
cat /etc/issue
#Ubuntu 18.04 LTS
apt update
apt install nodejs npm
#安装 n , 管理 node 版本
npm install -g n
n lts
```

3 安装 `pm2`
```shell
npm i pm2 -g
```

3 初始化部署目录
```
npm init -y
npm install express body-parser compression -S
```

4 上传 dist 和 bao-tool-site.js
```shell
pm2 start bao-tool-site.js
```

后续更新再部署时, build 后, 将 dist 目录上传覆盖即可.

### 部署到腾讯 Express SCF

```
~~创建 `bao-tool-site-app` 目录作为 express 部署目录;~~
1. 创建 `scf-express-app` 作为 express 部署目录 (不足1M, 可以git);
2. 下载 SCF Express 模板文件, 放到上面的 app 目录;
3. 代码项目 build;
4. dist 目录复制到 app 目录.

npm script:
  "build:scf": "rimraf dist && npm run build && cpr ./dist ./scf-express-app/dist -o",
```

## 发布

供下载使用.

[electron 应用打包后自动发布至 GitHub Releases · Tit1e](http://evolly.one/p/20107.html)

[通过electron-builder构建electron应用发布git release - 本人的窝](https://www.1zilc.top/javascript/%E9%80%9A%E8%BF%87electron-builder%E6%9E%84%E5%BB%BAelectron%E5%BA%94%E7%94%A8%E5%8F%91%E5%B8%83git-release/1zilc/)

[使用 CI 构建和发布 electron 应用](https://blog.sigoden.com/build-and-publish-electron-app-with-ci/) (应该不错 Travis Linux|Mac; AppVeyor window)

[记录一次electron开发和持续集成 - 简书](https://www.jianshu.com/p/add047a84e85) (access_token)

### 配置

https://www.electron.build/configuration/publish#how-to-publish

| Value          | Description                            |
| :------------- | :------------------------------------- |
| `onTag`        | on tag push only                       |
| `onTagOrDraft` | on tag push or if draft release exists |
| `always`       | always publish                         |
| `never`        | never publish                          |

### GH_TOKEN


*!! CI 工具需要在 AppVeyor 等平台上操作.* 

#### Appveyor

https://ci.appveyor.com/project/Nisus-Liu/bao-tool

1. 关联目标仓库.
2. 项目代码中配置 `appveyor.yml`.
3. push 触发 CI/CD

```
HttpError: 401 Unauthorized
"method: GET url: https://api.github.com/repos/Nisus-Liu/bao-tool/releases\n\n          Data:\n          {\"message\":\"Bad credentials\",\"documentation_url\":\"https://docs.github.com/rest\"}\n          "
Headers: {
...
```


### npm script 命令方式

[electron 应用打包后自动发布至 GitHub Releases · Tit1e](http://evolly.one/p/20107.html)

GH_TOKEN 环境变量

方式1:

```
cross-env GH_TOKEN=xxx
// or
// window
set GH_TOKEN=xxx (git token)
// Linux | mac
export GH_TOKEN=xxx
```

方式2:

```
"config": {
	"GH_TOKEN": "xxx"
},
```



- 配置方便
- 每个平台需要单独发布(繁琐些)



vue.config.js

```
pluginOptions.electronBuilder.builderOptions
```

package.json

```
"publish": "rimraf dist_electron && cross-env GH_TOKEN=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 vue-cli-service electron:build --publish always"
```






## github <-> gitee 同步
(手动同步)

```
git remote add github git@github.com:Nisus-Liu/bao-tool.git
git pull origin feature/v1 // 拉取 gittee 的最新分支代码 (本仓库 origin 是 gitee 别名)
git push github feature/v1
```

## 网站 SEO
[(86条消息) 学会对VUE的SEO优化，你的网站总是排在前面_馒头老爸的博客-CSDN博客_vue seo](https://blog.csdn.net/DengZY926/article/details/105397730)

## 其他
```
yarn global add @vue/cli
vue create bao-tool
// 接下来, 用 Vue cli Electron plugin 集成 electron
vue add electron-builder
```


Tutorial:
[Vue3+Electron整合方式](https://zhuanlan.zhihu.com/p/181015456)



```
// 编译 vue
npm run build
// 启动 electron
npm run start
```

[EJS -- 嵌入式 JavaScript 模板引擎 | EJS 中文文档](https://ejs.bootcss.com/)




[Electron-快速构建安装包及自动发布 - 掘金](https://juejin.cn/post/6844904102011338766#heading-4)



- Vue cli Electron plugin

  https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation

    ```
    vue add electron-builder
    ```

- vue-router.esm-bundler.js?6c02:3302 ReferenceError: __dirname is not defined
  at eval (webpack-internal:///./node_modules/electron/index.js:4)

  [vue.js - How fix __dirname not defined when using electron events with Vue? - Stack Overflow](https://stackoverflow.com/questions/62777834/how-fix-dirname-not-defined-when-using-electron-events-with-vue)
  To solve this I created a file vue.config.js in project root with content
    ```js
    module.exports = {
      pluginOptions: {
        electronBuilder: {
          nodeIntegration: true
        }
      }
    }
    ```
  
-  npm install pm2 -g 时: npm ERR! typeerror Error: Missing required argument #1
  - [ubuntu使用npm出现 Missing required argument #1问题_简简单单lym的博客-CSDN博客](https://blog.csdn.net/lym594887256/article/details/124234444)
  - npm install -g n; n lts; 安装 v16.16.0 版本的 Node.

- 部署 express 应用
  - [使用Express部署Vue项目 - 知乎](https://zhuanlan.zhihu.com/p/116749549)