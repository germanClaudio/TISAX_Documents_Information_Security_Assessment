// Función para abrir modal con imagen del diagrama de flujo
function openFlowchartModal() {
    // Crear elementos del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'flowchart-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        position: relative;
        background: white;
        border-radius: 8px;
        padding: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 28px;
        color: #666;
        cursor: pointer;
        z-index: 10;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;

    const flowchartImage = document.createElement('img');
    flowchartImage.src = '../../../images/flow-diagrams/notificacion-reporte-registro-flowchart.png';
    flowchartImage.alt = 'Flujo de Notificación y Registro de Eventos de Seguridad - Vista ampliada';
    flowchartImage.style.cssText = `
        max-width: 100%;
        height: auto;
        cursor: zoom-in;
        transition: transform 0.3s ease;
        display: block;
    `;

    const imageCaption = document.createElement('p');
    imageCaption.textContent = 'Diagrama de Flujo de Notificación y Registro de Eventos de Seguridad';
    imageCaption.style.cssText = `
        text-align: center;
        margin-top: 15px;
        color: #666;
        font-size: 14px;
    `;

    // Variables para controlar el zoom
    let isZoomed = false;
    const zoomLevels = [1, 1.5, 2, 2.5];
    let currentZoomIndex = 0;

    // Función para aplicar zoom
    function applyZoom() {
        currentZoomIndex = (currentZoomIndex + 1) % zoomLevels.length;
        const zoomLevel = zoomLevels[currentZoomIndex];
        flowchartImage.style.transform = `scale(${zoomLevel})`;
        flowchartImage.style.cursor = zoomLevel > 1 ? 'zoom-out' : 'zoom-in';

        isZoomed = zoomLevel > 1;
    }

    // Función para resetear zoom
    function resetZoom() {
        currentZoomIndex = 0;
        flowchartImage.style.transform = 'scale(1)';
        flowchartImage.style.cursor = 'zoom-in';

        isZoomed = false;
    }

    // Event listeners
    flowchartImage.addEventListener('click', applyZoom);
    
    closeButton.addEventListener('click', function() {
        document.body.style.overflow = 'auto';
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            if (modalOverlay.parentNode) {
                modalOverlay.parentNode.removeChild(modalOverlay);
            }
        }, 300);
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeButton.click();
        }
    });

    // Tecla Escape para cerrar
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeButton.click();
            document.removeEventListener('keydown', handleEscape);
        }
    });

    // Ensamblar el modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(flowchartImage);
    modalContent.appendChild(imageCaption);
    modalOverlay.appendChild(modalContent);
    
    // Agregar al DOM
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';

    // Animación de entrada
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

