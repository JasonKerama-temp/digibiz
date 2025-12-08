#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

console.log('Running hook: Enforcing Manual Code Signing...');

// The name of the project file (e.g., Digibiz)
const projectName = 'Digibiz'; 
const projectPath = path.join(
    __dirname,
    '../../platforms/ios',
    `${projectName}.xcodeproj`,
    'project.pbxproj'
);

if (!fs.existsSync(projectPath)) {
    console.error(`Project file not found at: ${projectPath}`);
    process.exit(1);
}

try {
    const project = xcode.project(projectPath);
    project.parseSync();

    // 1. Get the main app target (The target whose name matches the project name)
    let mainTargetId;
    let mainTargetName;

    // Iterate through PBXNativeTarget section to find the main app target
    const targets = project.pbxNativeTargetSection();
    for (let targetId in targets) {
        if (targets[targetId].name === projectName) {
            mainTargetId = targetId;
            mainTargetName = targets[targetId].name;
            break;
        }
    }

    if (!mainTargetId) {
        console.error(`Could not find main target "${projectName}".`);
        process.exit(1);
    }
    
    console.log(`Found main target: ${mainTargetName} (ID: ${mainTargetId})`);

    // 2. Iterate through all build configurations (Release, Debug)
    const configurations = project.pbxXCBuildConfigurationSection();
    
    for (const configUuid in configurations) {
        const config = configurations[configUuid];
        
        // Ensure we are only modifying configurations that belong to our main target
        if (config.target === mainTargetId) {
             if (typeof config === 'object' && config.buildSettings) {
                // Force Manual Signing
                config.buildSettings['CODE_SIGNING_STYLE'] = 'Manual';
                
                // Ensure necessary manual signing variables are set
                config.buildSettings['CODE_SIGN_IDENTITY[sdk=iphoneos*]'] = '"iPhone Developer"'; 
                config.buildSettings['DEVELOPMENT_TEAM'] = 'Z6XW557ZX2';
                
                // Fix the IPHONEOS_DEPLOYMENT_TARGET warning on the main target (though config.xml should handle this)
                config.buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'; 
                
                console.log(`Updated configuration: ${config.buildSettings.name} to Manual for target ${mainTargetName}.`);
            }
        }
    }

    // 3. Write the changes back to the project file
    fs.writeFileSync(projectPath, project.writeSync());
    console.log('Successfully enforced Manual Signing in project.pbxproj.');

} catch (err) {
    console.error('Error modifying project file:', err);
    process.exit(1);
}