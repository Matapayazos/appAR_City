import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  leaflet  from 'leaflet';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
@ViewChild('map') mapContainer: ElementRef;
map:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
