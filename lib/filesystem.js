const fs = require('fs-extra');
const request = require('request');
const xmlParser = require('xml-js');
const replace = require('replace-in-file');

module.exports = {
    make: async (path) => {
        await fs.ensureDir(path);
    },

    setup: async (path, target, groupId, artifactId, version, platforms, activationKey) => {
        return fs.copy(path, target)
        .then(async function() {
            
            let platformStr = '';
            if(platforms) {
                for(let i = 0; i < platforms.length; i++) {
                    let platform = `<platforms>${platforms[i]}</platforms>`;
                    if(i < 0 ) {
                        platform = '\t\t\t\t\t\t' + platforms;
                    }
                    if(i < platforms.length - 1) {
                        platform += '\n';
                    }
                    platformStr += platform;
                }
            } 
            await replace({files: target, from: /\${'groupid'}/g, to: groupId}); 
            await replace({files: target, from: /\${'artifactid'}/g, to: artifactId}); 
            await replace({files: target, from: /\${'version'}/g, to: version}); 
            await replace({files: target, from: /\${'platforms'}/g, to: platformStr}); 
            await replace({files: target, from: /\${'activation_key'}/g, to: activationKey}); 
        })
        .catch((err) => {
            console.error(err);
        });
    },

    versions: async (metadata) => {
        return fs.stat(metadata)
        .then(async (stats) => {
            let fileContent = null;
            if(!stats) {
                request('https://maven.totalcross.com/artifactory/repo1/com/totalcross/totalcross-sdk/maven-metadata.xml');
            }
            
            return fs.readFile(metadata)
            .then((file) => {
                let jsonContent = xmlParser.xml2json(file.toString(), {compact: true});
                let jsonObj = JSON.parse(jsonContent);
                let arr = jsonObj.metadata.versioning.versions.version.map((x) => x._text);
                arr.sort().reverse();
                return arr;
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }
}