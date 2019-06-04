'use strict';

const fse = require('fs-extra');
const Path = require("path");
const { shell } = require('electron')

module.exports = {
    messages: {
        // 'install': function() {
        //     const getProjectPath = function() {
        //         if (Editor.Project && Editor.Project.path) {
        //             return Editor.Project.path;
        //         }
        //         return Editor.projectInfo.path
        //     }
        //     const srcFolder = Path.join(__dirname, 'plugin');
        //     const destFolder = Path.join(getProjectPath(), 'assets');
        //     fse.copySync(srcFolder, destFolder);
        //     Editor.assetdb.refresh('db://assets//neo-cocos-sdk');
        //     Editor.log('neo-cocos-sdk plugin is installed to assets');
        // },
        "help": function() {
            shell.openExternal('https://cityofzion.io/neon-js/');
        }
    },
};