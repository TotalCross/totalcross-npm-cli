const interface = require(__basedir + '/lib/interface');
const terminal = require(__basedir + '/lib/terminal');

module.exports  = async () => {
    let response = await interface.deploy();
    
    await terminal.scp({
        file: 'target/install/linux_arm/*',
        user: response.username,
        host: response.host,
        port: '22',
        path: response.path
    });
}