const interface = require('../lib/interface');
const filesystem = require('../lib/filesystem');
const request = require('../lib/request');

module.exports = async () => {
    let current = await filesystem.current('./resources/maven-metadata.xml');

    let updated = await request.updated();
    
    let versions;
    if (current == updated) {
        versions = await filesystem.versions('./resources/maven-metadata.xml');
    } else {
        versions = await request.versions();
    }

    let response = await interface.create(versions);    

    let path = '.';
    
    let package = path + '/src/main/java/' + response.groupId.replace(/\./g, "/");
    
    filesystem.make(package);
    filesystem.make(path + '/src/main/resources');
    filesystem.make(path + '/src/test');
    
    filesystem.setup('./resources/pom.xml', path + '/pom.xml', response);
    filesystem.setup('./resources/Sample.java', `${package}/${response.artifactId}.java`, response);
    filesystem.setup('./resources/TestSampleApplication.java',`${package}/Run${response.artifactId}Application.java`, response);
}