// scripts.js - Funcionalidades para la Política de Seguridad de Prodismo

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeSearch();
    initializeTableOfContents();
    initializeQuickActions();
    initializePDFDownload();
    initializeKeyboardShortcuts();
    
    // Add global navigation functions to window object
    window.scrollToSection = scrollToSection;
    // window.scrollToTop = scrollToTop;
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    if(themeIcon) themeIcon.classList.toggle('fa-sun', savedTheme === 'dark');
    if(themeIcon) themeIcon.classList.toggle('fa-moon', savedTheme === 'light');
    
    // Toggle theme
    if(themeToggle) themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.classList.toggle('fa-sun', isDark);
        themeIcon.classList.toggle('fa-moon', !isDark);
    });
}

// Search Functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('#search-input, #mobile-search-input');
    let currentHighlight = null;
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim().toLowerCase();
            
            // Clear previous highlights
            if (currentHighlight) {
                currentHighlight.forEach(element => {
                    element.innerHTML = element.textContent;
                });
            }
            
            if (searchTerm.length < 2) {
                currentHighlight = null;
                return;
            }
            
            // Search in main content
            const content = document.querySelector('main');
            const walker = document.createTreeWalker(
                content,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const highlights = [];
            let node;
            
            while (node = walker.nextNode()) {
                if (node.textContent.toLowerCase().includes(searchTerm)) {
                    const parent = node.parentNode;
                    if (parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
                        const regex = new RegExp(`(${searchTerm})`, 'gi');
                        parent.innerHTML = parent.innerHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
                        highlights.push(parent);
                    }
                }
            }
            
            currentHighlight = highlights;
            
            // Sync search inputs
            searchInputs.forEach(otherInput => {
                if (otherInput !== e.target) {
                    otherInput.value = e.target.value;
                }
            });
        });
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
function initializeQuickActions() {
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

// PDF Generation
function initializePDFDownload() {
    const pdfButton = document.getElementById('pdf-download');
    
    pdfButton.addEventListener('click', async () => {
        try {
            // Show loading state
            pdfButton.classList.add('pdf-loading');
            pdfButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Generando PDF...</span>';
            
            // Use SweetAlert for confirmation
            const result = await Swal.fire({
                title: 'Descargar PDF',
                text: '¿Desea descargar esta política en formato PDF?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Descargar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3b82f6',
            });
            
            if (result.isConfirmed) {
                // In a real implementation, this would generate an actual PDF
                // For now, we'll simulate the download
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = './outputs_files/Política_Seguridad_Prodismo_SRL-Rev00.pdf'; // Replace with actual PDF generation endpoint
                    link.download = 'Política_Seguridad_Prodismo_SRL-Rev00.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    Swal.fire({
                        title: '¡PDF Listo!',
                        text: 'El PDF se ha generado correctamente.',
                        icon: 'success',
                        confirmButtonColor: '#3b82f6',
                    });
                }, 2000);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo generar el PDF. Por favor, intente nuevamente.',
                icon: 'error',
                confirmButtonColor: '#3b82f6',
            });
        } finally {
            // Restore button state
            pdfButton.classList.remove('pdf-loading');
            pdfButton.innerHTML = '<i class="fas fa-download"></i><span>Descargar PDF</span>';
        }
    });
}

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + F for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.querySelector('#search-input, #mobile-search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInputs = document.querySelectorAll('#search-input, #mobile-search-input');
            searchInputs.forEach(input => {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            });
        }
    });
}

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        initializeSearch,
        initializeTableOfContents,
        initializePDFDownload,
        scrollToSection,
        scrollToTop
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const contactoBtn = document.getElementById('contacto-btn');
    
    if (contactoBtn) {
        contactoBtn.addEventListener('click', function() {
            Swal.fire({
                title: 'Contactos IT y Seguridad',
                html: `
                <div class="bg-gray-900 text-gray-200 min-h-screen py-4 px-4">
                    <div class="max-w-4xl mx-auto">
                        <div class="text-center mb-4">
                            <p class="text-gray-400">Estamos aquí para ayudarte a resolver cualquier duda</p>
                        </div>

                        <div class="grid grid-cols-1 gap-6">
                            <!-- Tarjeta de Correo IT -->
                            <div class="md:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                                <div class="p-5">
                                    <div class="flex items-center mb-4">
                                        <div class="bg-blue-600 p-3 rounded-lg">
                                            <i class="fas fa-envelope text-white text-xl"></i>
                                        </div>
                                        <h3 class="ml-4 text-xl font-semibold text-white">Correo Prodismo IT</h3>
                                    </div>
                                    <p class="text-gray-400 mb-4">Para consultas generales de IT</p>
                                    <a href="mailto:itprodismo@prodismo.com" class="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors duration-300 font-medium">
                                        <i class="fa-solid fa-at text-white"></i> itprodismo@prodismo.com
                                    </a>
                                </div>
                            </div>

                            <!-- Tarjeta de Seguridad IT -->
                            <div class="md:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300">
                                <div class="p-5">
                                    <div class="flex items-center mb-4">
                                        <div class="bg-green-600 p-3 rounded-lg">
                                            <i class="fas fa-shield-alt text-white text-xl"></i>
                                        </div>
                                        <h3 class="ml-4 text-xl font-semibold text-white">Seguridad IT - Emiliano Ferrari</h3>
                                    </div>
                                    <p class="text-gray-400 mb-4">Para consultas específicas de seguridad</p>
                                    <div class="space-y-3">
                                        <a href="mailto:eferrari@prodismo.com" class="block w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-center transition-colors duration-300">
                                            <i class="fa-solid fa-at text-white"></i> eferrari@prodismo.com
                                        </a>
                                        <a href="https://wa.me/5493515217958" target="_blank" class="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center transition-colors duration-300">
                                            <i class="fab fa-whatsapp text-white"></i> +54 9 351 521-7958
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Tarjeta de IT Manager -->
                            <div class="md:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300">
                                <div class="p-5">
                                    <div class="flex items-center mb-4">
                                        <div class="bg-purple-600 p-3 rounded-lg">
                                            <i class="fas fa-user-tie text-white text-xl"></i>
                                        </div>
                                        <h3 class="ml-4 text-xl font-semibold text-white">IT Manager - Germán Montalbetti</h3>
                                    </div>
                                    <p class="text-gray-400 mb-4">Responsable de Tecnología</p>
                                    <div class="space-y-3">
                                        <a href="mailto:gmontalbetti@prodismo.com" class="block w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-center transition-colors duration-300">
                                            <i class="fa-solid fa-at text-white"></i> gmontalbetti@prodismo.com
                                        </a>
                                        <a href="https://wa.me/5493541669837" target="_blank" class="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center transition-colors duration-300">
                                            <i class="fab fa-whatsapp text-white"></i> +54 9 3541 66-9837
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Tarjeta de Help Desk -->
                            <div class="md:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-300">
                                <div class="p-5">
                                    <div class="flex items-center mb-4">
                                        <div class="bg-orange-600 p-3 rounded-lg">
                                            <i class="fas fa-headset text-white text-xl"></i>
                                        </div>
                                        <h3 class="ml-4 text-xl font-semibold text-white">Help Desk (STI)</h3>
                                    </div>
                                    <p class="text-gray-400 mb-4">Sistema de tickets para soporte técnico</p>
                                    <a href="https://apps.powerapps.com/play/e/default-48f8f875-b75a-4037-a9d8-15d6bbd7c5f9/a/fce0c9bd-9de6-4890-b9ad-5d4f8e05b93f?tenantId=48f8f875-b75a-4037-a9d8-15d6bbd7c5f9&source=teamsopenwebsite&hint=0bdd9fd3-167c-40ea-ac48-d4e5868adbad&sourcetime=1716909981370#" class="block transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <img src="../../images/HelpDesk_logo3.png" alt="Help Desk STI" class="mx-auto" style="max-height: 80px;">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 text-center text-gray-400 text-sm">
                            <p>Estamos aquí para ayudarte a resolver cualquier duda</p>
                        </div>
                    </div>
                </div>
                `,
                imageUrl: "../../images/ITProdimo_logo_blanco_f_azuloscuro.png",
                showCloseButton: true,
                showConfirmButton: false,
                // confirmButtonText: 'Entendido',
                // confirmButtonColor: '#08089d',
                allowOutsideClick: true,
                background: '#141729', //'#1f2937', // Fondo oscuro
                color: '#f9fafb', // Texto claro
                customClass: {
                    popup: 'rounded-lg shadow-2xl bg-gray-700', // Fondo oscuro para el popup
                    title: 'text-2xl font-bold text-white', // Título en blanco
                    htmlContainer: 'text-base text-gray-200', // Texto del contenido en gris claro
                    closeButton: 'text-gray-400 hover:text-white', // Botón cerrar
                    confirmButton: 'bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition-colors' // Botón confirmar
                },
                width: '600px',
            });
        });
    }
});