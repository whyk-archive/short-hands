#!/user/bin/env node

const npmRun = require('npm-run');
const path = require('path');
const fs = require('fs');

const pkg = require('../package.json');
const userhome = process.env[process.platform === 'win32' ? "USERPROFILE" : "HOME"];
const config = path.join(userhome, '.npmaliasconfig');
const alias = fs.readFileSync(config, 'utf8');
const args = process.argv;
const cmd = args[2];
const opt = args[3];
const objParse = obj => Object.keys(obj);


const versionView = () => {
    console.log(`v${pkg.name}`);
}

const helpView = () => {
    console.log(`
        ${objParse(pkg.bin)} cmd opt
        
        Cmd
        - set: set up alias
        - run: Use the set up alias
        - version || -v: show current version
        - help || -h: show help

        Opt
        if 'set': Name of alias to set (ex. ${objParse(pkg.bin)} set lsdeep 'npm ls --depth=0')
        if 'run': Name of the alias you set (ex. ${objParse(pkg.bin)} run lsdeep)
    `);
    
}

const errView = err => {
  console.log(err);
}

const setCmd = alias => {}

const runCmd = alias => {
    npmRun(alias);
}


if(cmd === 'set') setCmd(opt);
else if(cmd === 'run') runCmd(opt);
else if(cmd === 'help' || cmd === '-h') helpView();
else if(cmd === 'version' || cmd === '-v') versionView();
// else errView(err);

