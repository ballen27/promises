'use strict'

const path = require('path');
const fs = require('fs');

exports.resolvedPath = function(directoryPath, fileName) {

    return path.resolve(directoryPath, fileName);

}


exports.readFile = function(filePath) {

    return new Promise(function(resolve, reject) {

        fs.readFile(filePath,'utf8', function(err, data) {

            if (err) return reject(err);
            resolve(data);

        });

    });

}


exports.readDir = function(directory) {

    return new Promise(function(resolve, reject) {

        fs.readdir(directory, function(err, data) {

            if (err) return reject(err);
            resolve(data);

        });

    });

}



exports.readDirFiles = function(dirPath) {

    const files = exports.readDir(dirPath);
    let contentsArray = [];

    return files.then(function(data) {

        for(let i =0; i < data.length; i++) {

            contentsArray.push(exports.readFile(exports.resolvedPath(dirPath, data[i])))

        }

        return Promise.all(contentsArray);

    });

}