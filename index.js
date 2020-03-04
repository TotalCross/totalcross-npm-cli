#!/usr/bin/env node
global.__basedir = __dirname;

const core = require('totalcross-core-dev')
const interface = require(__basedir + '/lib/interface')
const program = require('commander');
const ora = require('ora');


const run = async () => { 
    
    program
    .command('create')
    .description('create new TotalCross project')
    .action(async () => {
        
        let versions = await core.latestVersions()

        let options = await interface.create(versions)

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
            console.log(error.message);
        })
    });
    
    program
    .command('package')
    .description('runs mvn package')
    .action(async () => {
        let spinner = ora('Packaging')
        spinner.start();
        core.package()
        .then((response) => {
            spinner.stop();
            console.log('Packaging success!');
        })
        .catch((error) => {
            spinner.stop();
            console.log('Packaging failed');
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
            console.log(error.message);
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
            console.log(error.message);
        })
    });
    
    program
    .command('register')
    .description('create TotalCross account')
    .action(async () => {
        var options = await interface.register()

        if (options.password !== options.confirm) {
            console.log('Password and confirmation are wrong');
            return -1;
        }
        
        if (options.privacy === 'I do not agree') {
            console.log('Totalcross CLI requires the Privacy Policy to be accepted');
            return -1;
        }


        core.register(options)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.message);
        })
    });

    program.version('TotalCross CLI 1.1.6')
    program.parse(process.argv);
}

run();
