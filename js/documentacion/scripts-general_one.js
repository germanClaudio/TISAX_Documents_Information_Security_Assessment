
// Funcionalidades para la páginas scripts-gerneral-uno
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initSearchFunctionality();
    initializeTableOfContents();
    initScrollToTop();
    initBackToTop();
    initializeQuickActions();
    initSmoothScrolling();
    initPDFDownload();
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

// Funcionalidad de búsqueda
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    function performSearch(query) {
        if (!query.trim()) return;
        
        // Buscar en el contenido
        const content = document.querySelector('article').textContent;
        const regex = new RegExp(query, 'gi');
        const matches = content.match(regex);
        
        if (matches) {
            // Resaltar términos encontrados
            highlightSearchTerms(query);
            
            // Mostrar resultados
            Swal.fire({
                title: 'Resultados de búsqueda',
                html: `Se encontraron <strong>${matches.length}</strong> coincidencias para "<strong>${query}</strong>"`,
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Sin resultados',
                text: `No se encontraron coincidencias para "${query}"`,
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    
    function highlightSearchTerms(term) {
        // Quitar resaltados previos
        removeHighlights();
        
        // Resaltar términos en el contenido
        const article = document.querySelector('article');
        const regex = new RegExp(`(${term})`, 'gi');
        article.innerHTML = article.innerHTML.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
    }
    
    function removeHighlights() {
        const marks = document.querySelectorAll('mark');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }
    
    // Event listeners para búsqueda
    [searchInput, mobileSearchInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }
    });
}

// Table of Contents Navigation
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = Array.from(tocLinks).map(link => {
        const href = link.getAttribute('href');
        return document.querySelector(href);
    });
    
    function updateActiveTocLink() {
        const scrollPosition = window.scrollY + 100;
        
        let activeIndex = 0;
        sections.forEach((section, index) => {
            if (section && scrollPosition >= section.offsetTop) {
                activeIndex = index;
            }
        });
        
        tocLinks.forEach(link => link.classList.remove('active'));
        if (tocLinks[activeIndex]) {
            tocLinks[activeIndex].classList.add('active');
        }
    }
    
    window.addEventListener('scroll', updateActiveTocLink);
    updateActiveTocLink();
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

// Función para las acciones rápidas
function initializeQuickActions() {
    const reportIncidentBtn = document.getElementById('report-incident');
    const contactSupportBtn = document.getElementById('contact-support');
    
    if (reportIncidentBtn) {
        reportIncidentBtn.addEventListener('click', function() {
            // Abrir cliente de correo para reportar incidente
            const subject = 'Reporte de Incidente de Seguridad - Gestión de Riesgos';
            const body = `Hola equipo de seguridad,\n\nMe pongo en contacto para reportar el siguiente incidente relacionado con riesgos de seguridad:\n\n- Tipo de incidente:\n- Riesgo(s) identificado(s):\n- Fecha y hora:\n- Descripción:\n- Impacto estimado:\n\nSaludos cordiales.`;
            window.location.href = `mailto:itprodismo@prodismo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }
    
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function() {
            // Mostrar opciones de contacto
            Swal.fire({
                title: 'Contactar Soporte',
                imageUrl: '../../../images/ITProdimo_logo.png',
                imageWidth: 225,
                imageHeight: 60,
                showCancelButton: true,
                html: `
                    <div class="text-left">
                        <p class="mb-4">Seleccione una opción de contacto:</p>
                        <div class="space-y-3">
                            <a href="mailto:itprodismo@prodismo.com" class="block p-3 bg-gray-600 rounded-lg hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors" target="_blank">
                                <div class="flex items-center">
                                    <i class="fas fa-envelope mr-3" style="color: #e9e9ea;"></i>
                                    
                                    <div>
                                        <div class="font-medium text-gray-200 dark:text-gray-700">Correo electrónico</div>
                                        <div class="text-sm text-gray-600 dark:text-gray-400">itprodismo@prodismo.com</div>
                                    </div>
                                </div>
                            </a>
                            <a href="https://wa.me/5493515217958" class="block p-3 bg-gray-600 rounded-lg hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors" target="_blank">
                                <div class="flex items-center">
                                    <i class="fab fa-whatsapp mr-3" style="color:rgb(70, 225, 88);"></i>
                                    <div>
                                        <div class="font-medium text-gray-400 dark:text-gray-200">WhatsApp</div>
                                        <div class="text-sm text-gray-600 dark:text-gray-400">+54 9 351 521-7958</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                `,
                showConfirmButton: false,
                showCloseButton: true,
                // draggable: true,
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

function safeLinkNavigation(url, timeout = 5000) {
    return new Promise((resolve) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        fetch(url, { 
            method: 'HEAD',
            signal: controller.signal 
        })
        .then(response => {
            clearTimeout(timeoutId);
            resolve(response.ok);
        })
        .catch(() => {
            clearTimeout(timeoutId);
            resolve(false);
        });
    });
}

// Uso:
document.addEventListener('click', async function(event) {
    const link = event.target.closest('a');
    
    if (link && link.hostname === window.location.hostname) {
        event.preventDefault();
        
        const isAvailable = await safeLinkNavigation(link.href);
        
        if (isAvailable) {
            window.location.href = link.href;
        } else {
            window.location.href = '/404.html';
        }
    }
});