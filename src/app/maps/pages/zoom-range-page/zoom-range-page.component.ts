import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl'

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.scss']
})
export class ZoomRangePageComponent implements AfterViewInit {


  @ViewChild('map')
  public divMap?: ElementRef;
  public currentZoom: number = 10;
  public map?: Map;


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'el elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
      });

      this.mapListeners(); 
  }

  mapListeners(){
    if( !this.map ) throw 'Map does not exist'

    this.map.on('zoom', (ev)=>{
      this.currentZoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev)=>{
      if( this.map!.getZoom() < 18 )return;
      this.map!.zoomTo(18);
    })
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string ){
    this.currentZoom = +value;
    this.map?.zoomTo( this.currentZoom );
  }

}
