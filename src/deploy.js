const interface = require(__basedir + '/lib/interface');
const terminal = require(__basedir + '/lib/terminal');
const request = require(__basedir + '/lib/request');
const filesystem = require(__basedir + '/lib/filesystem');

module.exports  = async () => {
    if(await request.valid(await filesystem.token()) == false) {
        console.log("Invalid token, please run:\n\n$ totalcross login\n\nor totalcross --help for more information");
        return -1
    };

    let response = await interface.deploy();
    
    await terminal.scp({
        file: 'target/install/linux_arm/*',
        user: response.username,
        host: response.host,
        port: '22',
        path: response.path
    });
}