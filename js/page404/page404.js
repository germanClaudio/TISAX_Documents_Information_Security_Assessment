document.getElementById('theme-toggle').addEventListener('click', function() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
    
    // Update logo based on theme
    updateLogos();
});

// Update logos based on theme
function updateLogos() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('[data-theme-logo]').forEach(logo => {
        const lightSrc = logo.getAttribute('data-light-src');
        const darkSrc = logo.getAttribute('data-dark-src');
        logo.src = isDark ? darkSrc : lightSrc;
    });
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    updateLogos();
}

// Contact Support Button
document.getElementById('contact-support').addEventListener('click', function() {
    Swal.fire({
        title: 'Contactar Soporte',
        html: `
            <p class="text-left mb-4">Puedes contactarnos a través de:</p>
            <div class="text-left space-y-2">
                <p><i class="fas fa-envelope text-primary-600 mr-2"></i> <strong>Email:</strong> soporte@prodismo.com</p>
                <p><i class="fas fa-phone text-primary-600 mr-2"></i> <strong>Teléfono:</strong> +54 11 1234-5678</p>
                <p><i class="fas fa-clock text-primary-600 mr-2"></i> <strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3b82f6'
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initTheme);