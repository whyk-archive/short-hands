#!/user/bin/env node

const npmRun = require('npm-run');
const path = require('path');
const fs = require('fs');

const pkg = require('../package.json');
const userhome = process.env[process.platform === 'win32' ? "USERPROFILE" : "HOME"];
const configfile = '.npmaliasconfig';
const config = path.join(userhome, configfile);
const alias = JSON.parse(fs.readFileSync(config, 'utf8'));
const args = process.argv;
const cmd = args[2];
const opt = args[3];
const objParse = obj => Object.keys(obj);


const versionView = () => {
    console.log(`v${pkg.version}`);
}

const helpView = () => {
    console.log(`
        ${objParse(pkg.bin)} cmd opt
        
        Cmd
        - set: set up alias
        - run: Use the set up alias
        - version, -v: print current version
        - help, -h: print help

        Opt
        if 'set': Name of alias to set (ex. ${objParse(pkg.bin)} set lsdeep 'npm ls --depth=0')
        if 'run': Name of the alias you set (ex. ${objParse(pkg.bin)} run lsdeep)
    `);
    
}

const errView = () => {
  console.log(`ERR! ${cmd} is not command`);
}

const setCmd = () => {
    const cmdName = args[3];
    const cmdDetail = args[4];

    const existConfig = () => {
        try {
            fs.statSync(config)
            return true;
        } catch (err) {
            if(err.code === 'ENOENT') return false;
        }
    }

    if(!existConfig) {
        fs.writeFileSync(config, '{commands: []}');
        console.log(`${configfile}を新規作成`);
    }

    const cmdData = {name: cmdName, cmd: cmdDetail};
    console.log(cmdData);
    // const addData = alias.push(cmdData);
    // console.log(alias[0]);
}

const runCmd = alias => {
    npmRun(alias);
}


if(cmd === 'set') setCmd();
else if(cmd === 'run') runCmd(opt);
else if(cmd === 'help' || cmd === '-h') helpView();
else if(cmd === 'version' || cmd === '-v') versionView();
else errView();

