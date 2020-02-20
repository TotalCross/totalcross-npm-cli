const fs = require('fs-extra');
const replace = require('replace-in-file');
const convert = require('xml-js');
const os = require('os');

module.exports = {
    make: async (path) => {
        await fs.ensureDir(path);
    },

    setup: async (path, target, project, key) => {
        return fs.copy(path, target)
        .then(async () => {
            
            let platformStr = '';
            if(project.platforms) {
                for(let i = 0; i < project.platforms.length; i++) {
                    let platform = `<platforms>${project.platforms[i]}</platforms>`;
                    if(i < 0 ) {
                        platform = '\t\t\t\t\t\t' + project.platforms;
                    }
                    if(i < project.platforms.length - 1) {
                        platform += '\n';
                    }
                    platformStr += platform;
                }
            }
            await replace({files: target, from: /\${'groupid'}/g, to:  project.groupId}); 
            await replace({files: target, from: /\${'artifactid'}/g, to: project.artifactId}); 
            await replace({files: target, from: /\${'version'}/g, to: project.version}); 
            await replace({files: target, from: /\${'platforms'}/g, to: platformStr}); 
            await replace({files: target, from: /\${'activation_key'}/g, to: key}); 
        })
        .catch((error) => {
            console.error(error);
        });
    },

    current: async (metadata) => {
        return fs.stat(metadata).then(async (stats) => {
        return fs.readFile(metadata)
            .then((file) => {
                let jsonContent = convert.xml2json(file.toString(), {compact: true});
                let jsonObj = JSON.parse(jsonContent);
                let current = jsonObj.metadata.versioning.lastUpdated;
                return current;
            })
            .catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        }); 
    },

    versions: async (metadata) => {
            return fs.readFile(metadata)
                .then(function(file) {
                    let jsonContent = convert.xml2json(file.toString(), {compact: true});
                    let jsonObj = JSON.parse(jsonContent);
                    let arr = jsonObj.metadata.versioning.versions.version.map((x) => x._text);
                    arr.sort().reverse();
                    return arr;
                })
                .catch(function(error) {
                    console.log(error);
                });
    },

    save: async (token, key) => {
        fs.writeFile(`${os.homedir()}/TotalCross/.config.json`, JSON.stringify({"token":token,"key":key}), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while saving your credentials.");
                return console.log(err);
            }
         
            console.log("Credentials saved successfully.");
        });
    },

    token: async () => {
        return fs.readFile(`${os.homedir()}/TotalCross/.config.json`)
        .then(function(file) {
            return JSON.parse(file.toString()).token;
        })
        .catch(function(error) {
            console.log(error);
        });
    },

    key: async () => {
        return fs.readFile(`${os.homedir()}/TotalCross/.config.json`)
        .then(function(file) {
            return JSON.parse(file.toString()).key;
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}