import { Injectable } from '@angular/core';

@Injectable()
export class MapsService {

    // set private variables to type google maps or markers
    private map: google.maps.Map;
    private markers: Array<google.maps.Marker> = [];
    private circle: google.maps.Circle;

    constructor() { }

    // creates a new map inside the given HTML container
    initMap(el: HTMLElement, mapOptions: any) {
        this.map = new google.maps.Map(el, mapOptions);
        // Adds event listener resize when the window changes size.
        window.addEventListener('resize', () => { this.resize(); });
    }

    // private resize function to store and set center when map resized
    private resize() {
        // Save center, trigger resize event, restore center
        let latLng: google.maps.LatLng = this.map.getCenter();
        google.maps.event.trigger(this.map, 'resize');
        this.map.setCenter(latLng);
    }

    // setCenter function to set center map
    setCenter(latLng: google.maps.LatLng) {
        if (this.map != null && latLng != null) {
            this.map.panTo(latLng);
        }
    }

    // function to set zoom
    setZoom(zoom: number) {
        if (this.map != null) {
            this.map.setZoom(zoom);
        }
    }

    // function to add marker
    addMarker(latLng: google.maps.LatLng, title?: string, contentString?: string) {
        if (this.map != null && latLng != null) {

            // Creates the marker.
            let marker = new google.maps.Marker({
                position: latLng,
                title: title
            });
            // Adds the marker to the map.
            marker.setMap(this.map);
            // Creates the info window if required.
            if (contentString != null) {
                // Sets the max width of the info window to the width of the map element.
                let width: number = this.map.getDiv().clientWidth;
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: width
                });
                // Makes the info window visible.
                marker.addListener('click', function() {
                    infoWindow.open(this.map, marker);
                });
            }
            // Pushes it to the markers array.
            this.markers.push(marker);
        }
    }

    // function to delete all markers
    deleteMarkers() {
        // Removes the markers from the map.
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        // Removes references to them.
        this.markers = [];
    }

    // function to add circle
    addCircle(latLng: google.maps.LatLng) {
        if (this.map != null && latLng != null) {
            // Creates the circle with the given properties
            let circle = new google.maps.Circle({
                center: latLng,
                radius: 800,
                editable: false,
                strokeColor: 'red',
                fillColor: 'red',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillOpacity: 0.35
            });
            // Adds the circle to the map.
            circle.setMap(this.map);
        }
    }

    // INCOMPLETE function to remove circle
    removeCircle(latLng: google.maps.LatLng) {
        if (this.map != null && latLng != null) {
            console.log(latLng);
            // this.circle.setMap(null);
        }
    }
}
