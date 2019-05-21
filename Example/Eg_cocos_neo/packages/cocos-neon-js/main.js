'use strict';

const fse = require('fs-extra');
const Path = require("path");
const { shell } = require('electron')

module.exports = {
    messages: {
        'install': function() {
            const getProjectPath = function() {
                if (Editor.Project && Editor.Project.path) {
                    return Editor.Project.path;
                }
                return Editor.projectInfo.path
            }
            const srcFolder = Path.join(__dirname, 'plugin');
            const destFolder = Path.join(getProjectPath(), 'assets');
            fse.copySync(srcFolder, destFolder);
            Editor.log('Neon-js plugin is installed to assets');
        },
        "help": function() {
            shell.openExternal('https://cityofzion.io/neon-js/');
        }
    },
};

// all it does is copy-paste stuff in plugin folder into the assets folder. 
// as long as neon-js works with scripts within the same folder (poetntially 
// through node_modules), it should work