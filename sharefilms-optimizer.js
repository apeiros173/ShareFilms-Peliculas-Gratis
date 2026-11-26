
(function () {
    'use strict';

    const config = {
        player: null,
        searchDelay: 250,
        currentUrl: ''
    };

    function init(options = {}) {
        Object.assign(config, options);
        config.player = config.player || document.getElementById('moviePlayer');
        optimizeImages(document);
    }

    // El iframe recibe src solo al solicitar la reproducción.
    function play(url) {
        if (!config.player || !url) return false;

        if (config.currentUrl === url && config.player.getAttribute('src')) {
            return true;
        }

        stop();
        config.currentUrl = url;
        config.player.setAttribute('src', url);
        return true;
    }

    // Quitar src detiene y descarga el contenido del reproductor.
    function stop() {
        if (!config.player) return;

        if (config.player.tagName === 'VIDEO') {
            config.player.pause();
            config.player.removeAttribute('src');
            config.player.load();
        } else {
            config.player.removeAttribute('src');
        }

        config.currentUrl = '';
    }

    function optimizeImages(container = document) {
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    function debounce(callback, delay = config.searchDelay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(this, args), delay);
        };
    }

    function onClose() {
        stop();
    }

    function destroy() {
        stop();
        config.player = null;
    }

    window.ShareFilmsOptimizer = {
        init,
        play,
        stop,
        optimizeImages,
        debounce,
        onClose,
        destroy
    };
})();