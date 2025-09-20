document.addEventListener('DOMContentLoaded', () => {
    const lecturasContainer = document.getElementById('lecturas-container');

    if (lecturasContainer) {
        // Limpiar el contenedor y eliminar el título H2 si existe.
        const h2 = document.querySelector('#inicio h2');
        if(h2) h2.remove();
        lecturasContainer.innerHTML = '';

        // Añadir un título para la sección
        const title = document.createElement('h2');
        title.className = 'text-center mb-4';
        title.textContent = 'Lecturas del Día';
        lecturasContainer.appendChild(title);

        // Contenedor para la cita inspiradora y el botón
        const contentDiv = document.createElement('div');
        contentDiv.className = 'row justify-content-center';
        contentDiv.innerHTML = `
            <div class="col-lg-8">
                <div class="inspirational-quote text-center mb-5">
                    <i class="bi bi-book h1 text-muted"></i>
                    <p class="lead fst-italic mt-3">"Tu palabra es una lámpara a mis pies; es una luz en mi sendero."</p>
                    <p class="text-muted">- Salmo 119, 105</p>
                </div>
                <p class="text-center mb-4">Para leer las lecturas del día, por favor visita el sitio web de Vatican News:</p>
                <div class="text-center">
                    <a href="https://www.vaticannews.va/es/evangelio-de-hoy.html" class="btn btn-primary btn-lg">
                        Ir a Vatican News <i class="bi bi-box-arrow-up-right"></i>
                    </a>
                </div>
            </div>
        `;
        lecturasContainer.appendChild(contentDiv);
    }
});
