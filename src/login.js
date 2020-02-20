const request = require(__basedir + '/lib/request');
const interface = require(__basedir + '/lib/interface');
const filesystem = require(__basedir + '/lib/filesystem');


module.exports = async () => {
    var credentials = await interface.login()
    var access = await request.login(credentials);
    await filesystem.save(access.token, access.key);
}