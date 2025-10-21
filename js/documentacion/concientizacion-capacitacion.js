// uso-recursos-it.js - Funciones específicas para la página de Política de Uso de Recursos IT

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeTheme();
    initSearchFunctionality();
    initializeTableOfContents();
    initQuickActions();
    initBackToTop();
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
        
        // Buscar en todo el contenido del documento
        const content = document.body.innerText.toLowerCase();
        const searchTerm = query.toLowerCase();
        
        if (content.includes(searchTerm)) {
            // Resaltar resultados (implementación básica)
            highlightText(searchTerm);
            
            // Mostrar notificación de éxito
            Swal.fire({
                icon: 'success',
                title: 'Búsqueda completada',
                text: `Se encontraron coincidencias para "${query}"`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Sin resultados',
                text: `No se encontraron coincidencias para "${query}"`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    }
    
    function highlightText(text) {
        // Remover resaltados anteriores
        removeHighlights();
        
        // Buscar y resaltar texto (implementación básica)
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        const nodes = [];
        
        while (node = walker.nextNode()) {
            if (node.nodeValue.toLowerCase().includes(text)) {
                nodes.push(node);
            }
        }
        
        nodes.forEach(node => {
            const span = document.createElement('span');
            span.className = 'bg-yellow-300 dark:bg-yellow-600 px-1 rounded';
            span.textContent = node.nodeValue;
            node.parentNode.replaceChild(span, node);
        });
    }
    
    function removeHighlights() {
        const highlights = document.querySelectorAll('span.bg-yellow-300, span.bg-yellow-600');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
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

// Función para las acciones rápidas
function initQuickActions() {
    const reportIncidentBtn = document.getElementById('report-incident');
    const contactSupportBtn = document.getElementById('contact-support');
    
    if (reportIncidentBtn) {
        reportIncidentBtn.addEventListener('click', function() {
            // Abrir cliente de correo para reportar incidente
            const subject = 'Reporte de Incidente de Seguridad';
            const body = `Hola equipo de seguridad,\n\nMe pongo en contacto para reportar el siguiente incidente:\n\n- Tipo de incidente:\n- Fecha y hora:\n- Descripción:\n- Impacto estimado:\n\nSaludos cordiales.`;
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
                                        <div class="font-medium text-gray-400 dark:text-gray-200">Correo electrónico</div>
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

// Navegación suave
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Descarga de PDF (simulada)
function initPDFDownload() {
    document.getElementById('pdf-download').addEventListener('click', function() {
        Swal.fire({
            title: 'Descargar PDF',
            text: '¿Está seguro de que desea descargar este documento en formato PDF?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, descargar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simular descarga
                Swal.fire({
                    title: 'Descargando...',
                    text: 'El documento se está preparando para descargar',
                    icon: 'info',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true
                }).then(() => {
                    Swal.fire({
                        title: '¡Descarga completada!',
                        text: 'El documento ha sido descargado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                });
            }
        });
    });
}