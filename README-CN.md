# Cocos Creator NEO 插件
neo-cocos-sdk 是基于[neon-js](http://cityofzion.io/neon-js/en/), 专门为Cocos Creator开发的JavaScript NEO-SDK。neo-cocos-sdk可以很简单的在Cocos Creator创建的项目中集成，为开发者提供简易的接口用于发送RPC请求，构造并发送交易、以及智能合约的调用等。

### 安装


1. 在 Cocos Creator 窗口，选择 `插件` > `插件商店` > 搜索`neo-cocos-sdk` > 下载插件
   
   > *或下载此GitHub库，并将 `neo-cocos-sdk`文件夹内容复制到 Cocos Creator 项目的 `packages` 文件夹里。*
   
2. 选择 `插件` > `neo-cocos-sdk` > `安装`

### 使用

安装完成后，此插件的所有模块可使用全局变量 `Neon` 调用。

```
console.log(Neon);
```
> 更多教程，请见[NEO Game开发指南](https://github.com/neo-ngd/NEO.Game-Developer-Guide)

> API参考，请见[neon-js文档](https://cityofzion.io/neon-js/docs/en/api/index.html)

### 示例

 `./Example/Eg_cocos_neo` 存有一个简单的SDK调用示例，会有持续更新
