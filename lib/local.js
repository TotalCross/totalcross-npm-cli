const Configstore = require('configstore');

const pkg = require(__basedir + '/package.json');

module.exports = {
    save: async (token) => {
        const conf = new Configstore(pkg.name);
        conf.set('access.token',token);
    },

    token: async () => {
        const conf = new Configstore(pkg.name);
        return conf.get('access.token');
    }
}
