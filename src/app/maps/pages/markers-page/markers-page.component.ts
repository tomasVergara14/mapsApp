import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls:['./markers-page.component.scss']
})
export class MarkersPageComponent {

  @ViewChild('map')
  public divMap?: ElementRef;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-64.18,-31.41);


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'el elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      });

  }

  createMarker(){
    if( !this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color);
  }

  addMarker( lngLat: LngLat, color: string ){
    if( !this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo( this.map );

  }

}
