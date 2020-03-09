#!/usr/bin/env node
global.__basedir = __dirname;

const core = require('totalcross-core-dev')
const interface = require(__basedir + '/lib/interface')
const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');


const run = async () => { 
    
    program
    .command('create')
    .description('create new TotalCross project')
    .action(async () => {
        
        let versions = await core.latestVersions()

        console.log(chalk.bold('New project wizard!\n'));

        let options = await interface.create(versions)

        console.log('\n');

        core.auth()
        .then((response) => {
            console.log(chalk.green(response));
            core.create(options)
            .then((response) => {
                console.log(chalk.green(response));
            })
            .catch((error) => {
                console.log(chalk.red(error));
            })
        })
        .catch((error) => {
            console.log(chalk.red(error.message));
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
            console.log(chalk.green('Packaging success!'));
        })
        .catch((error) => {
            spinner.stop();
            console.log(chalk.red('Packaging failed'));
        })
    });
    
    program
    .command('deploy')
    .description('deploy your application')
    .action(async () => {
        console.log(chalk.bold('Deploy wizard!\n'));

        let options = await interface.deploy();

        console.log('\n');

        core.deploy({
            username: options.username,
            host: options.host,
            path: options.path
        })
        .then((response) => {
            console.log(chalk.green(response));
        })
        .catch((error) => {
            console.log(chalk.red(error.message));
        })
    });
    
    program
    .command('login')
    .description('login into your TotalCross account')
    .action(async () => {
        console.log(chalk.bold('Please login into your TotalCross account:\n'));

        var options = await interface.login()

        console.log('\n');

        core.login(options)
        .then((response) => {
            console.log(chalk.green(response));
        })
        .catch((error) => {
            console.log(chalk.red(error.message));
        })
    });
    
    program
    .command('register')
    .description('create TotalCross account')
    .action(async () => {
        console.log(chalk.bold('Complete the registration steps:\n'));

        if (process.platform === "win32") {
            console.log(chalk.bgRed('You must have problems with windows, we are working on it'));
            
        }

        var options = await interface.register()

        console.log('\n');

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
            console.log(chalk.green(response.message));
        })
        .catch((error) => {
            console.log(chalk.red(error.message));
        })
    });

    program.version('TotalCross CLI v1.1.1 (Alpha)')
    program.parse(process.argv);
}

run();
