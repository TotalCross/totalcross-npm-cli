const request = require(__basedir + '/lib/request');
const interface = require(__basedir + '/lib/interface');
const local = require(__basedir + '/lib/local');

module.exports = async () => {
    var credentials = await interface.login()
    var token = await request.login(credentials);
    local.save(token);
}