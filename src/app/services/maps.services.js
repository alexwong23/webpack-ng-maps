"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var MapsService = (function () {
    function MapsService() {
        this.markers = [];
    }
    /**
     * Creates a new map inside of the given HTML container.
     *
     * @param el DIV element
     * @param mapOptions MapOptions object specification
     */
    MapsService.prototype.initMap = function (el, mapOptions) {
        var _this = this;
        // Instances the map.
        this.map = new google.maps.Map(el, mapOptions);
        // Adds event listener resize when the window changes size.
        window.addEventListener('resize', function () { _this.resize(); });
    };
    /**
     * Resizes the map, updating its center.
     */
    MapsService.prototype.resize = function () {
        // Saves the center.
        var latLng = this.map.getCenter();
        // Triggers resize event.
        google.maps.event.trigger(this.map, 'resize');
        // Restores the center.
        this.map.setCenter(latLng);
    };
    /**
     * Sets the center map.
     *
     * @param latLng The center map
     */
    MapsService.prototype.setCenter = function (latLng) {
        if (this.map != null && latLng != null) {
            // Changes the center of the map to the given LatLng.
            this.map.panTo(latLng);
        }
    };
    /**
     * Sets zoom.
     *
     * @param zoom
     */
    MapsService.prototype.setZoom = function (zoom) {
        if (this.map != null) {
            this.map.setZoom(zoom);
        }
    };
    /**
     * Adds a marker.
     *
     * @param latLng Marker position
     * @param title Tooltip
     * @param contentString InfoWindow' content
     */
    MapsService.prototype.addMarker = function (latLng, title, contentString) {
        if (this.map != null && latLng != null) {
            // Creates the marker.
            var marker_1 = new google.maps.Marker({
                position: latLng,
                title: title
            });
            // Adds the marker to the map.
            marker_1.setMap(this.map);
            // Creates the info window if required.
            if (contentString != null) {
                // Sets the max width of the info window to the width of the map element.
                var width = this.map.getDiv().clientWidth;
                var infoWindow_1 = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: width
                });
                // Makes the info window visible.
                marker_1.addListener('click', function () {
                    infoWindow_1.open(this.map, marker_1);
                });
            }
            // Pushes it to the markers array.
            this.markers.push(marker_1);
        }
    };
    /**
     * Deletes all markers.
     */
    MapsService.prototype.deleteMarkers = function () {
        // Removes the markers from the map.
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        // Removes references to them.
        this.markers = [];
    };
    MapsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapsService);
    return MapsService;
}());
exports.MapsService = MapsService;
//# sourceMappingURL=maps.services.js.map