const request = require(__basedir + '/lib/request');
const interface = require(__basedir + '/lib/interface');

module.exports = async () => {
    var credentials = await interface.register()
    var response = await request.register(credentials);
    console.log(response);
}