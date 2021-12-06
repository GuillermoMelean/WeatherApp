const builder = require('xmlbuilder');
const doc = builder.create('root');
const { dirname } = require('path');
const fs = require('fs'); 
var os = require("os");

const saveLog = (endpoint, remoteAddress, cities) => {
    try {
        const FILE_PATH = dirname(require.main.path) + '\\log.csv';
        let newRequest = new Date().toISOString() + "|" + remoteAddress + "|" + endpoint + "|" + cities + os.EOL;

        fs.open(FILE_PATH, 'a', 666, function (e, id) {
            fs.write(id, newRequest, null, 'utf8', function () {
                fs.close(id, function () {
                    console.log('file is updated');
                });
            });
        }); 
    }
    catch (e) {
        console.log("Error: " + e);
    }
}

module.exports = { saveLog }