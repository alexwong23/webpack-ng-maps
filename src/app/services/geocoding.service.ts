import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeocodingService {

    // sets geocoder param to type geocoder
    geocoder: google.maps.Geocoder;

    constructor() {
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
    geocode(latLng: google.maps.LatLng): Observable<google.maps.GeocoderResult[]> {
        return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'location': latLng }, (
                // callback of geocode method
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    // if returns a successful geocode status, set result to observer
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    // return error if unsuccessful
                    } else {
                        console.log('Geocoding service: geocoder failed due to: ' + status);
                        observer.error(status);
                    }
                })
            );
        });
    }

    /**
     * Geocoding services, return position from search string
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param address to be searched
     * @return An observable of GeocoderResult (array)
     * 
     * called in app.component.ts when search
     */
    codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
        return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'address': address }, (
                // callback of geocode method
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    // if returns a successful geocode status, set result to observer
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    // return error if unsuccessful
                    } else {
                        console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                        observer.error(status);
                    }
                })
            );
        });
    }
}
