import { Component } from '@angular/core';
import { Marker } from './marker';

import { MapsService } from './services/maps.service';
import { GeolocationService } from './services/geolocation.service';
import { GeocodingService } from './services/geocoding.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent  {

    // experimental marker array, not working
    markers: Marker[] = [
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

    // sebm-google-map & circle properties
    center: google.maps.LatLng;

    // sebm-google-map properties
    zoom: number;
    disableDefaultUI: boolean;
    disableDoubleClickZoom: boolean;
    mapTypeId: google.maps.MapTypeId;
    maxZoom: number;
    minZoom: number;
    styles: Array<google.maps.MapTypeStyle>;

    // sebm-google-map-marker properties
    position: google.maps.LatLng;
    title: string;
    content: string;

    // search bar properties
    address: string;

    // Warning flag & message.
    warning: boolean;
    message: string;

    constructor(
        public maps: MapsService,
        private geolocation: GeolocationService,
        private geocoding: GeocodingService) {

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
    getCurrentPosition() {
        // remove warning messages
        this.warning = false;
        this.message = '';

        // if client able to call navigator geolocation, some browsers dont support html 5 navigator
        if (navigator.geolocation) {
            // returns an observable that resolves on success or rejects with the handled error
            // this.geolocation.getCurrentPosition().forEach(success, error, options)
            this.geolocation.getCurrentPosition().forEach(
                (position: Position) => {
                    if (this.center.lat() !== position.coords.latitude && this.center.lng() !== position.coords.longitude) {
                        // Sets the new center map & zoom which triggers OnChanges in the map directives
                        this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        this.zoom = 50;

                        // Translates the location into address and sets the marker
                        // geocode function in geocoding.service.ts, takes a position as parameter
                        this.geocoding.geocode(this.center).forEach(
                            (results: google.maps.GeocoderResult[]) => {
                                // Sets the marker to the center map.
                                this.setMarker(this.center, 'your locality', results[0].formatted_address);
                            }, null
                        ).then(() => console.log('Geocoding service: completed.'));
                    }
                }, null
            ).then(() => console.log('Geolocation service: completed.')
            // error handling from googlemap typings
            ).catch((error: PositionError) => {
                    if (error.code > 0) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                this.message = 'permission denied';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                this.message = 'position unavailable';
                                break;
                            case error.TIMEOUT:
                                this.message = 'position timeout';
                                break;
                        }
                        this.warning = true;
                    }
                });
        // Browser doesn't support geolocation.
        } else {
            this.warning = true;
            this.message = 'browser doesn\'t support geolocation';
        }
    }

    // Searches the address. 
    search(address: string) {
        if (address !== '') {
            this.warning = false;
            this.message = '';

            // Converts the address into geographic coordinates.
            this.geocoding.codeAddress(address).forEach(
                // returns an array of results of type 'google.maps.GeocoderResult
                (results: google.maps.GeocoderResult[]) => {
                    // if the first search result is not equal to the current location
                    // prevent searching same place again
                    if (!this.center.equals(results[0].geometry.location)) {
                        // centers map to the first search result with marker                 
                        this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        this.zoom = 11;
                        this.setMarker(this.center, 'search result', results[0].formatted_address);
                    }
                }, null
            ).then(
                () => {
                    // Clears the search string.
                    this.address = '';
                    console.log('Geocoding service: completed.');
                }
                ).catch(
                (status: google.maps.GeocoderStatus) => {
                    // Zero results.
                    if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                        this.warning = true;
                        this.message = 'zero results';
                    }
                });
        }
    }

    // Sets the marker & the info window.
    setMarker(latLng: google.maps.LatLng, title: string, content: string) {
        // Removes all markers.
        this.maps.deleteMarkers();

        // Sets a new marker.
        this.position = latLng;
        this.title = title;
        this.content = content;
    }

    // testing mapClicked but not returning lat and lng
    mapClicked($event: any) {
        console.log($event);
        // this.markers.push({
        // lat: $event.coords.lat,
        // lng: $event.coords.lng,
        // draggable: true
    };
  }

