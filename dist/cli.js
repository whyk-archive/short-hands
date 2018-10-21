#!/user/bin/env node
var npmRun = require('npm-run');
var path = require('path');
var fs = require('fs');
var pkg = require('../package.json');
var userhome = process.env[process.platform === 'win32' ? "USERPROFILE" : "HOME"];
var config = path.join(userhome, '.npmaliasconfig');
var alias = fs.readFileSync(config, 'utf8');
var args = process.argv;
var cmd = args[2];
var opt = args[3];
var objParse = function (obj) { return Object.keys(obj); };
var versionView = function () {
    console.log("v" + pkg.name);
};
var helpView = function () {
    console.log("\n        " + objParse(pkg.bin) + " cmd opt\n        \n        Cmd\n        - set: set up alias\n        - run: Use the set up alias\n        - version || -v: show current version\n        - help || -h: show help\n\n        Opt\n        if 'set': Name of alias to set (ex. " + objParse(pkg.bin) + " set lsdeep 'npm ls --depth=0')\n        if 'run': Name of the alias you set (ex. " + objParse(pkg.bin) + " run lsdeep)\n    ");
};
var errView = function (err) {
    console.log(err);
};
var setCmd = function (alias) { };
var runCmd = function (alias) {
    npmRun(alias);
};
if (cmd === 'set')
    setCmd(opt);
else if (cmd === 'run')
    runCmd(opt);
else if (cmd === 'help' || cmd === '-h')
    helpView();
else if (cmd === 'version' || cmd === '-v')
    versionView();
// else errView(err);
