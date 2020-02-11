const terminal = require(__basedir + '/lib/terminal');

module.exports  = async () => {
    await terminal.run('mvn package');
}