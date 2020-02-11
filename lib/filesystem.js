const fs = require('fs-extra');
const request = require('request-promise');
const convert = require('xml-js');
const replace = require('replace-in-file');

module.exports = {
    make: async (path) => {
        await fs.ensureDir(path);
    },

    setup: async (path, target, project) => {
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
            await replace({files: target, from: /\${'activation_key'}/g, to: project.activationKey}); 
        })
        .catch((error) => {
            console.error(error);
        });
    },

    versions: async (metadata) => {
        let versions;

        let options = {
            uri: 'https://maven.totalcross.com/artifactory/repo1/com/totalcross/totalcross-sdk/maven-metadata.xml',
            transform: (payload, response) => {
                let last = response.headers['last-modified'].split(" ");

                let moment = last[4].split(":");
                
                var months = {
                    'Jan' : '01',
                    'Feb' : '02',
                    'Mar' : '03',
                    'Apr' : '04',
                    'May' : '05',
                    'Jun' : '06',
                    'Jul' : '07',
                    'Aug' : '08',
                    'Sep' : '09',
                    'Oct' : '10',
                    'Nov' : '11',
                    'Dec' : '12'
                }

                let update = last[3] + months[last[2]] + last[1] + moment[0] + moment[1] + moment[2];
                
                console.log(update);
                
                
                let json = JSON.parse(convert.xml2json(payload, {compact: true}));
                return {
                    payload: json.metadata.versioning.versions.version.map((x) => x._text).sort().reverse(),
                    update: update
                }
            }
        };

        await request(options)
            .then((response) => {
                versions = [response.payload[0],response.payload[1],response.payload[2],response.payload[3],response.payload[4]];
            })
            .catch((error) => {
                console.log(error);
            });

        return versions;
    }
}