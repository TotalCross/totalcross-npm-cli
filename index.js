#!/usr/bin/env node
global.__basedir = __dirname;

const core = require('totalcross-core-dev')
const interface = require(__basedir + '/lib/interface')
const program = require('commander');

const run = async () => { 
    program
    .command('create')
    .description('create new TotalCross project')
    .action(async () => {
        versions = await core.versions()
        let options = await interface.create([versions[0], versions[1], versions[2], versions[3], versions[4]]);    
        core.auth()
        .then((response) => {
            console.log(response);
            core.create(options)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    });
    
    program
    .command('package')
    .description('runs mvn package')
    .action(async () => {
        console.log(response);
        core.package()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    });
    
    program
    .command('deploy')
    .description('deploy your application')
    .action(async () => {
        let options = await interface.deploy();
        core.deploy({
            username: options.username,
            host: options.host,
            path: options.path
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    });
    
    program
    .command('login')
    .description('login into your TotalCross account')
    .action(async () => {
        var options = await interface.login()
        core.login(options)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    });
    
    program
    .command('register')
    .description('create TotalCross account')
    .action(async () => {
        var options = await interface.register()
        core.register(options)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    });

    program.version('TotalCross CLI 1.1.5')
    program.parse(process.argv);
}

run();
