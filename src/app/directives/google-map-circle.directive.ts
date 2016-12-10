import { Directive, Input, OnChanges, SimpleChange } from '@angular/core';

import { MapsService } from '../services/maps.service';

@Directive({
    selector: 'sebm-google-map-circle'
})

// customized directives change behaviour of selector sebm-google-map-circle
export class GoogleMapCircleDirective implements OnChanges {

    // takes input from parent (app.component.html)
    @Input() center: google.maps.LatLng;

    // custom variable to store and remove previous circle
    previouscenter: google.maps.LatLng;

    constructor(public maps: MapsService) { }

    // INCOMPLETE on changes, creates the circle
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        // remove if there is an existing google map circle 
        if (this.previouscenter !== undefined) {
            this.maps.removeCircle(this.previouscenter);
        }
        // set previouscenter variable to value of current location for future remove circle
        this.previouscenter = this.center;
        if (changes['center']) {
            this.maps.addCircle(this.center);
        };
    }
}
