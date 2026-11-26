'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // CONFIGURACIÓN
    // =====================================

    const currentYear = new Date().getFullYear();

    const FIRST_YEAR = currentYear - 5;
    const LAST_YEAR = currentYear;

    const moviesData = window.MOVIES;
    const seriesData = window.SERIES;

    const newMoviesContainer = document.getElementById('new-movies');
    const recentContainer = document.getElementById('recent-items');

    const newNoResults = document.getElementById('new-no-results');
    const recentNoResults = document.getElementById('recent-no-results');

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtn = document.getElementById('closeModal');

    if (!newMoviesContainer || !recentContainer || !modal || !modalBody) {
        console.error('Faltan elementos HTML necesarios.');
        return;
    }

    if (!Array.isArray(moviesData)) {
        console.error('No se pudo cargar MOVIES. Revisa movies.js.');
        return;
    }

    if (!Array.isArray(seriesData)) {
        console.error('No se pudo cargar SERIES. Revisa serie.js.');
        return;
    }


    // =====================================
    // TÍTULO DINÁMICO
    // =====================================

    document.getElementById('new-title').textContent =
        `Nuevo (${FIRST_YEAR} - ${LAST_YEAR})`;


    // =====================================
    // FUNCIONES AUXILIARES
    // =====================================

    function createElement(tag, className, text = '') {

        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== '') {
            element.textContent = text;
        }

        return element;
    }


    function getImage(item) {
        return item.image || item.post || item.thumb || '';
    }


    function getVideo(item) {
        return item.video || item.movie || item.trailerUrl || item.drive || '';
    }


    function isMarathon(item) {

        return String(item?.estreno || '')
            .trim()
            .toLowerCase() === 'maraton';

    }


    function getTitle(item) {
        return item.title || item.titulo || item.name || 'Sin título';
    }


    function getYear(item) {

        const year = Number(item.year ?? item.año);

        return Number.isFinite(year) ? year : null;

    }


    // =====================================
    // CREAR TARJETAS
    // =====================================

    function createCard(item) {

        const card = createElement('article', 'movie-card');

        card.tabIndex = 0;
        card.setAttribute('role', 'button');

        const image = document.createElement('img');

        image.src = getImage(item);
        image.alt = getTitle(item);
        image.loading = 'lazy';
        image.decoding = 'async';

        image.onerror = () => {
            image.onerror = null;
            image.remove();
        };


        const overlay = createElement('div', 'movie-overlay');

        const title = createElement(
            'h3',
            '',
            item.displayTitle || getTitle(item)
        );

        overlay.appendChild(title);

        card.append(image, overlay);

        return card;
    }


    // =====================================
    // RENDERIZAR CATÁLOGO
    // =====================================

    function renderItems(container, items, noResults) {

        const fragment = document.createDocumentFragment();

        items.forEach(item => {

            const card = createCard(item);

            card.dataset.type = item.type;
            card.dataset.id = item.id;

            fragment.appendChild(card);

        });

        container.replaceChildren(fragment);

        noResults.style.display = items.length ? 'none' : 'block';

    }


    // =====================================
    // SECCIÓN: NUEVO
    // =====================================

    const newMovies = moviesData
        .filter(movie => {

            const year = getYear(movie);

            return year !== null &&
                year >= FIRST_YEAR &&
                year <= LAST_YEAR;

        })
        .map(movie => ({

            ...movie,
            type: 'movie',
            id: String(movie.id ?? movie.title ?? movie.titulo),
            displayTitle: `${getTitle(movie)} (${getYear(movie)})`

        }));


    // =====================================
    // SECCIÓN: RECIÉN AGREGADO
    // =====================================

    const recentItems = [];


    // Películas marcadas como maratón
    moviesData.forEach(movie => {

        if (!isMarathon(movie)) return;

        recentItems.push({

            ...movie,
            type: 'movie',
            id: String(movie.id ?? movie.title ?? movie.titulo),
            displayTitle: getTitle(movie)

        });

    });


    // Series y episodios marcados como maratón
    seriesData.forEach(serie => {

        const serieId = String(serie.id);

        // Serie completa
        if (isMarathon(serie)) {

            recentItems.push({

                ...serie,
                type: 'series',
                id: serieId,
                displayTitle: getTitle(serie)

            });

        }


        // Episodios individuales
        const episodes = Array.isArray(serie.episodes)
            ? serie.episodes
            : [];

        episodes.forEach(episode => {

            if (!isMarathon(episode)) return;

            recentItems.push({

                ...episode,

                type: 'episode',

                id: `${serieId}-${episode.id ?? episode.n}`,

                image: episode.thumb || episode.image || serie.image || serie.post,

                displayTitle:
                    `${serie.title} - Ep. ${episode.n}: ${episode.name || 'Sin título'}`,

                serieTitle: serie.title,

                serieId: serieId

            });

        });

    });


    // =====================================
    // MODAL
    // =====================================

    function openModal() {

        modal.classList.add('active');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

    }


    function closeModal() {

        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');

        modalBody.replaceChildren();

        document.body.style.overflow = '';

    }


    function playVideo(video, title, description = '') {

        if (!video) {
            showInformation(title, description);
            return;
        }

        const fragment = document.createDocumentFragment();

        const videoContainer = createElement('div', 'video-container');

        const iframe = document.createElement('iframe');

        iframe.src = video;
        iframe.title = title;
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';

        videoContainer.appendChild(iframe);

        const information = createElement('div', 'info-container');

        information.appendChild(
            createElement('h2', '', title)
        );

        if (description) {
            information.appendChild(
                createElement('p', '', description)
            );
        }

        fragment.append(videoContainer, information);

        modalBody.replaceChildren(fragment);

        openModal();

    }


    function showInformation(title, description = '', episodes = []) {

        const fragment = document.createDocumentFragment();

        const information = createElement('div', 'info-container');

        information.appendChild(
            createElement('h2', '', title)
        );

        if (description) {
            information.appendChild(
                createElement('p', '', description)
            );
        }

        if (episodes.length > 0) {

            information.appendChild(
                createElement('h3', 'episodes-title', 'Capítulos')
            );

            const list = createElement('ul', 'capitulos');

            episodes.forEach(episode => {

                const item = createElement('li', 'episode-item');

                item.appendChild(
                    createElement(
                        'span',
                        'episode-name',
                        `Ep. ${episode.n}: ${episode.name || 'Sin título'}`
                    )
                );

                const video = getVideo(episode);

                if (video) {

                    const button = createElement(
                        'button',
                        'episode-link',
                        'Ver capítulo'
                    );

                    button.type = 'button';
                    button.dataset.video = video;
                    button.dataset.title = episode.name || 'Capítulo';

                    item.appendChild(button);

                }

                list.appendChild(item);

            });

            information.appendChild(list);

        }

        fragment.appendChild(information);

        modalBody.replaceChildren(fragment);

        openModal();

    }


    // =====================================
    // CERRAR MODAL
    // =====================================

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', event => {

        if (event.target === modal) {
            closeModal();
        }

    });

    document.addEventListener('keydown', event => {

        if (
            event.key === 'Escape' &&
            modal.classList.contains('active')
        ) {
            closeModal();
        }

    });


    // =====================================
    // EVENTOS DE LAS TARJETAS
    // =====================================

    function handleCardClick(event) {

        const card = event.target.closest('.movie-card');

        if (!card) return;

        const type = card.dataset.type;
        const id = card.dataset.id;

        let item;


        if (type === 'movie') {

            item = [...newMovies, ...recentItems].find(
                element => element.type === 'movie' && element.id === id
            );

            if (!item) return;

            playVideo(
                getVideo(item),
                getTitle(item),
                item.description || item.descripcion || ''
            );

            return;
        }


        if (type === 'episode') {

            item = recentItems.find(
                element => element.type === 'episode' && element.id === id
            );

            if (!item) return;

            playVideo(
                getVideo(item),
                item.displayTitle,
                item.description || item.descripcion || ''
            );

            return;
        }


        if (type === 'series') {

            item = seriesData.find(
                serie => String(serie.id) === id
            );

            if (!item) return;

            showInformation(
                getTitle(item),
                item.description || item.descripcion || '',
                Array.isArray(item.episodes) ? item.episodes : []
            );

        }

    }


    newMoviesContainer.addEventListener('click', handleCardClick);
    recentContainer.addEventListener('click', handleCardClick);


    // Accesibilidad: abrir tarjetas con Enter o Espacio
    function handleCardKeyboard(event) {

        if (
            event.key !== 'Enter' &&
            event.key !== ' '
        ) {
            return;
        }

        const card = event.target.closest('.movie-card');

        if (!card) return;

        event.preventDefault();

        handleCardClick(event);

    }


    newMoviesContainer.addEventListener('keydown', handleCardKeyboard);
    recentContainer.addEventListener('keydown', handleCardKeyboard);


    // Reproducción de episodios desde el modal
    modalBody.addEventListener('click', event => {

        const button = event.target.closest('button[data-video]');

        if (!button) return;

        playVideo(
            button.dataset.video,
            button.dataset.title
        );

    });


    // =====================================
    // INICIALIZACIÓN
    // =====================================

    renderItems(
        newMoviesContainer,
        newMovies,
        newNoResults
    );

    renderItems(
        recentContainer,
        recentItems,
        recentNoResults
    );


    console.log('Share Films - Más recientes cargado.');

    console.log('Periodo:', FIRST_YEAR, '-', LAST_YEAR);

    console.log('Películas nuevas:', newMovies.length);

    console.log('Contenido recién agregado:', recentItems.length);

});