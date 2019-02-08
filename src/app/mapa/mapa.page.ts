import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import  leaflet  from 'leaflet';
@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.page.html',
  styleUrls: ['mapa.page.scss']
})
export class MapaPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map:any;
  constructor( ) {
  }

  ionViewDidEnter() {
    this.loadmap();
    console.log('ionViewDidLoad MapaPage');
  }
  loadmap(){
 this.map=leaflet.map("map").fitWorld();
 leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
   attribution:'Raja',
   maxZoom: 75
 }).addTo(this.map);
 this.map.locate({
   setView: true,
   maxZoom:100
 }).on('locationfound', (e)=>{
   //console.log('Your Location has been found');
   let markerGroup = leaflet.featureGroup();
   let mark:any =leaflet.marker([e.latitude, e.longitude]).on('click',()=>{
     alert('Marker clicked')
   })
   markerGroup.addLayer(mark);
   this.map.addLayer(markerGroup);
 
  })
  }
  ngOnInit() {
  }
 
}
