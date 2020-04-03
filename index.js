#!/usr/bin/env node
global.__basedir = __dirname;

const core = require('totalcross-core-dev')
const interface = require(__basedir + '/lib/interface')
const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');
const client = require('scp2');

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
            console.log(chalk.yellow('\nReport this error here https://github.com/TotalCross/totalcross-npm-cli'));
            
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

            console.log(error);
            

            console.log(chalk.red('Packaging failed'));
            console.log(chalk.yellow('\nReport this error here https://github.com/TotalCross/totalcross-npm-cli'));
        })
    });
    
    program
    .command('deploy')
    .description('deploy your application')
    .action(async () => {
        console.log(chalk.bold('Deploy wizard!\n'));

        if (process.platform === "win32") {
            console.log(chalk.bgRed('You must have problems with windows, we are working on it'));
            
        }
        let options = await interface.deploy();

        console.log('\n');
        client.scp('target/install/linux_arm/', {
            username: options.username,
            host: options.host,
            path: options.path,
            password: options.password
        },(error)=> {
            if (error == null) console.log(chalk.green('Success!'));
            else {console.log(chalk.red(error));
            console.log(chalk.yellow('\nReport this error here https://github.com/TotalCross/totalcross-npm-cli'));
            }
        });

            // ;
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
            console.log(chalk.yellow('\nReport this error here https://github.com/TotalCross/totalcross-npm-cli'));
        })
    });
    
    program
    .command('register')
    .description('create TotalCross account')
    .action(async () => {
        console.log(chalk.bold('Complete the registration steps:\n'));


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
            console.log(chalk.yellow('\nReport this error here https://github.com/TotalCross/totalcross-npm-cli'));
        })
    });

    program.version('TotalCross CLI v1.2.0 (Alpha)')
    program.parse(process.argv);
}

run();
