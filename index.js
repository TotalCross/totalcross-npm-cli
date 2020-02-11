#!/usr/bin/env node
global.__basedir = __dirname;

const create = require(__basedir + '/src/create');
const pack = require(__basedir + '/src/pack');
const deploy = require(__basedir + '/src/deploy');

const program = require('commander');

program
.option('-c, --create', 'create new TotalCross project')
.option('-p, --pack', 'create package')
.option('-d, --deploy', 'deploy your application');

program.parse(process.argv);

const run = async () => { 
    if (program.create) await create();
    if (program.pack) await pack();
    if (program.deploy) await deploy();
}

run();
