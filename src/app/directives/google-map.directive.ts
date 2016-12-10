import { Component, Input, OnInit, OnChanges, SimpleChange, ElementRef } from '@angular/core';

import { MapsService } from '../services/maps.service';

@Component({
    selector: 'sebm-google-map',
    template: `
        <div id="map"></div>
        <ng-content></ng-content>
        `
})

// customized directives change behaviour of selector sebm-google-map
export class GoogleMapDirective implements OnInit, OnChanges {

    // takes input from parent (app.component.html)
    @Input() center: google.maps.LatLng;
    @Input() zoom: number;
    @Input() disableDefaultUI: boolean;
    @Input() disableDoubleClickZoom: boolean;
    @Input() mapTypeId: google.maps.MapTypeId;
    @Input() maxZoom: number;
    @Input() minZoom: number;
    @Input() styles: Array<google.maps.MapTypeStyle>;

    constructor(
        public maps: MapsService,
        private elementRef: ElementRef) { }

    // on init, run the private createmap function which creates map
    // gets element and creates map
    ngOnInit() {
        let el: HTMLElement = this.elementRef.nativeElement.querySelector('#map');
        this.createMap(el);
    }

    // on changes, centers map & sets zoom
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['center']) { this.maps.setCenter(this.center); };
        if (changes['zoom']) { this.maps.setZoom(this.zoom); };
    }

    // private function to create map on init
    private createMap(el: HTMLElement) {
        this.maps.initMap(el, {
            center: this.center,
            zoom: <number>this.zoom,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            mapTypeId: this.mapTypeId,
            maxZoom: <number>this.maxZoom,
            minZoom: <number>this.minZoom,
            styles: this.styles
        });
    }
}
