
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // CONFIGURACIÓN
    // =====================================

    const SEARCH_DELAY = 250;

    const seriesContainer = document.getElementById('series');
    const searchInput = document.getElementById('search');
    const noResults = document.getElementById('no-results');

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtn = document.getElementById('closeModal');

    // Los datos vienen de series.js
    const seriesData = window.SERIES;

    if (!Array.isArray(seriesData)) {
        console.error('No se pudo cargar SERIES. Revisa series.js.');
        return;
    }

    if (!seriesContainer || !modal || !modalBody) {
        console.error('Faltan elementos HTML necesarios para Share Series.');
        return;
    }

    // =====================================
    // ÍNDICE DE SERIES
    // =====================================

    const seriesById = new Map();

    seriesData.forEach((serie, index) => {
        serie._index = index;
        seriesById.set(String(serie.id), serie);
    });

    // =====================================
    // BUSCADOR
    // =====================================

    const fuse = typeof Fuse !== 'undefined'
        ? new Fuse(seriesData, {
            keys: [
                'title',
                'year',
                'genres',
                'episodes.name'
            ],
            threshold: 0.3,
            ignoreLocation: true
        })
        : null;

    let searchTimer = null;

    // =====================================
    // CREAR ELEMENTOS
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

    // =====================================
    // CREAR TARJETAS
    // =====================================

    function createCard(serie) {

        const card = createElement('article', 'series-card');

        const button = createElement('button', 'series-card-button');

        button.type = 'button';
        button.dataset.id = serie.id;

        button.setAttribute(
            'aria-label',
            `Ver información de ${serie.title}`
        );

        // Imagen de portada
        const image = document.createElement('img');

        image.src = serie.image ||serie.post ||  '';
        image.alt = serie.title;
        image.loading = 'lazy';
        image.decoding = 'async';

        image.onerror = () => {
            image.onerror = null;

            if (serie.post && image.src !== new URL(serie.post, document.baseURI).href) {
                image.src = serie.post;
                } else {
                     image.remove();
                       }
        };;

        // Título
        const title = createElement(
            'h3',
            '',
            serie.title
        );

        // Año
        const year = createElement(
            'p',
            'series-year',
            serie.year ? String(serie.year) : 'Año no disponible'
        );

        // Géneros
        const genres = createElement(
            'p',
            'series-genres',
            Array.isArray(serie.genres)
                ? serie.genres.join(' • ')
                : ''
        );

        button.append(
            image,
            title,
            year,
            genres
        );

        card.appendChild(button);

        return card;
    }

    // =====================================
    // MOSTRAR SERIES
    // =====================================

    function renderSeries(list) {

        const fragment = document.createDocumentFragment();

        list.forEach(serie => {
            fragment.appendChild(createCard(serie));
        });

        seriesContainer.replaceChildren(fragment);

        noResults.hidden = list.length !== 0;
    }

    // =====================================
    // CREAR MODAL
    // =====================================

    function openModal(serie) {

        const fragment = document.createDocumentFragment();

        // Portada
        const image = document.createElement('img');

        image.src = serie.image || serie.post || '';
        image.alt = serie.title;
        image.className = 'modal-poster';
        image.loading = 'lazy';
        image.decoding = 'async';

        image.onerror = () => {
            image.onerror = null;

            if (serie.post && image.src !== new URL(serie.post, document.baseURI).href) {
                image.src = serie.post;
            } else {
                image.remove();
            }
        };

        // Título
        const title = createElement(
            'h2',
            'modal-title',
            serie.title
        );

        title.id = 'modalTitle';

        // Información
        const information = createElement(
            'p',
            'modal-description',
            `Año: ${serie.year || 'No disponible'} | ` +
            `Géneros: ${
                Array.isArray(serie.genres)
                    ? serie.genres.join(', ')
                    : 'No disponibles'
            }`
        );

        fragment.append(
            image,
            title,
            information
        );

        // =================================
        // EPISODIOS
        // =================================

        const episodesTitle = createElement(
            'h3',
            'episodes-title',
            'Capítulos'
        );

        fragment.appendChild(episodesTitle);

        const episodesList = createElement(
            'ul',
            'capitulos'
        );

        const episodes = Array.isArray(serie.episodes)
            ? serie.episodes
            : [];

        episodes.forEach(episode => {

            const item = createElement('li', 'episode-item');

            const episodeName = createElement(
                'span',
                'episode-name',
                `Ep. ${episode.n}: ${episode.name || 'Sin título'}`
            );

            item.appendChild(episodeName);

            // Enlace de reproducción
            if (episode.drive) {

                const link = createElement(
                    'a',
                    'episode-link',
                    'Ver capítulo'
                );

                link.href = episode.drive;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                item.appendChild(link);
            }

            episodesList.appendChild(item);
        });

        if (episodes.length === 0) {
            episodesList.appendChild(
                createElement(
                    'li',
                    '',
                    'No hay capítulos disponibles.'
                )
            );
        }

        fragment.appendChild(episodesList);

        // Renderizar modal
        modalBody.replaceChildren(fragment);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

        closeModalBtn.focus();
    }

    // =====================================
    // CERRAR MODAL
    // =====================================

    function closeModal() {

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

        modalBody.replaceChildren();
    }

    closeModalBtn?.addEventListener('click', closeModal);

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
    // DELEGACIÓN DE EVENTOS
    // =====================================

    seriesContainer.addEventListener('click', event => {

        const button = event.target.closest('.series-card-button');

        if (!button) return;

        const serie = seriesById.get(button.dataset.id);

        if (!serie) return;

        openModal(serie);
    });

    // =====================================
    // BÚSQUEDA
    // =====================================

    function searchSeries() {

        const query = searchInput.value.trim();

        if (!query) {
            renderSeries(seriesData);
            return;
        }

        let results;

        if (fuse) {

            results = fuse.search(query).map(
                result => result.item
            );

        } else {

            const term = query.toLowerCase();

            results = seriesData.filter(serie => {

                const title = String(serie.title || '').toLowerCase();

                const genres = Array.isArray(serie.genres)
                    ? serie.genres.join(' ').toLowerCase()
                    : '';

                const episodes = Array.isArray(serie.episodes)
                    ? serie.episodes.map(ep => ep.name || '').join(' ').toLowerCase()
                    : '';

                return (
                    title.includes(term) ||
                    genres.includes(term) ||
                    episodes.includes(term)
                );
            });
        }

        renderSeries(results);
    }

    searchInput?.addEventListener('input', () => {

        clearTimeout(searchTimer);

        searchTimer = setTimeout(
            searchSeries,
            SEARCH_DELAY
        );
    });

    // =====================================
    // INICIALIZACIÓN
    // =====================================

    renderSeries(seriesData);

    console.log('Share Series optimizado.');
    console.log('Series disponibles:', seriesData.length);

});