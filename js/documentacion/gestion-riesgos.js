// risk-management-functions.js

// Función para inicializar todos los componentes
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeSearch();
    initializeTableOfContents();
    initializeSmoothScroll();
    initializeBackToTop();
    initializeQuickActions();
    initializePDFDownload();
    initializeContactLinks();
    initializeRiskCalculator();
});

// Función para el toggle de tema claro/oscuro
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Aplicar tema guardado
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Manejar el toggle del tema
    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

// Función para la búsqueda en el contenido
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    function performSearch(query) {
        if (!query.trim()) return;
        
        // Buscar en todo el contenido
        const content = document.querySelector('main').textContent;
        const regex = new RegExp(query, 'gi');
        const matches = content.match(regex);
        
        if (matches) {
            // Resaltar resultados (implementación básica)
            highlightSearchResults(query);
            
            // Mostrar número de resultados
            Swal.fire({
                title: 'Resultados de búsqueda',
                text: `Se encontraron ${matches.length} coincidencias para "${query}"`,
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
    
    function highlightSearchResults(query) {
        // Remover resaltados anteriores
        const existingHighlights = document.querySelectorAll('.search-highlight');
        existingHighlights.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
        
        // Resaltar nuevas coincidencias
        const walker = document.createTreeWalker(
            document.querySelector('main'),
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
                const span = document.createElement('span');
                span.className = 'search-highlight bg-yellow-200 dark:bg-yellow-800';
                span.textContent = node.textContent;
                node.parentNode.replaceChild(span, node);
            }
        }
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

// Función para scroll suave en los enlaces del índice
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
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

// Función para el botón "Volver arriba"
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
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

// Función para la descarga de PDF (simulada)
function initializePDFDownload() {
    const pdfDownloadBtn = document.getElementById('pdf-download');
    
    if (pdfDownloadBtn) {
        pdfDownloadBtn.addEventListener('click', function() {
            Swal.fire({
                title: 'Descargar PDF',
                text: 'La descarga del documento en formato PDF comenzará en breve.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Descargar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Simular descarga (en un caso real, aquí iría la URL del PDF)
                    Swal.fire({
                        title: 'Descarga simulada',
                        text: 'En un entorno real, el PDF se descargaría ahora.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        });
    }
}

// Función para inicializar enlaces de contacto (email y WhatsApp)
function initializeContactLinks() {
    // Los enlaces ya están en el HTML, esta función podría usarse para agregar funcionalidad adicional
    console.log('Enlaces de contacto inicializados');
    
    // Podemos agregar tracking de clics aquí si es necesario
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Tracking de analytics para clics en email
            console.log('Email clickeado:', this.href);
        });
    });
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Tracking de analytics para clics en WhatsApp
            console.log('WhatsApp clickeado:', this.href);
        });
    });
}

// Función para calcular nivel de riesgo
function initializeRiskCalculator() {
    // Ejemplo de función para calcular nivel de riesgo basado en probabilidad e impacto
    window.calculateRiskLevel = function(probability, impact) {
        const riskScore = probability * impact;
        let riskLevel, riskColor;
        
        if (riskScore <= 6) {
            riskLevel = 'Bajo';
            riskColor = 'green';
        } else if (riskScore <= 12) {
            riskLevel = 'Medio';
            riskColor = 'yellow';
        } else if (riskScore <= 18) {
            riskLevel = 'Alto';
            riskColor = 'orange';
        } else {
            riskLevel = 'Crítico';
            riskColor = 'red';
        }
        
        return {
            score: riskScore,
            level: riskLevel,
            color: riskColor
        };
    };
}

// Función para generar reporte de riesgos
function generateRiskReport(risks) {
    // Esta función podría generar un reporte de riesgos en formato estructurado
    const report = {
        fecha: new Date().toISOString().split('T')[0],
        riesgos: risks,
        total: risks.length,
        criticos: risks.filter(r => r.nivel === 'Crítico').length,
        altos: risks.filter(r => r.nivel === 'Alto').length
    };
    
    return report;
}