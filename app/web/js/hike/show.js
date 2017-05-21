var HikeShow = (function () {
    "use strict";

    function init(gpxFile) {
        initMap(gpxFile);
        initGalleries();
    }

    function initMap(gpxFile) {
        var map = L.map('hike-map');

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
            }
        ).addTo(map);

        new L.GPX(gpxFile, {async: true}).on('loaded', function(e) {
          map.fitBounds(e.target.getBounds());
        }).addTo(map);
    }

    function initGalleries() {
        RandoNavigoGallery.init();
    }

    return {
        init: init
    };
})();
