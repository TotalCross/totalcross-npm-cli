const { prompt } = require('enquirer');

module.exports = {
    create: async (versions) => {
        const response = await prompt([
            {
                type: 'input',
                name: 'groupId', 
                message: 'Enter a new project groupId:', 
                initial: 'com.totalcross',
            },
            {       
                type: 'input',
                name: 'artifactId', 
                message: 'Enter a new project artifactId:',
                initial: 'HelloWorld'
            },
            {    
                type: 'input',
                name: 'activationKey', 
                message: 'Enter your TotalCross Key (24 characters)', 
                initial: '000000000000000000000000'
            },
            {
                type: 'select',
                name: 'version' , 
                message: 'Choose SDK version (confirm with [ENTER]):', 
                choices: versions
            },
            {
                type: 'multiselect',
                name: 'platforms' , 
                message: 'Choose target platforms (select with [SPACE] and confirm with [ENTER]):', 
                choices: ['-android', '-ios', '-linux', '-linux_arm', '-win32', '-wince']
            }
        ])
        return response; 
    },
    
    deploy: async (versions) => {
        const response = await prompt([
            {
                type: 'input',
                name: 'username', 
                message: 'Enter your ssh username:', 
                initial: 'root',
            },
            {       
                type: 'input',
                name: 'host', 
                message: 'Enter your ssh host:',
                initial: '192.168.0.25'
            },
            {    
                type: 'password',
                name: 'password', 
                message: 'Enter your host password:',
            },
            {
                type: 'input',
                name: 'path' , 
                message: 'Enter host path:', 
                initial: '~/'
            },
            {
                type: 'toggle',
                name: 'run' , 
                message: 'You want to run after deploy?', 
                enable: 'Yes',
                disable: 'No'
            }
        ])
        return response; 
    }
};