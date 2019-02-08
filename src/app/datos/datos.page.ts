import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-mapa',
  templateUrl: 'datos.page.html',
  styleUrls: ['datos.page.scss']
})
export class DatosPage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  nombre :string =" ";
  items
  resultados: string[];
  
  constructor( public http: Http) {
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