// Función para abrir modal con imagen del diagrama de flujo
function openFlowchartModalCompleto() {
    // Crear elementos del modal
    const modalOverlayCompleto = document.createElement('div');
    modalOverlayCompleto.id = 'flowchart-modal-overlay';
    modalOverlayCompleto.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContentCompleto = document.createElement('div');
    modalContentCompleto.style.cssText = `
        position: relative;
        background: white;
        border-radius: 8px;
        padding: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    const closeButtonCompleto = document.createElement('button');
    closeButtonCompleto.innerHTML = '&times;';
    closeButtonCompleto.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 28px;
        color: #666;
        cursor: pointer;
        z-index: 10;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;

    const flowchartImageCompleto = document.createElement('img');
    flowchartImageCompleto.src = '../../../images/flow-diagrams/eventos-seguridad-diagrama-completo.png';
    flowchartImageCompleto.alt = 'Flujo de Eventos de Seguridad Completo - Vista ampliada';
    flowchartImageCompleto.style.cssText = `
        max-width: 100%;
        height: auto;
        cursor: zoom-in;
        transition: transform 0.3s ease;
        display: block;
    `;

    const imageCaptionCompleto = document.createElement('p');
    imageCaptionCompleto.textContent = 'Diagrama de Flujo de Eventos de Seguridad Completo';
    imageCaptionCompleto.style.cssText = `
        text-align: center;
        margin-top: 15px;
        color: #666;
        font-size: 14px;
    `;

    // Variables para controlar el zoom
    let isZoomed = false;
    const zoomLevels = [1, 1.5, 2, 2.5];
    let currentZoomIndex = 0;

    // Función para aplicar zoom
    function applyZoom() {
        currentZoomIndex = (currentZoomIndex + 1) % zoomLevels.length;
        const zoomLevel = zoomLevels[currentZoomIndex];
        flowchartImage.style.transform = `scale(${zoomLevel})`;
        flowchartImage.style.cursor = zoomLevel > 1 ? 'zoom-out' : 'zoom-in';

        flowchartImageCompleto.style.transform = `scale(${zoomLevel})`;
        flowchartImageCompleto.style.cursor = zoomLevel > 1 ? 'zoom-out' : 'zoom-in';

        isZoomed = zoomLevel > 1;
    }

    // Función para resetear zoom
    function resetZoom() {
        currentZoomIndex = 0;

        flowchartImageCompleto.style.transform = 'scale(1)';
        flowchartImageCompleto.style.cursor = 'zoom-in';

        isZoomed = false;
    }

    // Event listeners
    flowchartImageCompleto.addEventListener('click', applyZoom);
    
    closeButtonCompleto.addEventListener('click', function() {
        document.body.style.overflow = 'auto';
        modalOverlayCompleto.style.opacity = '0';
        setTimeout(() => {
            if (modalOverlayCompleto.parentNode) {
                modalOverlayCompleto.parentNode.removeChild(modalOverlayCompleto);
            }
        }, 300);
    });

    modalOverlayCompleto.addEventListener('click', function(e) {
        if (e.target === modalOverlayCompleto) {
            closeButtonCompleto.click();
        }
    });

    // Tecla Escape para cerrar
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeButtonCompleto.click();
            document.removeEventListener('keydown', handleEscape);
        }
    });

    // Ensamblar el modal
    modalContentCompleto.appendChild(closeButtonCompleto);
    modalContentCompleto.appendChild(flowchartImageCompleto);
    modalContentCompleto.appendChild(imageCaptionCompleto);
    modalOverlayCompleto.appendChild(modalContentCompleto);
    
    // Agregar al DOM
    document.body.appendChild(modalOverlayCompleto);
    document.body.style.overflow = 'hidden';

    // Animación de entrada
    setTimeout(() => {
        modalOverlayCompleto.style.opacity = '1';
        modalContentCompleto.style.transform = 'scale(1)';
    }, 10);
}

// Función para inicializar el modal en la página
function initFlowchartModal() {
    // Buscar la imagen existente en el documento
    const existingImage = document.querySelector('img[src*="notificacion-reporte-registro-flowchart.png"]');

    if (existingImage) {
        // Agregar funcionalidad de clic a la imagen existente
        existingImage.style.cursor = 'pointer';
        existingImage.title = 'Haz clic para ver en tamaño completo';
        existingImage.addEventListener('click', openFlowchartModal);

        // También agregar un botón debajo de la imagen si se desea
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'text-align: center; margin-top: 10px;';
        
        const openModalButton = document.createElement('button');
        openModalButton.textContent = 'Ver diagrama en tamaño completo';
        openModalButton.style.cssText = `
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s ease;
        `;
        
        openModalButton.addEventListener('mouseenter', function() {
            this.style.background = '#2563eb';
        });
        
        openModalButton.addEventListener('mouseleave', function() {
            this.style.background = '#3b82f6';
        });
        
        openModalButton.addEventListener('click', openFlowchartModal);
        
        buttonContainer.appendChild(openModalButton);
        
        // Insertar el botón después de la imagen
        existingImage.parentNode.insertBefore(buttonContainer, existingImage.nextSibling);
    }
}

// Función para inicializar el modal en la página
function initFlowchartModalCompleto() {
    // Buscar la imagen existente en el documento
    const existingImageCompleto = document.querySelector('img[src*="eventos-seguridad-diagrama-completo.png"]');

    if (existingImageCompleto) {
        // Agregar funcionalidad de clic a la imagen existente
        existingImageCompleto.style.cursor = 'pointer';
        existingImageCompleto.title = 'Haz clic para ver en tamaño completo';
        existingImageCompleto.addEventListener('click', openFlowchartModalCompleto);
        
        // También agregar un botón debajo de la imagen si se desea
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'text-align: center; margin-top: 10px;';
        
        const openModalButton = document.createElement('button');
        openModalButton.textContent = 'Ver diagrama en tamaño completo';
        openModalButton.style.cssText = `
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s ease;
        `;
        
        openModalButton.addEventListener('mouseenter', function() {
            this.style.background = '#2563eb';
        });
        
        openModalButton.addEventListener('mouseleave', function() {
            this.style.background = '#3b82f6';
        });
        
        openModalButton.addEventListener('click', openFlowchartModalCompleto);
        
        buttonContainer.appendChild(openModalButton);
        
        // Insertar el botón después de la imagen
        existingImageCompleto.parentNode.insertBefore(buttonContainer, existingImageCompleto.nextSibling);

    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlowchartModal);
    document.addEventListener('DOMContentLoaded', initFlowchartModalCompleto);
} else {
    initFlowchartModal();
    initFlowchartModalCompleto();
}