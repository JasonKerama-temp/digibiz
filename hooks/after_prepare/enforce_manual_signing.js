#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

console.log('🔐 Running hook: Enforcing Manual Code Signing...');

const projectName = 'Digibiz'; 
const teamID = 'Z6XW557ZX2';
const projectPath = path.join(
    __dirname,
    '../../platforms/ios',
    `${projectName}.xcodeproj`,
    'project.pbxproj'
);

if (!fs.existsSync(projectPath)) {
    console.error(`❌ Project file not found at: ${projectPath}`);
    process.exit(1);
}

try {
    const project = xcode.project(projectPath);
    project.parseSync();

    let mainTargetId = null;
    let mainTargetName = null;
    
    // Find the main application target
    const targets = project.pbxNativeTargetSection();
    
    for (const targetId in targets) {
        if (targets[targetId].isa === 'PBXNativeTarget') {
            const target = targets[targetId];
            
            if (target.productType === '"com.apple.product-type.application"') {
                mainTargetId = targetId;
                mainTargetName = target.productName ? target.productName.replace(/"/g, '') : projectName;
                break;
            }
        }
    }

    if (!mainTargetId) {
        console.error(`❌ Could not find main application target for "${projectName}".`);
        process.exit(1);
    }
    
    console.log(`✅ Found main application target: ${mainTargetName} (ID: ${mainTargetId})`);

    // Iterate through all build configurations (Release, Debug)
    const configurations = project.pbxXCBuildConfigurationSection();
    let configCount = 0;
    
    for (const configUuid in configurations) {
        const config = configurations[configUuid];
        
        if (config.target === mainTargetId) {
            if (typeof config === 'object' && config.buildSettings) {
                // DISABLE automatic signing completely
                config.buildSettings['CODE_SIGNING_STYLE'] = 'Manual';
                config.buildSettings['CODE_SIGNING_REQUIRED'] = 'YES';
                config.buildSettings['CODE_SIGNING_IDENTITY[sdk=iphoneos*]'] = '"iPhone Developer"';
                config.buildSettings['CODE_SIGNING_IDENTITY'] = '"iPhone Developer"';
                config.buildSettings['DEVELOPMENT_TEAM'] = teamID;
                
                // Ensure deployment target consistency
                config.buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0';
                
                configCount++;
                console.log(`✅ Configuration "${config.buildSettings.name}": Manual signing enforced`);
            }
        }
    }

    if (configCount === 0) {
        console.warn('⚠️  No build configurations were updated. Check target association.');
    }

    // Write changes back to the project file
    fs.writeFileSync(projectPath, project.writeSync());
    console.log(`✅ Successfully enforced Manual Signing in ${configCount} configuration(s). 🎉`);

} catch (err) {
    console.error('❌ Error modifying project file:', err.message);
    process.exit(1);
}