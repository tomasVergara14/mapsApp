import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements AfterViewInit {
  
  @Input() lngLat?: [number, number];
  
  @ViewChild('map')
  public divMap?: ElementRef;
  public map?: Map;

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'el elemento HTML no fue encontrado'

    if( !this.lngLat ) throw 'Lng Lat no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
      });

      // this.addMarker(this.lngLat, 'red')
      new Marker()
      .setLngLat(this.lngLat)
      .addTo( this.map );
  }
}
