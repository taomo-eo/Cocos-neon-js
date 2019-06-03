实行了反馈里提出的改变建议，加入了Editor.assetdb.refresh()方法和meta文件

但是在packages.json文件中加入"runtime-resources"选项后，遇到如下问题：

- 当项目在cocosCreator编辑器中打开时，如果把插件放入项目/packages文件夹中，项目会报错，进入load和unload循环。报错消息如下：

        
        neo-cocos-sdk loaded
        TypeError: Cannot read property 'level' of undefined
            at Object.exports.add (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\utils\cache.js:1:1717)
            at Object.exports.add (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\utils\operation.js:1:2810)
            at s.forEach.e (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\index.js:1:3340)
            at Array.forEach (native)
            at HTMLElement.asset-db:assets-created (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\index.js:1:3177)
            at EventEmitter.i.function.t.on.e (D:\Dev\CocosCreator\resources\app.asar\editor-framework\lib\renderer\ui\panel\frame.js:1:3303)
            at emitTwo (events.js:106:13)
            at EventEmitter.emit (events.js:194:7)

        neo-cocos-sdk unloaded
        TypeError: Cannot read property 'parent' of null
            at Object.exports.remove (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\utils\cache.js:1:1888)
            at Object.exports.remove (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\utils\operation.js:1:2749)
            at t.forEach.e (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\index.js:1:4240)
            at Array.forEach (native)
            at HTMLElement.asset-db:assets-deleted (D:\Dev\CocosCreator\resources\app.asar\editor\builtin\assets\panel\index.js:1:4226)
            at EventEmitter.i.function.t.on.e (D:\Dev\CocosCreator\resources\app.asar\editor-framework\lib\renderer\ui\panel\frame.js:1:3303)
            at emitTwo (events.js:111:20)
            at EventEmitter.emit (events.js:194:7)


- 如果事先把插件放入项目/packages文件夹中，再打开项目，插件会被成功加入到runtime-resources中。