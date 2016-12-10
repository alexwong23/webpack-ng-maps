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
var Observable_1 = require('rxjs/Observable');
var GeocodingService = (function () {
    function GeocodingService() {
        // set geocoder params to a new geocode
        this.geocoder = new google.maps.Geocoder();
    }
    /**
     * Reverse engineer location into geocode
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param latLng Location
     * @return An observable of GeocoderResult (array)
     *
     * called in app.component.ts when get current location
     */
    GeocodingService.prototype.geocode = function (latLng) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Invokes geocode method of Google Maps API geocoding.
            _this.geocoder.geocode({ 'location': latLng }, (
            // callback of geocode method
            // callback of geocode method
            function (results, status) {
                // if returns a successful geocode status, set result to observer
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                    observer.complete();
                }
                else {
                    console.log('Geocoding service: geocoder failed due to: ' + status);
                    observer.error(status);
                }
            }));
        });
    };
    /**
     * Geocoding services, return position from search string
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param address to be searched
     * @return An observable of GeocoderResult (array)
     *
     * called in app.component.ts when search
     */
    GeocodingService.prototype.codeAddress = function (address) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Invokes geocode method of Google Maps API geocoding.
            _this.geocoder.geocode({ 'address': address }, (
            // callback of geocode method
            // callback of geocode method
            function (results, status) {
                // if returns a successful geocode status, set result to observer
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                    observer.complete();
                }
                else {
                    console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                    observer.error(status);
                }
            }));
        });
    };
    GeocodingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GeocodingService);
    return GeocodingService;
}());
exports.GeocodingService = GeocodingService;
//# sourceMappingURL=geocoding.service.js.map