const interface = require('../lib/interface');
const filesystem = require('../lib/filesystem');

module.exports = async () => {

    let versions = await filesystem.versions('./resources/maven-metadata.xml');

    let response = await interface.create(versions);    

    let path = '.';
    
    let package = path + '/src/main/java/' + response.groupId.replace(/\./g, "/");
    
    filesystem.make(package);
    filesystem.make(path + '/src/main/resources');
    filesystem.make(path + '/src/test');
    
    filesystem.setup('./resources/pom.xml', path + '/pom.xml', response.groupId, response.artifactId, response.version, response.platforms, response.activationKey);
    filesystem.setup('./resources/Sample.java', `${package}/${response.artifactId}.java`, response.groupId, response.artifactId, response.version, response.platforms, response.activationKey);
    filesystem.setup('./resources/TestSampleApplication.java',`${package}/Run${response.artifactId}Application.java`, response.groupId, response.artifactId, response.version, response.platforms, response.activationKey);
}