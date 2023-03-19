## 技术架构 微项目 + monorepo 架构的结合

```
lerna       负责monorepo架构管理
yarn        负责依赖管理
npm         负责开发环境运行、测试环境打包、灰度环境、生产打包
eslint      负责代码检查
prettier    负责代码风格约定
typescript  负责支持typescript
```

## 技术栈

```
vue3        后续补充...
Ant Design Vue

```

## node 和 npm 版本

```
"node": "~14.17.1",
"npm": "~6.14.13"
```

## vscode 开发工具插件

```
Tslint
Eslint
Git History
Prettier
Volar
```

## 安装

```
cd /
yarn install
```

## 运行开发环境 环境变量：development

```
npm run dev -admin
npm run dev -component
npm run dev -editor
npm run dev -xxx包名

注：启动后访问地址为：http://localhost:8080/{包名}
```

## 打包到测试环境 环境变量：productionTest

```
npm run build:test 包名
/productionTest 输出目录
```

## 打包到生产环境 环境变量：production

```
npm run build:prod 包名
/production 输出目录
```
