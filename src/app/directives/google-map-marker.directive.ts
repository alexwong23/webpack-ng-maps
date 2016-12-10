import { Directive, Input, OnChanges, SimpleChange } from '@angular/core';

import { MapsService } from '../services/maps.service';

@Directive({
    selector: 'sebm-google-map-marker'
})

// customized directives change behaviour of selector sebm-google-map-marker
export class GoogleMapMarkerDirective implements OnChanges {

    // takes input from parent (app.component.html)
    @Input() position: google.maps.LatLng;
    @Input() title: string;
    @Input() content: string;

    constructor(public maps: MapsService) { }

    // on changes, creates the marker and the info window
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['position']) { this.maps.addMarker(this.position, this.title, this.content); };
    }
}
