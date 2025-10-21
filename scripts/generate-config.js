// scripts/generate-config.js
const fs = require('fs');
const path = require('path');

function generateConfig() {
    const isProduction = process.argv.includes('--production');
    
    // Leer códigos de acceso
    let accessCodes;
    
    if (isProduction) {
        // En producción, usar variable de entorno de GitHub Actions
        accessCodes = process.env.ACCESS_CODES;
        console.log('🔧 Modo: Producción (GitHub Secrets)');
    } else {
        // En desarrollo, leer de .env.local
        try {
            const envPath = path.join(__dirname, '..', '.env.local');
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/ACCESS_CODES=(.+)/);
            accessCodes = match ? match[1] : null;
            // console.log('💻 Modo: Desarrollo Local');
        
        } catch (error) {
            console.log('⚠️  No se encontró .env.local, usando códigos de desarrollo');
            // Códigos de desarrollo por defecto
        }
    }
    
    if (!accessCodes) {
        console.error('❌ No se encontraron códigos de acceso');
        process.exit(1);
    }
    
    // Convertir a array
    const codesArray = accessCodes.split(',').map(code => code.trim());
    
    // Generar archivo de configuración
    const config = {
        ACCESS_CODES: codesArray,
        ENV: isProduction ? 'production' : 'development',
        TIMESTAMP: new Date().toISOString()
    };
    
    const configDir = path.join(__dirname, '..', 'js');
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    
    const configPath = path.join(configDir, 'config.generated.js');
    const configContent = `// ARCHIVO GENERADO AUTOMÁTICAMENTE - NO EDITAR MANUALMENTE
    // Generated: ${new Date().toISOString()}
    // Environment: ${isProduction ? 'production' : 'development'}
    window.CONFIG = ${JSON.stringify(config, null, 2)};
    `;
    
    fs.writeFileSync(configPath, configContent);
    console.log('✅ Configuración generada en:', configPath);
    console.log('🔐 Códigos cargados:', codesArray.length);
    
    if (!isProduction) {
        // console.log('📋 Códigos disponibles:', codesArray);
    }
}

generateConfig();