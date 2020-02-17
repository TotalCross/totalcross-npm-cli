const request = require('request-promise');
const convert = require('xml-js');

module.exports = {
    versions: async () => {
        let versions;

        let options = {
            method: 'GET',
            uri: 'https://maven.totalcross.com/artifactory/repo1/com/totalcross/totalcross-sdk/maven-metadata.xml',
            transform: (response) => {
                return JSON.parse(convert.xml2json(response, {compact: true})).metadata.versioning.versions.version.map((x) => x._text).sort().reverse();
            }
        };

        await request(options)
            .then((response) => {
                versions = [response[0],response[1],response[2],response[3],response[4]];
            })
            .catch((error) => {
                console.log(error);
            });

        return versions;
    },

    updated: async () => {
        let updated;

        let options = {
            method: 'HEAD',
            uri: 'https://maven.totalcross.com/artifactory/repo1/com/totalcross/totalcross-sdk/maven-metadata.xml',
        };

        await request(options)
            .then((response) => {
                let date = response['last-modified'].split(" ");
                let moment = date[4].split(":");
                let months = {
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
                updated = date[3] + months[date[2]] + date[1] + moment[0] + moment[1] + moment[2];
            }).catch((error) => {
                console.log(error);
            });
        return updated;
    },

    login: async (credentials) => {
        let token, key;

        let options = {
            method: 'POST',
            uri: 'https://us-central1-totalcross-user-area.cloudfunctions.net/app/api/v1/login',
            body:{
                    "email": credentials.email,
                    "password": credentials.password
                },
            json: true
        };

        await request(options)
        .then(function (response) {
            token = response.accessToken;
            key = response.totalcrossKey;
            
        })
        .catch(function (error) {
            console.log(error);
            
        });

        return {token: token, key: key};
    },

    register: async (credentials) => {
        let token;

        let options = {
            method: 'POST',
            uri: 'https://us-central1-totalcross-user-area.cloudfunctions.net/app/api/v1/register',
            body:{
                    "userName": credentials.username,
                    "email": credentials.email,
                    "password": credentials.password,
                    "firstName": credentials.firstName,
                    "lastName": credentials.lastName,
                    "country": credentials.country,
                },
            json: true
        };

        await request(options)
        .then(function (response) {
            token = response;
            
        })
        .catch(function (error) {
            console.log(error);
            
        });

        return token;
    },

    valid: async (token) => {
        let isValid;

        let options = {
            method: 'GET',
            uri: 'https://us-central1-totalcross-user-area.cloudfunctions.net/app/api/v1/validate-token',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            resolveWithFullResponse: true
        };

        await request(options)
        .then(function (response) {
            if(response.statusCode == 200) isValid = true;
            console.log(response.body);
        })
        .catch(function (error) {
            isValid = false;
        });

        return isValid;
    }
}