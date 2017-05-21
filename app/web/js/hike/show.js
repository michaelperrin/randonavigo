var HikeShow = (function () {
    "use strict";

    function init(gpxFile) {
        initMap(gpxFile);
        initGallery();
    }

    function initMap(gpxFile) {
        var map = L.map('hike-map');

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
            }
        ).addTo(map);

        new L.GPX(
            gpxFile,
            {
                async: true,
                parseElements: ['track'],
                marker_options: {
                    startIconUrl: '/images/map/starting-point-pin.png',
                    endIconUrl: '/images/map/ending-point-pin.png'
                }
            }
        ).on('loaded', function(e) {
            map.fitBounds(e.target.getBounds());
        }).addTo(map);
    }

    function initGallery() {
        $('.picture').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: {
                // options for gallery
                enabled: true
            }
        });
    }

    return {
        init: init
    };
})();
