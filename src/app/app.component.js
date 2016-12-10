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
var maps_service_1 = require('../app/services/maps.service');
var geolocation_service_1 = require('../app/services/geolocation.service');
var geocoding_service_1 = require('../app/services/geocoding.service');
var AppComponent = (function () {
    function AppComponent(maps, geolocation, geocoding) {
        this.maps = maps;
        this.geolocation = geolocation;
        this.geocoding = geocoding;
        // experimental marker array, not working
        this.markers = [
            {
                lat: 1.307536,
                lng: 103.828641,
                label: 'A',
                draggable: true
            },
            {
                lat: 1.307740,
                lng: 103.829778,
                label: 'B',
                draggable: false
            },
            {
                lat: 1.306120,
                lng: 103.828158,
                label: 'C',
                draggable: true
            }
        ];
        // sets map properties
        this.center = new google.maps.LatLng(1.315188, 103.816102);
        this.zoom = 50;
        this.disableDefaultUI = true;
        this.disableDoubleClickZoom = false;
        this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.maxZoom = 15;
        this.minZoom = 4;
        // Styled Maps: https://developers.google.com/maps/documentation/javascript/styling
        // You can use the Styled Maps Wizard: http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html 
        this.styles = [
            {
                featureType: 'landscape',
                stylers: [
                    { color: '#ffffff' }
                ]
            }
        ];
        // Initially the marker isn't set.
        // NOTE WHERE DOES THE ERROR APPEAR!
        // Clears the search and warning messages
        this.address = '';
        this.warning = false;
        this.message = '';
    }
    // Tries to get the current position.
    AppComponent.prototype.getCurrentPosition = function () {
        var _this = this;
        // remove warning messages
        this.warning = false;
        this.message = '';
        // if client able to call navigator geolocation, some browsers dont support html 5 navigator
        if (navigator.geolocation) {
            // returns an observable that resolves on success or rejects with the handled error
            // this.geolocation.getCurrentPosition().forEach(success, error, options)
            this.geolocation.getCurrentPosition().forEach(function (position) {
                if (_this.center.lat() !== position.coords.latitude && _this.center.lng() !== position.coords.longitude) {
                    // Sets the new center map & zoom which triggers OnChanges in the map directives
                    _this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    _this.zoom = 50;
                    // Translates the location into address and sets the marker
                    // geocode function in geocoding.service.ts, takes a position as parameter
                    _this.geocoding.geocode(_this.center).forEach(function (results) {
                        // Sets the marker to the center map.
                        _this.setMarker(_this.center, 'your locality', results[0].formatted_address);
                    }, null).then(function () { return console.log('Geocoding service: completed.'); });
                }
            }, null).then(function () { return console.log('Geolocation service: completed.'); }).catch(function (error) {
                if (error.code > 0) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            _this.message = 'permission denied';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            _this.message = 'position unavailable';
                            break;
                        case error.TIMEOUT:
                            _this.message = 'position timeout';
                            break;
                    }
                    _this.warning = true;
                }
            });
        }
        else {
            this.warning = true;
            this.message = 'browser doesn\'t support geolocation';
        }
    };
    // Searches the address. 
    AppComponent.prototype.search = function (address) {
        var _this = this;
        if (address !== '') {
            this.warning = false;
            this.message = '';
            // Converts the address into geographic coordinates.
            this.geocoding.codeAddress(address).forEach(
            // returns an array of results of type 'google.maps.GeocoderResult
            function (results) {
                // if the first search result is not equal to the current location
                // prevent searching same place again
                if (!_this.center.equals(results[0].geometry.location)) {
                    // centers map to the first search result with marker                 
                    _this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    _this.zoom = 11;
                    _this.setMarker(_this.center, 'search result', results[0].formatted_address);
                }
            }, null).then(function () {
                // Clears the search string.
                _this.address = '';
                console.log('Geocoding service: completed.');
            }).catch(function (status) {
                // Zero results.
                if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    _this.warning = true;
                    _this.message = 'zero results';
                }
            });
        }
    };
    // Sets the marker & the info window.
    AppComponent.prototype.setMarker = function (latLng, title, content) {
        // Removes all markers.
        this.maps.deleteMarkers();
        // Sets a new marker.
        this.position = latLng;
        this.title = title;
        this.content = content;
    };
    // testing mapClicked but not returning lat and lng
    AppComponent.prototype.mapClicked = function ($event) {
        console.log($event);
        // this.markers.push({
        // lat: $event.coords.lat,
        // lng: $event.coords.lng,
        // draggable: true
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [maps_service_1.MapsService, geolocation_service_1.GeolocationService, geocoding_service_1.GeocodingService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map