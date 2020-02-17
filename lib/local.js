const Configstore = require('configstore');

const pkg = require(__basedir + '/package.json');

module.exports = {
    save: async (token, key) => {
        const conf = new Configstore(pkg.name);
        conf.set('access.token',token);
        conf.set('access.key',key);
    },

    token: async () => {
        const conf = new Configstore(pkg.name);
        return conf.get('access.token');
    },

    key: async () => {
        const conf = new Configstore(pkg.name);
        return conf.get('access.key');
    }
}
