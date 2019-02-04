import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { IntroPage } from '../intro/intro';
import { MapaPage } from '../mapa/mapa';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  nombre :string =" ";
  items
  resultados: string[];
  
  constructor(public navCtrl: NavController ,public http: Http) {
    this.initializeItems();
    }
  public itemSelected (item: string){
   
  //this.consultarWikipedia(item);
    let cabecera =new Headers({
      'Accept': 'application/json'
    });
    let opciones =new RequestOptions({ headers: cabecera });
    this.http.get('http://localhost:8080/Tesis/srv/'+item+'/list' , opciones)
    .map ( res => res.json())
    .subscribe ( datos => {
        console.log(datos);
        this.resultados = datos;
    }) , err => {
      console.log ( "Error" + err );
    }
  }
 
  GoMapa():void{
    this.navCtrl.push(MapaPage);
  }
  GoIntro():void{
    this.navCtrl.push(IntroPage);
  }
  initializeItems() {
    this.items = ["videos", "personas","items","Lugares","historias" ];
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
  
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    
  }
}
