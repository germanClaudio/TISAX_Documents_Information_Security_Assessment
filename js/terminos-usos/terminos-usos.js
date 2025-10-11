// Establecer fecha de actualización
document.getElementById('fecha-actualizacion').textContent = new Date().toLocaleDateString('es-AR');
        
// Configuración del botón de contacto (similar a política-privacidad.html)
document.getElementById('contacto-btn').addEventListener('click', function() {
    Swal.fire({
        title: 'Contacto Prodismo',
        html: `
            <div class="text-left">
                <p class="mb-2"><i class="fas fa-envelope mr-2 text-blue-600"></i> <strong>Email:</strong> info@prodismo.com</p>
                <p class="mb-2"><i class="fas fa-phone mr-2 text-blue-600"></i> <strong>Teléfono:</strong> +54 351 123-4567</p>
                <p class="mb-2"><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> <strong>Dirección:</strong> Av. Japón 2230 – Córdoba Capital</p>
                <p><i class="fas fa-globe mr-2 text-blue-600"></i> <strong>Web:</strong> www.prodismo.com</p>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#2563eb'
    });
});