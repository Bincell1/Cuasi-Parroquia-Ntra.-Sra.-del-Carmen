document.addEventListener('DOMContentLoaded', () => {

    // --- Database Initialization (consistent with main.js) ---
    const db = {
        events: JSON.parse(localStorage.getItem('events')) || [],
        news: JSON.parse(localStorage.getItem('news')) || [],
        gallery: JSON.parse(localStorage.getItem('gallery')) || [],

        save() {
            localStorage.setItem('events', JSON.stringify(this.events));
            localStorage.setItem('news', JSON.stringify(this.news));
            localStorage.setItem('gallery', JSON.stringify(this.gallery));
            // Dispara un evento de storage para que la página principal se actualice si está abierta.
            window.dispatchEvent(new Event('storage'));
        }
    };

    // --- Get DOM Elements ---
    const formAddEvent = document.getElementById('form-add-event');
    const eventsList = document.getElementById('events-list');
    const formAddNews = document.getElementById('form-add-news');
    const newsList = document.getElementById('news-list');
    const formAddGallery = document.getElementById('form-add-gallery');
    const galleryList = document.getElementById('gallery-list');

    // --- Render Functions ---
    const renderAdminEvents = () => {
        if (!eventsList) return;
        eventsList.innerHTML = db.events.map((event, index) => `
            <tr>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>${event.name}</td>
                <td><button class="btn btn-danger btn-sm" data-index="${index}" data-type="events">Eliminar</button></td>
            </tr>
        `).join('');
    };

    const renderAdminNews = () => {
        if (!newsList) return;
        newsList.innerHTML = db.news.map((item, index) => `
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    <img src="${item.img}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.text}</p>
                        <button class="btn btn-danger btn-sm mt-2" data-index="${index}" data-type="news">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderAdminGallery = () => {
        if (!galleryList) return;
        galleryList.innerHTML = db.gallery.map((item, index) => `
            <div class="col-md-4 col-sm-6">
                <div class="card">
                    <img src="${item.thumb}" class="img-fluid" alt="Imagen de galería">
                    <div class="card-body">
                         <button class="btn btn-danger btn-sm" data-index="${index}" data-type="gallery">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // --- Event Handlers ---
    formAddEvent?.addEventListener('submit', e => {
        e.preventDefault();
        const newEvent = {
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            name: document.getElementById('event-name').value
        };
        db.events.push(newEvent);
        db.save();
        renderAdminEvents();
        e.target.reset();
    });

    formAddNews?.addEventListener('submit', e => {
        e.preventDefault();
        const newNews = {
            title: document.getElementById('news-title').value,
            text: document.getElementById('news-text').value,
            img: document.getElementById('news-img').value
        };
        db.news.unshift(newNews); // Add to the beginning
        db.save();
        renderAdminNews();
        e.target.reset();
    });

    formAddGallery?.addEventListener('submit', e => {
        e.preventDefault();
        const newImage = {
            thumb: document.getElementById('gallery-img').value,
            full: document.getElementById('gallery-img').value
        };
        db.gallery.unshift(newImage); // Add to the beginning
        db.save();
        renderAdminGallery();
        e.target.reset();
    });

    // --- Delete Handler (using event delegation) ---
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('btn-danger')) {
            const type = e.target.dataset.type;
            const index = parseInt(e.target.dataset.index, 10);
            
            if (confirm(`¿Estás seguro de que quieres eliminar este elemento?`)) {
                if (type && db[type]) {
                    db[type].splice(index, 1);
                    db.save();
                    // Re-render the specific section
                    if (type === 'events') renderAdminEvents();
                    if (type === 'news') renderAdminNews();
                    if (type === 'gallery') renderAdminGallery();
                }
            }
        }
    });

    // --- Initial Render ---
    renderAdminEvents();
    renderAdminNews();
    renderAdminGallery();
});
