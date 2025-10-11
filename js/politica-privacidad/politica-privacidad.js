// JavaScript para la página de Política de Privacidad
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeTheme();
    initQuickActions();
    initBackToTop();
    initScrollToTop;
    initSmoothScrolling();
    initPDFDownload();
    updateDate();
    crearBotonImprimir();
    // Esperar un poco antes de mostrar el banner de cookies para mejor UX
    setTimeout(crearBannerCookies, 1700);
    ocultarBannerCookies();

});

// Función para el toggle de tema claro/oscuro
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Función para cambiar imágenes
    function updateImages(isDark) {
        const logoImages = document.querySelectorAll('[data-theme-logo]');
        
        logoImages.forEach(img => {
            if (isDark) {
                img.src = img.getAttribute('data-dark-src');
            } else {
                img.src = img.getAttribute('data-light-src');
            }
        });
    }
    
    // Apply saved theme on initial load
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if(themeIcon) {
            themeIcon.classList.add('fa-sun');
            themeIcon.classList.remove('fa-moon');
        }
        updateImages(true);
    } else {
        document.documentElement.classList.remove('dark');
        if(themeIcon) {
            themeIcon.classList.add('fa-moon');
            themeIcon.classList.remove('fa-sun');
        }
        updateImages(false);
    }
    
    // Toggle theme on button click
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if(themeIcon) {
                if(isDark) {
                    themeIcon.classList.add('fa-sun');
                    themeIcon.classList.remove('fa-moon');
                } else {
                    themeIcon.classList.add('fa-moon');
                    themeIcon.classList.remove('fa-sun');
                }
            }
            
            // Actualizar imágenes cuando se cambie el tema
            updateImages(isDark);
        });
    }
}

function initQuickActions() {
    // Configurar el botón de contacto
    const contactoBtn = document.getElementById('contacto-btn');
    if (contactoBtn) {
        contactoBtn.addEventListener('click', function() {
            Swal.fire({
                title: 'Contacto Prodismo',
                html: `
                    <div class="text-left">
                        <p class="mb-4"><strong>Prodismo SRL</strong></p>
                        <p class="mb-2"><i class="fas fa-envelope mr-2 text-blue-600"></i> prodismo@prodismo.com</p>
                        <p class="mb-2"><i class="fas fa-phone mr-2 text-blue-600"></i> +54 (351) 499 5921/22/23/24</p>
                        <p class="mb-4"><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> Av. Japón 2230 – Córdoba Capital, Argentina</p>
                        <p class="text-sm text-gray-600">Para consultas sobre protección de datos, contacte a: <strong>privacidad@prodismo.com</strong></p>
                    </div>
                `,
                icon: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#3b82f6'
            });
        });
    }
}

// Botón "Volver arriba"
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            backToTopButton.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible', 'translate-y-0');
            backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Botón para volver al inicio
function initScrollToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            backToTopButton.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible', 'translate-y-0');
            backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navegación suave a secciones
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Descarga de PDF (simulada)
function initPDFDownload() {
    const pdfDownload = document.getElementById('pdf-download');
    
    if (pdfDownload) {
        pdfDownload.addEventListener('click', function() {
            Swal.fire({
                title: 'Descargar PDF',
                text: '¿Desea descargar este documento en formato PDF?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Descargar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Simular descarga
                    Swal.fire({
                        title: 'Descarga iniciada',
                        text: 'El documento se está descargando en formato PDF',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    // En una implementación real, aquí se generaría o descargaría el PDF
                    console.log('Iniciando descarga de PDF...');
                }
            });
        });
    }
}

function updateDate() {
    // Establecer fecha de actualización
    const fechaActualizacion = document.getElementById('fecha-actualizacion');
    if (fechaActualizacion) {
        fechaActualizacion.textContent = new Date().toLocaleDateString('es-ES');
    }
}

// Crear y mostrar el botón de imprimir
function crearBotonImprimir() {
    // Verificar si ya existe el botón
    if (document.getElementById('boton-imprimir-politica')) {
        return;
    }
    
    const printButton = document.createElement('button');
    printButton.id = 'boton-imprimir-politica';
    printButton.innerHTML = '<i class="fas fa-print mr-2"></i> Imprimir Política';
    printButton.className = 'fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 z-50 flex items-center font-medium';
    
    // Aplicar estilos inline para asegurar posicionamiento
    printButton.style.position = 'fixed';
    printButton.style.bottom = '90px';
    printButton.style.right = '24px';
    printButton.style.zIndex = '9999';
    printButton.style.opacity = '0';
    printButton.style.transform = 'translateY(20px)';
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Añadir efecto hover
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
    
    document.body.appendChild(printButton);
    
    // Animación de entrada
    setTimeout(() => {
        printButton.style.opacity = '1';
        printButton.style.transform = 'translateY(0)';
    }, 100);
}
    
// Crear y mostrar el banner de cookies
function crearBannerCookies() {
    // Verificar si ya se ha aceptado/rechazado las cookies
    if (localStorage.getItem('cookiesAceptadasProdismo')) {
        return;
    }
    
    // Verificar si ya existe el banner
    if (document.getElementById('banner-cookies-politica')) {
        return;
    }
    
    const cookieBanner = document.createElement('div');
    console.log('cookieBanner: ', cookieBanner)
    cookieBanner.id = 'banner-cookies-politica';
    cookieBanner.className = 'fixed inset-x-0 bottom-0 bg-gray-900 text-white p-4 z-50';
    
    // Aplicar estilos inline para asegurar posicionamiento
    cookieBanner.style.position = 'fixed';
    cookieBanner.style.bottom = '0';
    cookieBanner.style.left = '0';
    cookieBanner.style.right = '0';
    cookieBanner.style.zIndex = '9998';
    cookieBanner.style.transform = 'translateY(100%)';
    
    cookieBanner.innerHTML = `
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="flex-1">
                    <p class="mb-2 text-sm md:text-base font-medium">
                        🍪 Usamos cookies para mejorar tu experiencia
                    </p>
                    <p class="text-xs md:text-sm text-gray-300 mb-2 md:mb-0">
                        Utilizamos cookies esenciales y analíticas para el funcionamiento del sitio y entender cómo lo usas. 
                        <button type="button" id="mas-info-cookies" class="underline hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Más información</button>
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-2">
                    <button type="button" id="rechazar-cookies-politica" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors order-2 sm:order-1 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Rechazar
                    </button>
                    <button type="button" id="aceptar-cookies-politica" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors order-1 sm:order-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Aceptar cookies
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(cookieBanner);
    
    // Mostrar el banner con animación
    setTimeout(() => {
        cookieBanner.style.transform = 'translateY(0)';
        cookieBanner.style.transition = 'transform 0.3s ease-out';
    }, 1000);
    
    // Configurar eventos para los botones del banner
    document.getElementById('aceptar-cookies-politica').addEventListener('click', function() {
        localStorage.setItem('cookiesAceptadasProdismo', 'true');
        localStorage.setItem('fechaAceptacionCookiesProdismo', new Date().toISOString());
        ocultarBannerCookies();
        
        // Mostrar confirmación
        Swal.fire({
            title: 'Cookies aceptadas',
            text: 'Has aceptado el uso de cookies en nuestro sitio.',
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3b82f6',
            timer: 2000
        });
    });
    
    document.getElementById('rechazar-cookies-politica').addEventListener('click', function() {
        localStorage.setItem('cookiesAceptadasProdismo', 'false');
        ocultarBannerCookies();
    });
    
    document.getElementById('mas-info-cookies').addEventListener('click', function() {
        Swal.fire({
            title: 'Política de Cookies',
            html: `
                <div class="text-left text-sm">
                    <p class="mb-3"><strong>Cookies Esenciales</strong></p>
                    <p class="mb-3">Necesarias para el funcionamiento básico del sitio web.</p>
                    
                    <p class="mb-3"><strong>Cookies Analíticas</strong></p>
                    <p class="mb-3">Nos ayudan a entender cómo los visitantes interactúan con el sitio.</p>
                    
                    <p class="mb-3"><strong>Cookies de Funcionalidad</strong></p>
                    <p class="mb-3">Permiten recordar tus preferencias y configuraciones.</p>
                    
                    <p class="text-xs text-gray-600 mt-4">
                        Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración de tu navegador.
                    </p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3b82f6',
            width: '500px'
        });
    });
}
    
// Función para ocultar el banner de cookies
function ocultarBannerCookies() {
    const banner = document.getElementById('banner-cookies-politica');
    if (banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 300);
    }
}


// Código temporal para debugging - eliminar después de verificar
// setTimeout(() => {
//     console.log('Botón de imprimir:', document.getElementById('boton-imprimir-politica'));
//     console.log('Banner de cookies:', document.getElementById('banner-cookies-politica'));
    
//     // Verificar estilos computados
//     const boton = document.getElementById('boton-imprimir-politica');
//     const banner = document.getElementById('banner-cookies-politica');
    
//     if (boton) {
//         const estilos = window.getComputedStyle(boton);
//         console.log('Posición botón:', estilos.position, 'Bottom:', estilos.bottom, 'Right:', estilos.right);
//     }
    
//     if (banner) {
//         const estilos = window.getComputedStyle(banner);
//         console.log('Posición banner:', estilos.position, 'Bottom:', estilos.bottom, 'Transform:', estilos.transform);
//     }
// }, 2000);