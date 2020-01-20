#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import program from 'commander';
import pkg from '../package.json';

const userhome = process.env[process.platform === 'win32' ? "USERPROFILE" : "HOME"];
const configfile = '.shandsrc';
const config = path.join(userhome, configfile);

if(!fs.existsSync(config)) {
  fs.writeFileSync(config, '{"commands": []}');
  console.log(`${configfile}を新規作成`);
}

const shands = JSON.parse(fs.readFileSync(config, 'utf8'));

interface Data {
  name: string,
  cmd: string,
}

program.version(pkg.version, '-v --version');

program
  .command('set <key> <value>')
  .description('コマンドを設定します')
  .action((key, value) => {
    const data: Data = {name: key, cmd: value};
    shands.commands.push(data);
    const addData = `{"commands": ${JSON.stringify(shands.commands)}}`;
    console.log(addData);
    fs.writeFileSync(config, addData);
  });

program
  .command('run <command>')
  .description('コマンドを走らせる')
  .action(command => {
    shands.commands.forEach((obj: Data) => {
      if (obj.name === command) {
        exec(obj.cmd, { encoding: process.platform === 'win32' ? 'Shift_JIS' : 'utf8' }, (error, stdout, stderr) => {
          if (error) {
            console.error(`ERR! ${error}`);
            return;
          }
          console.log(`\nstdout:\n${stdout}`);
          console.log(`stderr:\n${stderr}`);
        })
        console.log(obj.cmd);
      }
    });
  })

program.parse(process.argv);
