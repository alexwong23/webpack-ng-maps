import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeolocationService {

    constructor() { }

    /**
     * get current position
     * Wraps the html5 get current position into an observable.
     * 
     * @param none
     * @return An observable of GeocoderResult
     * 
     * called in running in app.component.ts when get current location
     */
    getCurrentPosition(): Observable<Position> {
        return new Observable((observer: Observer<Position>) => {

            // Invokes getCurrentPosition method of Geolocation API
            navigator.geolocation.getCurrentPosition(
                // Success callback.
                (position: Position) => {
                    observer.next(position);
                    observer.complete();
                },
                // Error callback.
                (error: PositionError) => {
                    console.log('Geolocation service: ' + error.message);
                    observer.error(error);
                }
            );
        });
    }
}
