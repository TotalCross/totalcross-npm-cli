const request = require(__basedir + '/lib/request');
const interface = require(__basedir + '/lib/interface');

module.exports = async () => {
    var credentials = await interface.login()
    var token = await request.login(credentials);
    console.log(token);
}