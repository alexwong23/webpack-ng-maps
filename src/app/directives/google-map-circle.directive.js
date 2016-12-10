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
var maps_service_1 = require('../services/maps.service');
var GoogleMapCircleDirective = (function () {
    function GoogleMapCircleDirective(maps) {
        this.maps = maps;
    }
    // INCOMPLETE on changes, creates the circle
    GoogleMapCircleDirective.prototype.ngOnChanges = function (changes) {
        // remove if there is an existing google map circle 
        if (this.previouscenter !== undefined) {
            this.maps.removeCircle(this.previouscenter);
        }
        // set previouscenter variable to value of current location for future remove circle
        this.previouscenter = this.center;
        if (changes['center']) {
            this.maps.addCircle(this.center);
        }
        ;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', google.maps.LatLng)
    ], GoogleMapCircleDirective.prototype, "center", void 0);
    GoogleMapCircleDirective = __decorate([
        core_1.Directive({
            selector: 'sebm-google-map-circle'
        }), 
        __metadata('design:paramtypes', [maps_service_1.MapsService])
    ], GoogleMapCircleDirective);
    return GoogleMapCircleDirective;
}());
exports.GoogleMapCircleDirective = GoogleMapCircleDirective;
//# sourceMappingURL=google-map-circle.directive.js.map