const terminal = require(__basedir + '/lib/terminal');
const request = require(__basedir + '/lib/request');
const filesystem = require(__basedir + '/lib/filesystem');

module.exports  = async () => {
    if(await request.valid(await filesystem.token()) == false) {
        console.log("Invalid token, please run:\n\n$ totalcross login\n\nor totalcross --help for more information");
        return -1
    };

    await terminal.run('mvn package');
}