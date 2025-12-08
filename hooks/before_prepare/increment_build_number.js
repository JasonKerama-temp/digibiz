#!/usr/bin/env node

var fs = require('fs');
var xml2js = require('xml2js');
var configPath = `${__dirname}/../../config.xml`;

module.exports = function(context) {
// Read config.xml
fs.readFile(configPath, 'utf8', function(err, data) {
  if(err) {
    return console.log(err);
  }
  
  // Get XML
  var xml = data;
  
  // Parse XML to JS Obj
  xml2js.parseString(xml, function (err, result) {
    if(err) {
      return console.log(err);
    }
    
    // Get JS Obj
    var obj = result;
    
    // ios-CFBundleVersion doen't exist in config.xml
    if(typeof obj['widget']['$']['ios-CFBundleVersion'] === 'undefined') {
      obj['widget']['$']['ios-CFBundleVersion'] = 0;
    }
    
    // android-versionCode doen't exist in config.xml
    if(typeof obj['widget']['$']['android-versionCode'] === 'undefined') {
      obj['widget']['$']['android-versionCode'] = 0;
    }
    
    // Increment build numbers (separately for iOS and Android)
    obj['widget']['$']['ios-CFBundleVersion']++;
    obj['widget']['$']['android-versionCode']++;
    
    // Build XML from JS Obj
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    
    // Write config.xml
    fs.writeFile(configPath, xml, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('Build number successfully incremented');
    });
    
  });
});

}