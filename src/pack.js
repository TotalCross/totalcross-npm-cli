const terminal = require('../lib/terminal');

module.exports  = async () => {
    await terminal.run('mvn package');
}