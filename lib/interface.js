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
    },

    login: async () => {
        const response = await prompt([
            {
                type: 'input',
                name: 'email', 
                message: 'Enter your email:', 
                initial: 'type@your.email',
            },
            {       
                type: 'password',
                name: 'password', 
                message: 'Enter your password:'
            }
        ])
        return response; 
    },

    register: async () => {
        const response = await prompt([
            {
                type: 'input',
                name: 'username', 
                message: 'Username:', 
                initial: 'new_user',
            },
            {
                type: 'input',
                name: 'email', 
                message: 'Enter your email:', 
                initial: 'type@your.email',
            },
            {       
                type: 'password',
                name: 'password', 
                message: 'Enter your password:'
            },
            {
                type: 'input',
                name: 'firstName', 
                message: 'First name:', 
                initial: 'New',
            },
            {
                type: 'input',
                name: 'lastName', 
                message: 'Last name:', 
                initial: 'User',
            },
            {
                type: 'input',
                name: 'country', 
                message: 'Contry:', 
                initial: '(Ex: BR, US, PT, GR)',
            }
        ])
        return response; 
    },
};