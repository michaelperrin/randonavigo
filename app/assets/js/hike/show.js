import $ from 'jquery';
import 'leaflet';
import 'leaflet-gpx';
import 'magnific-popup';

window.HikeShow = (function () {
    function init() {
        var gpxFile = document.getElementById('hike').dataset.gpxFile;

        initMap(gpxFile);
        initGallery();
    }

    function initMap(gpxFile) {
        var map = L.map('hike-map', {
            detectRetina: true
        });

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
                attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
            }
        ).addTo(map);

        map.scrollWheelZoom.disable();

        new L.GPX(
            gpxFile,
            {
                async: true,
                parseElements: ['track'],
                marker_options: {
                    startIconUrl: '/images/map/starting-point-pin.png',
                    endIconUrl: '/images/map/ending-point-pin.png',
                    shadowUrl: null
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
