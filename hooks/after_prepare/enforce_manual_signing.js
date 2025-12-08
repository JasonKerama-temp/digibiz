#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

console.log('Running hook: Enforcing Manual Code Signing...');

// Path to the Cordova-generated Xcode project file
const projectPath = path.join(
    __dirname,
    '../../platforms/ios',
    'Digibiz.xcodeproj', // Replace with your project name if different
    'project.pbxproj'
);

if (!fs.existsSync(projectPath)) {
    console.error(`Project file not found at: ${projectPath}`);
    process.exit(1);
}

try {
    const project = xcode.project(projectPath);
    project.parseSync();

    // 1. Get the main target ID (e.g., 'Digibiz')
    const target = project.pbxNativeTargetByName('Digibiz');
    if (!target) {
        console.error('Could not find main target "Digibiz".');
        process.exit(1);
    }
    
    // 2. Iterate through all build configurations (Release, Debug)
    const configurations = project.pbxXCBuildConfigurationSection();
    
    for (const configUuid in configurations) {
        const config = configurations[configUuid];
        if (typeof config === 'object' && config.buildSettings) {
            // Force Manual Signing
            config.buildSettings['CODE_SIGNING_STYLE'] = 'Manual';
            
            // Ensure necessary manual signing variables are clean/set
            config.buildSettings['CODE_SIGN_IDENTITY[sdk=iphoneos*]'] = '"iPhone Developer"'; 
            config.buildSettings['DEVELOPMENT_TEAM'] = 'Z6XW557ZX2';
            
            console.log(`Updated configuration: ${config.buildSettings.name} to Manual.`);
        }
    }

    // 3. Write the changes back to the project file
    fs.writeFileSync(projectPath, project.writeSync());
    console.log('Successfully enforced Manual Signing in project.pbxproj.');

} catch (err) {
    console.error('Error modifying project file:', err);
    process.exit(1);
}