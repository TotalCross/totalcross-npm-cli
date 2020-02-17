const terminal = require(__basedir + '/lib/terminal');
const request = require(__basedir + '/lib/request');
const local = require(__basedir + '/lib/local');

module.exports  = async () => {
    if(!request.valid(await local.token())) {
        console.log("Invalid token, please run:\n\n$ totalcross login\n\nor totalcross --help for more information");
        return -1
    };

    await terminal.run('mvn package');
}