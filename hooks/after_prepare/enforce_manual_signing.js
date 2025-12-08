#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

console.log('Running hook: Enforcing Manual Code Signing...');

const projectName = 'Digibiz'; 
const teamID = 'Z6XW557ZX2'; // Use your Development Team ID
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

    let mainTargetId = null;
    let mainTargetName = null;
    
    // Find the main application target based on product type (com.apple.product-type.application)
    const targets = project.pbxNativeTargetSection();
    
    for (const targetId in targets) {
        if (targets[targetId].isa === 'PBXNativeTarget') {
            const target = targets[targetId];
            
            // The main app target has productType "com.apple.product-type.application"
            if (target.productType === '"com.apple.product-type.application"') {
                mainTargetId = targetId;
                // Clean up the name from the quotes Xcode uses, e.g., "Digibiz" becomes Digibiz
                mainTargetName = target.productName ? target.productName.replace(/"/g, '') : projectName;
                break;
            }
        }
    }

    if (!mainTargetId) {
        console.error(`Could not find main application target for "${projectName}".`);
        process.exit(1);
    }
    
    console.log(`Found main application target: ${mainTargetName} (ID: ${mainTargetId})`);

    // Iterate through all build configurations (Release, Debug)
    const configurations = project.pbxXCBuildConfigurationSection();
    
    for (const configUuid in configurations) {
        const config = configurations[configUuid];
        
        // Ensure we are only modifying configurations that belong to our main target
        if (config.target === mainTargetId) {
             if (typeof config === 'object' && config.buildSettings) {
                
                // Force Manual Signing settings
                config.buildSettings['CODE_SIGNING_STYLE'] = 'Manual';
                config.buildSettings['DEVELOPMENT_TEAM'] = teamID;
                config.buildSettings['CODE_SIGN_IDENTITY[sdk=iphoneos*]'] = '"iPhone Developer"'; 
                
                // Ensure deployment target is set correctly for the main target
                config.buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'; 
                
                console.log(`Updated configuration: ${config.buildSettings.name} to Manual for target ${mainTargetName}.`);
            }
        }
    }

    // Write the changes back to the project file
    fs.writeFileSync(projectPath, project.writeSync());
    console.log('Successfully enforced Manual Signing in project.pbxproj. ✅');

} catch (err) {
    console.error('Error modifying project file:', err);
    process.exit(1);
}