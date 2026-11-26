
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // CONFIGURACIÓN
    // ==========================================

    const BATCH_SIZE = 20;
    const SEARCH_DELAY = 250;

    const moviesContainer = document.getElementById('movies');
    const searchInput = document.getElementById('search');
    const noResults = document.getElementById('no-results');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');
    const genreDropdown = document.getElementById('genreDropdown');
    const player = document.getElementById('moviePlayer');
    const playBtn = document.getElementById('playBtn');

    if (!Array.isArray(window.MOVIES)) {
        console.error('No se pudo cargar movies.js');

        if (noResults) {
            noResults.textContent = 'Error: no se pudo cargar el catálogo.';
            noResults.style.display = 'block';
        }

        return;
    }

    if (!moviesContainer) {
        console.error('No se encontró el contenedor #movies.');
        return;
    }

    // ==========================================
    // OPTIMIZADOR DEL REPRODUCTOR
    // ==========================================

    if (window.ShareFilmsOptimizer) {
        ShareFilmsOptimizer.init({
            player,
            searchDelay: SEARCH_DELAY
        });
    }

    // ==========================================
    // ADAPTACIÓN DEL CATÁLOGO
    // ==========================================

    const peliculas = window.MOVIES.map((p, index) => ({
        titulo: p.title || 'Sin título',
        año: p.year || '',
        descripcion: p.description || '',
        genero: Array.isArray(p.genres) ? p.genres : [],
        imagen: p.image || p.post || 'iconos/image-loading.gif',
        video: p.movie || p.trailerUrl || '',
        id: String(p.id ?? `${p.title || 'movie'}-${index}`),
        duracion: p.duration || '',
        clasificacion: p.rating || '',
        keywords: Array.isArray(p.keywords) ? p.keywords : []
    }));

    // ==========================================
    // VOTOS
    // ==========================================

    let movieVotes = {};

    try {
        movieVotes = JSON.parse(localStorage.getItem('movieVotes')) || {};
    } catch (error) {
        console.warn('No se pudieron recuperar los votos.', error);
    }

    peliculas.forEach(p => {
        if (!movieVotes[p.id]) {
            movieVotes[p.id] = {
                like: 0,
                dislike: 0
            };
        }
    });

    function guardarVotos() {
        try {
            localStorage.setItem(
                'movieVotes',
                JSON.stringify(movieVotes)
            );
        } catch (error) {
            console.warn('No se pudieron guardar los votos.', error);
        }
    }

    // ==========================================
    // BUSCADOR FUZZY
    // ==========================================

    const fuse = typeof Fuse !== 'undefined'
        ? new Fuse(peliculas, {
            keys: [
                'titulo',
                'descripcion',
                'genero',
                'keywords'
            ],
            threshold: 0.3
        })
        : null;

    let generoActivo = null;
    let resultadosActuales = peliculas;

    // ==========================================
    // MODAL Y REPRODUCTOR
    // ==========================================

    let currentVideo = '';

    function cerrarReproductor() {
        if (window.ShareFilmsOptimizer) {
            ShareFilmsOptimizer.stop();
        } else if (player) {
            player.removeAttribute('src');
        }
    }

    function abrirModal(p) {
        cerrarReproductor();

        currentVideo = p.video;

        modal.style.display = 'flex';

        document.getElementById('movieTitle').textContent =
            `${p.titulo}${p.año ? ` (${p.año})` : ''}`;

        document.getElementById('movieDescription').textContent =
            p.descripcion;

        document.getElementById('movieExtra').textContent =
            `Duración: ${p.duracion || 'No disponible'} | ` +
            `Clasificación: ${p.clasificacion || 'No disponible'} | ` +
            `Géneros: ${p.genero.join(', ')}`;

        document.getElementById('likeCount').textContent =
            movieVotes[p.id].like;

        document.getElementById('dislikeCount').textContent =
            movieVotes[p.id].dislike;

        modal.dataset.currentMovie = p.id;
    }

    function cerrarModal() {
        if (!modal) return;

        modal.style.display = 'none';

        cerrarReproductor();

        currentVideo = '';

        delete modal.dataset.currentMovie;
    }

    closeModalBtn?.addEventListener('click', cerrarModal);

    window.addEventListener('click', event => {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    window.addEventListener('keydown', event => {
        if (
            event.key === 'Escape' &&
            modal?.style.display === 'flex'
        ) {
            cerrarModal();
        }
    });

    // ==========================================
    // CREACIÓN DE TARJETAS
    // ==========================================

    function crearTarjeta(p) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.movieId = p.id;

        // Imagen
        const img = document.createElement('img');

        img.src = p.imagen;
        img.alt = p.titulo;
        img.loading = 'lazy';
        img.decoding = 'async';

        img.onerror = () => {
            img.onerror = null;
            img.src = 'iconos/image-loading.gif';
        };

        // Información
        const overlay = document.createElement('div');
        overlay.className = 'movie-overlay';

        const title = document.createElement('h3');

        title.textContent =
            `${p.titulo}${p.año ? ` (${p.año})` : ''}`;

        // Botones
        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const playButton = document.createElement('button');
        playButton.type = 'button';
        playButton.className = 'playCard';
        playButton.dataset.action = 'play';
        playButton.textContent = '▶';
        playButton.setAttribute('aria-label', 'Ver información');

        const likeButton = document.createElement('button');
        likeButton.type = 'button';
        likeButton.className = 'likeCard';
        likeButton.dataset.action = 'like';
        likeButton.textContent = `👍 ${movieVotes[p.id].like}`;

        const dislikeButton = document.createElement('button');
        dislikeButton.type = 'button';
        dislikeButton.className = 'dislikeCard';
        dislikeButton.dataset.action = 'dislike';
        dislikeButton.textContent = `👎 ${movieVotes[p.id].dislike}`;

        actions.append(
            playButton,
            likeButton,
            dislikeButton
        );

        overlay.append(title, actions);
        card.append(img, overlay);

        return card;
    }

    // ==========================================
    // DELEGACIÓN DE EVENTOS
    // ==========================================

    function actualizarVoto(id, tipo) {
        const votos = movieVotes[id];

        if (!votos) return;

        votos[tipo]++;

        guardarVotos();

        // Actualizar solamente la tarjeta afectada.
        const card = [...moviesContainer.children].find(
            element => element.dataset.movieId === id
        );

        if (card) {
            const button = card.querySelector(
                tipo === 'like' ? '.likeCard' : '.dislikeCard'
            );

            if (button) {
                button.textContent =
                    `${tipo === 'like' ? '👍' : '👎'} ${votos[tipo]}`;
            }
        }

        // Actualizar el modal si corresponde.
        if (modal?.dataset.currentMovie === id) {
            const count = document.getElementById(
                tipo === 'like' ? 'likeCount' : 'dislikeCount'
            );

            if (count) {
                count.textContent = votos[tipo];
            }
        }
    }

    moviesContainer.addEventListener('click', event => {
        const card = event.target.closest('.movie-card');

        if (!card) return;

        const id = card.dataset.movieId;
        const pelicula = peliculas.find(p => p.id === id);

        if (!pelicula) return;

        const button = event.target.closest('button[data-action]');

        if (button) {
            event.stopPropagation();

            const action = button.dataset.action;

            if (action === 'like') {
                actualizarVoto(id, 'like');
                return;
            }

            if (action === 'dislike') {
                actualizarVoto(id, 'dislike');
                return;
            }

            if (action === 'play') {
                abrirModal(pelicula);
                return;
            }
        }

        abrirModal(pelicula);
    });

    // ==========================================
    // CARGA PROGRESIVA
    // ==========================================

    let posicion = 0;

    const loadMoreButton = document.createElement('button');

    loadMoreButton.type = 'button';
    loadMoreButton.className = 'load-more-btn';
    loadMoreButton.textContent = 'Cargar más películas';
    loadMoreButton.hidden = true;

    moviesContainer.insertAdjacentElement(
        'afterend',
        loadMoreButton
    );

    function actualizarBotonCarga() {
        const restantes = resultadosActuales.length - posicion;

        loadMoreButton.hidden = restantes <= 0;

        if (restantes > 0) {
            loadMoreButton.textContent =
                `Cargar más películas (${restantes})`;
        }

        if (restantes <= 0) {
            observer?.unobserve(loadMoreButton);
        }
    }

    function cargarSiguienteLote() {
        if (posicion >= resultadosActuales.length) return;

        const fragment = document.createDocumentFragment();

        const limite = Math.min(
            posicion + BATCH_SIZE,
            resultadosActuales.length
        );

        for (; posicion < limite; posicion++) {
            const pelicula = resultadosActuales[posicion];

            fragment.appendChild(crearTarjeta(pelicula));
        }

        moviesContainer.appendChild(fragment);

        actualizarBotonCarga();
    }

    const observer = 'IntersectionObserver' in window
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cargarSiguienteLote();
                }
            });
        }, {
            rootMargin: '700px'
        })
        : null;

    loadMoreButton.addEventListener(
        'click',
        cargarSiguienteLote
    );

    // ==========================================
    // RENDERIZAR RESULTADOS
    // ==========================================

    function mostrarPeliculas(lista) {
        resultadosActuales = lista;

        posicion = 0;

        moviesContainer.replaceChildren();

        if (noResults) {
            noResults.style.display =
                lista.length === 0 ? 'block' : 'none';
        }

        if (lista.length === 0) {
            loadMoreButton.hidden = true;
            observer?.unobserve(loadMoreButton);
            return;
        }

        cargarSiguienteLote();

        if (posicion < resultadosActuales.length) {
            observer?.observe(loadMoreButton);
        }
    }

    // ==========================================
    // FILTROS Y BÚSQUEDA
    // ==========================================

    function obtenerResultados() {
        const texto = searchInput?.value.trim() || '';

        let resultados;

        if (!texto) {
            resultados = peliculas;
        } else if (fuse) {
            resultados = fuse.search(texto).map(
                resultado => resultado.item
            );
        } else {
            const termino = texto.toLowerCase();

            resultados = peliculas.filter(p =>
                [
                    p.titulo,
                    p.descripcion,
                    ...p.genero,
                    ...p.keywords
                ].join(' ').toLowerCase().includes(termino)
            );
        }

        if (generoActivo) {
            resultados = resultados.filter(p =>
                p.genero.includes(generoActivo)
            );
        }

        return resultados;
    }

    function buscar() {
        mostrarPeliculas(obtenerResultados());
    }

    function debounce(callback, delay) {
        let timeout;

        return function () {
            clearTimeout(timeout);

            timeout = setTimeout(callback, delay);
        };
    }

    searchInput?.addEventListener(
        'input',
        debounce(buscar, SEARCH_DELAY)
    );

    // ==========================================
    // GÉNEROS
    // ==========================================

    const allGenres = document.getElementById('allGenres');

    const genreBtn = document.getElementById('genreBtn');

    const generos = [
        ...new Set(peliculas.flatMap(p => p.genero))
    ].sort();

    generos.forEach(genero => {
        const button = document.createElement('button');

        button.type = 'button';
        button.textContent = genero;

        button.addEventListener('click', () => {
            generoActivo = genero;

            if (searchInput) {
                searchInput.value = '';
            }

            mostrarPeliculas(obtenerResultados());

            if (genreDropdown) {
                genreDropdown.style.display = 'none';
            }
        });

        genreDropdown?.appendChild(button);
    });

    allGenres?.addEventListener('click', () => {
        generoActivo = null;

        if (searchInput) {
            searchInput.value = '';
        }

        mostrarPeliculas(peliculas);

        if (genreDropdown) {
            genreDropdown.style.display = 'none';
        }
    });

    genreBtn?.addEventListener('click', () => {
        if (!genreDropdown) return;

        genreDropdown.style.display =
            genreDropdown.style.display === 'flex'
                ? 'none'
                : 'flex';
    });

    // ==========================================
    // VOTOS DESDE EL MODAL
    // ==========================================

    document.getElementById('likeBtn')?.addEventListener(
        'click',
        () => {
            const id = modal.dataset.currentMovie;

            if (id) actualizarVoto(id, 'like');
        }
    );

    document.getElementById('dislikeBtn')?.addEventListener(
        'click',
        () => {
            const id = modal.dataset.currentMovie;

            if (id) actualizarVoto(id, 'dislike');
        }
    );

    // ==========================================
    // REPRODUCCIÓN DIFERIDA
    // ==========================================

    playBtn?.addEventListener('click', () => {
        if (!currentVideo) {
            alert(
                'Esta película no tiene un enlace de reproducción disponible.'
            );
            return;
        }

        if (window.ShareFilmsOptimizer) {
            ShareFilmsOptimizer.play(currentVideo);
        } else if (player) {
            player.src = currentVideo;
        }

        player?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });

    // ==========================================
    // INICIO
    // ==========================================

    mostrarPeliculas(peliculas);

    console.log('Share Films optimizado.');
    console.log('Películas disponibles:', peliculas.length);
    console.log('Carga inicial:', BATCH_SIZE);
});