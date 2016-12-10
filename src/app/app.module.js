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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
// Directives.
var google_map_directive_1 = require('../app/directives/google-map.directive');
var google_map_marker_directive_1 = require('../app/directives/google-map-marker.directive');
var google_map_circle_directive_1 = require('../app/directives/google-map-circle.directive');
// Services.
var maps_service_1 = require('../app/services/maps.service');
var geolocation_service_1 = require('../app/services/geolocation.service');
var geocoding_service_1 = require('../app/services/geocoding.service');
var app_component_1 = require('./app.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                google_map_directive_1.GoogleMapDirective,
                google_map_marker_directive_1.GoogleMapMarkerDirective,
                google_map_circle_directive_1.GoogleMapCircleDirective
            ],
            providers: [
                maps_service_1.MapsService,
                geolocation_service_1.GeolocationService,
                geocoding_service_1.GeocodingService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map