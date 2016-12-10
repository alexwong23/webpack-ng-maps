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
var GeolocationService = (function () {
    function GeolocationService() {
    }
    /**
     * get current position
     * Wraps the html5 get current position into an observable.
     *
     * @param none
     * @return An observable of GeocoderResult
     *
     * called in running in app.component.ts when get current location
     */
    GeolocationService.prototype.getCurrentPosition = function () {
        return new Observable_1.Observable(function (observer) {
            // Invokes getCurrentPosition method of Geolocation API
            navigator.geolocation.getCurrentPosition(
            // Success callback.
            function (position) {
                observer.next(position);
                observer.complete();
            }, 
            // Error callback.
            function (error) {
                console.log('Geolocation service: ' + error.message);
                observer.error(error);
            });
        });
    };
    GeolocationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GeolocationService);
    return GeolocationService;
}());
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=geolocation.service.js.map