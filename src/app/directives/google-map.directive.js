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
var GoogleMapDirective = (function () {
    function GoogleMapDirective(maps, elementRef) {
        this.maps = maps;
        this.elementRef = elementRef;
    }
    // on init, run the private createmap function which creates map
    // gets element and creates map
    GoogleMapDirective.prototype.ngOnInit = function () {
        var el = this.elementRef.nativeElement.querySelector('#map');
        this.createMap(el);
    };
    // on changes, centers map & sets zoom
    GoogleMapDirective.prototype.ngOnChanges = function (changes) {
        if (changes['center']) {
            this.maps.setCenter(this.center);
        }
        ;
        if (changes['zoom']) {
            this.maps.setZoom(this.zoom);
        }
        ;
    };
    // private function to create map on init
    GoogleMapDirective.prototype.createMap = function (el) {
        this.maps.initMap(el, {
            center: this.center,
            zoom: this.zoom,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            mapTypeId: this.mapTypeId,
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
            styles: this.styles
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', google.maps.LatLng)
    ], GoogleMapDirective.prototype, "center", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GoogleMapDirective.prototype, "zoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GoogleMapDirective.prototype, "disableDefaultUI", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GoogleMapDirective.prototype, "disableDoubleClickZoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GoogleMapDirective.prototype, "mapTypeId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GoogleMapDirective.prototype, "maxZoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GoogleMapDirective.prototype, "minZoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GoogleMapDirective.prototype, "styles", void 0);
    GoogleMapDirective = __decorate([
        core_1.Component({
            selector: 'sebm-google-map',
            template: "\n        <div id=\"map\"></div>\n        <ng-content></ng-content>\n        "
        }), 
        __metadata('design:paramtypes', [maps_service_1.MapsService, core_1.ElementRef])
    ], GoogleMapDirective);
    return GoogleMapDirective;
}());
exports.GoogleMapDirective = GoogleMapDirective;
//# sourceMappingURL=google-map.directive.js.map