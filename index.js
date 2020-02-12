#!/usr/bin/env node
global.__basedir = __dirname;

const create = require(__basedir + '/src/create');
const packaging = require(__basedir + '/src/packaging');
const deploy = require(__basedir + '/src/deploy');
const login = require(__basedir + '/src/login');
const register = require(__basedir + '/src/register');

const program = require('commander');

const run = async () => { 
    program
    .command('create')
    .description('create new TotalCross project')
    .action(async () => {
        await create();
    });

    program
    .command('packaging')
    .description('create package')
    .action(async () => {
        await packaging();
    });

    program
    .command('deploy')
    .description('deploy your application')
    .action(async () => {
        await deploy();
    });

    program
    .command('login')
    .description('')
    .action(async () => {
        await login();
    });

    program
    .command('register')
    .description('')
    .action(async () => {
        await register();
    });

    await program.parse(process.argv);
}

run();
