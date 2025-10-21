
// auth-system.js - Sistema compatible con ambos entornos
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

function checkAuthStatus() {
    if (localStorage.getItem('prodismo_auth') === 'true') {
        // Si ya está autenticado, asegurarse de que no hay modal
        const existingOverlay = document.getElementById('auth-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
            document.body.style.overflow = '';
        }
        return;
    }
    
    initializeAuthSystem();
}

async function initializeAuthSystem() {
    try {
        // Esperar a que la configuración esté disponible
        if (typeof window.CONFIG === 'undefined') {
            console.warn('Configuración no cargada, reintentando...');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (window.CONFIG && window.CONFIG.ACCESS_CODES) {
            console.log('✅ Configuración cargada correctamente');
            console.log('🔐 Entorno:', window.CONFIG.ENV);
            createAuthModal();

        } else {
            throw new Error('No se pudo cargar la configuración');
        }
        
    } catch (error) {
        console.error('Error inicializando sistema de autenticación:', error);
        
        // Fallback: mostrar modal con código de desarrollo
        window.CONFIG = {
            ACCESS_CODES: ['DEV123'],
            ENV: 'fallback'
        };
        createAuthModal();
    }
}

function createAuthModal() {
    // Crear overlay con blur
    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        width: 90%;
        max-width: 450px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        position: relative;
    `;
    
    // Contenido del modal
    modal.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="./images/ITProdimo_logo.png" alt="Logo Prodismo" style="height: 50px; margin-bottom: 1rem; margin-left: auto;margin-right: auto">
            <h2 style="color: #1e40af; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">
                Acceso Restringido
            </h2>
            <p style="color: #1e40af; font-size: 1.1rem;">
                Información: [INTERNO]
            </p>
            <p style="color: #6b7280; font-size: 0.95rem;">
                Ingrese el código de autorización para acceder al portal
            </p>
        </div>
        
        <form id="auth-form">
            <div style="margin-bottom: 1.5rem;">
                <label for="auth-code" style="display: block; text-align: left; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">
                    Código de Autorización
                </label>
                <input 
                    type="password" 
                    id="auth-code" 
                    required 
                    style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;"
                    placeholder="Ingrese el código de acceso"
                >
                <div id="code-error" style="color: #dc2626; font-size: 0.875rem; margin-top: 0.5rem; display: none;">
                    Código incorrecto. Intente nuevamente.
                </div>
            </div>
            
            <button 
                type="submit" 
                id="submit-btn"
                style="width: 100%; background-color: #1e40af; color: white; padding: 0.75rem; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background-color 0.2s;"
            >
                Verificar Código
            </button>
        </form>
        
        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
                ¿No tiene un código de acceso?
            </p>
            <button 
                id="request-code-btn"
                style="width: 100%; background-color: #f3f4f6; color: #374151; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-weight: 500; font-size: 0.9rem; cursor: pointer; transition: background-color 0.2s;"
            >
                Solicitar Código de Acceso
            </button>
        </div>
    `;
    
    // Agregar elementos al DOM
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    
    // Manejar envío del formulario
    document.getElementById('auth-form').addEventListener('submit', function(e) {
        e.preventDefault();
        verifyAuthCode();
    });
    
    // Manejar solicitud de código
    document.getElementById('request-code-btn').addEventListener('click', function() {
        requestAccessCode();
    });
    
    // Enfocar el campo de código al cargar
    document.getElementById('auth-code').focus();
}

function verifyAuthCode() {
    const codeInput = document.getElementById('auth-code');
    const submitBtn = document.getElementById('submit-btn');
    const errorDiv = document.getElementById('code-error');
    const code = codeInput.value.trim();

    console.log('🔐 Verificando código:', code);
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const isValid = window.CONFIG.ACCESS_CODES.includes(code);
        console.log('✅ Resultado verificación:', isValid);

        if (isValid) {
            handleSuccessfulAuth();
        } else {
            handleFailedAuth(codeInput, submitBtn, errorDiv);
        }
    }, 1000);
}

function handleSuccessfulAuth() {
    console.log('🎉 Autenticación exitosa');
    localStorage.setItem('prodismo_auth', 'true');
    
    // Cerrar el modal inmediatamente
    const overlay = document.getElementById('auth-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }

    // Mostrar confirmación después de cerrar el modal
    Swal.fire({
        title: '¡Acceso Autorizado!',
        text: 'Bienvenido al portal de Seguridad de la Información de PRODISMO SRL',
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#1e40af'
    });
}


function handleFailedAuth(codeInput, submitBtn, errorDiv) {
    errorDiv.style.display = 'block';
    codeInput.style.borderColor = '#dc2626';
    codeInput.value = '';
    codeInput.focus();
    
    submitBtn.innerHTML = 'Verificar Código';
    submitBtn.disabled = false;
    modalShake();
    
    // Mostrar código de desarrollo en consola para debugging
    if (window.CONFIG.ENV === 'development' || window.CONFIG.ENV === 'fallback') {
        // console.log('🔍 Para desarrollo, usa uno de estos códigos:', window.CONFIG.ACCESS_CODES);
    }
}

function requestAccessCode() {
    Swal.fire({
        title: 'Solicitar Código de Acceso',
        html: `
            <div style="text-align: left;">
                <p style="margin-bottom: 1rem;">Para solicitar un código de acceso, envíe un correo electrónico a nuestro equipo de IT:</p>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <strong>Email:</strong> 
                    <a href="mailto:itprodismo@prodismo.com" style="color: #1e40af;">itprodismo@prodismo.com</a>
                </div>
                <p style="font-size: 0.9rem; color: #6b7280;">
                    Incluya en el asunto: "Solicitud de Código de Acceso - Portal Seguridad"
                </p>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Copiar Email',
        confirmButtonColor: '#1e40af',
        showCancelButton: true,
        cancelButtonText: 'Cerrar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Copiar email al portapapeles
            navigator.clipboard.writeText('itprodismo@prodismo.com').then(() => {
                Swal.fire({
                    title: 'Email Copiado',
                    text: 'La dirección de email ha sido copiada al portapapeles',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            });
        }
    });
}

function modalShake() {
    const modal = document.getElementById('auth-modal');
    modal.style.animation = 'shake 0.5s';
    setTimeout(() => {
        modal.style.animation = '';
    }, 500);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    #auth-code:focus {
        outline: none;
        border-color: #1e40af;
        box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }
    
    #submit-btn:hover:not(:disabled) {
        background-color: #1e3a8a !important;
    }
    
    #request-code-btn:hover {
        background-color: #e5e7eb !important;
    }
`;
document.head.appendChild(style);


