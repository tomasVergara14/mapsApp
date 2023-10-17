import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'

interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlainMarker{
  color: string,
  lngLat: number[],
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls:['./markers-page.component.scss']
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-64.18,-31.41);
  public markers: MarkerAndColor[] = [];


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'el elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      });

    this.readFromLocalStorage();

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

    this.markers.push({ color, marker })

    this.saveToLocalStorage()
    
    marker.on('dragend', ()=>{
      this.saveToLocalStorage();
    });

  }

  deleteMarker( index: number ){
    this.markers[index].marker.remove()
    this.markers.splice( index,1 )
  }

  flyTo( marker:Marker ){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker })=>{
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers = JSON.parse(plainMarkersString)

    plainMarkers.forEach( ({ color, lngLat}:any) => {
      
      const [lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat)

      this.addMarker( coords, color)
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
