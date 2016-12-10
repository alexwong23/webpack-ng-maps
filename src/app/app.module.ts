import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Directives.
import { GoogleMapDirective } from './directives/google-map.directive';
import { GoogleMapMarkerDirective } from './directives/google-map-marker.directive';
import { GoogleMapCircleDirective } from './directives/google-map-circle.directive';
// Services.
import { MapsService } from './services/maps.service';
import { GeolocationService } from './services/geolocation.service';
import { GeocodingService } from './services/geocoding.service';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        GoogleMapDirective,
        GoogleMapMarkerDirective,
        GoogleMapCircleDirective
    ],
    providers: [
        MapsService,
        GeolocationService,
        GeocodingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
