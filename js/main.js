document.addEventListener('DOMContentLoaded', () => {

    // --- Sample Data (if localStorage is empty) ---
    const sampleEvents = [
        { date: '2025-10-12', time: '12:00', name: 'Misa Solemne - Ntra. Sra. del Carmen' },
        { date: '2025-10-18', time: '15:00', name: 'Kermés Parroquial' },
        { date: '2025-11-01', time: '12:00', name: 'Misa de Todos los Santos' },
        { date: '2025-12-24', time: '20:00', name: 'Misa de Gallo' },
    ];

    const sampleNews = [
        {
            img: 'images/placeholder.svg',
            title: 'Inicio de las Catequesis 2025',
            text: 'Las inscripciones para la catequesis de primera comunión y confirmación ya están abiertas. Acércate a la oficina parroquial para más información.'
        },
        {
            img: 'images/placeholder.svg',
            title: 'Campaña del Kilo',
            text: 'Invitamos a toda la comunidad a participar en nuestra campaña anual de recolección de alimentos no perecederos para las familias más necesitadas.'
        },
        {
            img: 'images/placeholder.svg',
            title: 'Horarios de Misa Actualizados',
            text: 'A partir de este mes, los horarios de misa dominical serán a las 9:00 AM, 12:00 PM y 7:00 PM. Consulta los horarios de semana en la cartelera.'
        }
    ];

    const sampleGallery = [
        { thumb: 'images/gallery-placeholder.svg', full: 'images/gallery-placeholder.svg' },
        { thumb: 'images/gallery-placeholder.svg', full: 'images/gallery-placeholder.svg' },
        { thumb: 'images/gallery-placeholder.svg', full: 'images/gallery-placeholder.svg' },
        { thumb: 'images/gallery-placeholder.svg', full: 'images/gallery-placeholder.svg' },
        { thumb: 'images/gallery-placeholder.svg', full: 'images/gallery-placeholder.svg' },
        { thumb: 'images/gallery-placeholder.svg', full: 'images/gallery-placeholder.svg' },
    ];

    // --- Database Initialization ---
    const db = {
        events: JSON.parse(localStorage.getItem('events')) || sampleEvents,
        news: JSON.parse(localStorage.getItem('news')) || sampleNews,
        gallery: JSON.parse(localStorage.getItem('gallery')) || sampleGallery,

        save() {
            localStorage.setItem('events', JSON.stringify(this.events));
            localStorage.setItem('news', JSON.stringify(this.news));
            localStorage.setItem('gallery', JSON.stringify(this.gallery));
        }
    };
    db.save(); // Save sample data if localStorage was empty

    // --- Render Functions ---
    const renderEvents = () => {
        const container = document.getElementById('eventos-tbody');
        if (!container) return;
        container.innerHTML = db.events.map(event => `
            <tr>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>${event.name}</td>
            </tr>
        `).join('');
    };

    const renderNews = () => {
        const container = document.getElementById('noticias-container');
        if (!container) return;
        container.innerHTML = db.news.map(item => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="${item.img}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.text}</p>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderGallery = () => {
        const container = document.getElementById('galeria-container');
        if (!container) return;
        container.innerHTML = db.gallery.map((item, index) => `
            <div class="col-md-4 col-sm-6">
                <div class="card">
                    <img src="${item.thumb}" class="img-fluid" alt="Imagen de galería ${index + 1}" data-bs-toggle="modal" data-bs-target="#gallery-modal" data-full-src="${item.full}">
                </div>
            </div>
        `).join('');
    };

    // --- Modal Logic ---
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', event => {
            const trigger = event.relatedTarget;
            const fullSrc = trigger.getAttribute('data-full-src');
            const modalImage = document.getElementById('modal-image');
            modalImage.src = fullSrc;
        });
    }

    // --- Initial Render ---
    renderEvents();
    renderNews();
    renderGallery();

    // --- Listen for storage changes from admin page ---
    window.addEventListener('storage', () => {
        console.log('Storage changed, reloading data...');
        db.events = JSON.parse(localStorage.getItem('events')) || [];
        db.news = JSON.parse(localStorage.getItem('news')) || [];
        db.gallery = JSON.parse(localStorage.getItem('gallery')) || [];
        renderEvents();
        renderNews();
        renderGallery();
    });
});
