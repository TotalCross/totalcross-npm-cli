const interface = require(__basedir + '/lib/interface');
const filesystem = require(__basedir + '/lib/filesystem');
const request = require(__basedir + '/lib/request');

module.exports = async () => {
    if(await request.valid(await filesystem.token()) == false) {
        console.log("Invalid token, please run:\n\n$ totalcross login\n\nor totalcross --help for more information");
        return -1
    };

    let current = await filesystem.current(__basedir + '/resources/maven-metadata.xml');

    let updated = await request.updated();
    
    let versions;
    if (current == updated) {
        versions = await filesystem.versions(__basedir + '/resources/maven-metadata.xml');
    } else {
        versions = await request.versions();
    }

    let response = await interface.create(versions);    

    let path = './' + response.artifactId;
    let package = path + '/src/main/java/' + response.groupId.replace(/\./g, "/");
    filesystem.make(path);
    filesystem.make(package);
    filesystem.make(path + '/src/main/resources');
    filesystem.make(path + '/src/test');
    
    filesystem.setup(__basedir + '/resources/pom.xml', path + '/pom.xml', response, await filesystem.key());
    filesystem.setup(__basedir + '/resources/Sample.java', `${package}/${response.artifactId}.java`, response, await filesystem.key());
    filesystem.setup(__basedir + '/resources/TestSampleApplication.java',`${package}/Run${response.artifactId}Application.java`, response, await filesystem.key());
}