import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the CrearVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-video',
  templateUrl: 'crear-video.html',
})
export class CrearVideoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearVideoPage');
  }
  
resultados:string="";
codigo:string="";
descripcion:string="";
nombre:string="";
ruta:string="";

data : string=
  " codigo : 5 , descripcion : Un video de la Maria Auxiliadora , nombre : Maria Auxiliadora , ruta: /hola/jojo/mojo/lolo/Maria Auxiliadora.mp4 "
;
  add(data){
    return new Promise(
      resolve => {
      this.http.post("http://localhost:8080/Tesis/srv/videos/insert",data)
      .map(res=>res.json())
      .subscribe(
        data => {
          resolve(data);
        },err=>{
          console.log(err);
        }
      )
       })
  }

}

