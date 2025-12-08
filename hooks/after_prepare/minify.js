#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var CleanCSS = require('clean-css');
const { minify } = require("terser");
var cssMinifier = new CleanCSS({
    keepSpecialComments: 0
});

var platform = process.argv[3];
var platformPath = path.join('platforms', platform);
var flags = process.argv.splice(4);

console.log('cordova-minify STARTING - minifying your js, css, and images. Sit back and relax!');

function processFiles(dir) {
    if (flags.includes('--compress')) {
        fs.readdir(dir, function (err, list) {
            if (err) {
                console.log('processFiles - reading directories error: ' + err);
                return;
            }
            list.forEach(function (file) {
                file = path.join(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat.isDirectory()) {
                        processFiles(file);
                    } else {
                        compress(file);
                    }
                });
            });
        });
    } else {
        return;
    }
}

async function compress(file) {
    var ext = path.extname(file);
    switch (ext) {
        case '.js':
            var fileCode = fs.readFileSync(file, 'utf8');
            var result = await minify(fileCode);
            fs.writeFileSync(file, result.code, 'utf8');
            break;
        case '.css':
            var source = fs.readFileSync(file, 'utf8');
            var result = cssMinifier.minify(source);
            fs.writeFileSync(file, result.styles, 'utf8');
            break;
        default:
            // console.log('Encountered file with ' + ext + ' extension - not compressing.');
            break;
    }
}


switch (platform) {
    case 'browser':
        platformPath = path.join(platformPath, "www");
        break;
    case 'android':
        platformPath = path.join(platformPath, "app", "src", "main", "assets", "www");
        break;
    case 'ios':
        platformPath = path.join(platformPath, "www");
        break;
    default:
        console.log('Hook currently supports only Android and iOS');
        console.log('input platform - ', platform);
        break;
}

//process Files
processFiles(platformPath);