import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})


export class IntroPage {
  menssage : string = null; 
  file:string=null;
  link:string=null;
  subject:string=null;
   pressi: number = 0;
   pressm: number = 0;
   pressp: number = 0;
   pressc: number = 0;
  
  constructor(public navCtrl: NavController ,private socialSharing: SocialSharing) {
  
  }

  share(){
    this.socialSharing.share(this.menssage, this.subject, this.file,this.link)
    .then(()=>{

    }).catch(()=>{

    });
  }
  pressEvent1(e) {
      this.pressi++
    
  }
  pressEvent2(e) {
    this.pressm++
  
}
pressEvent3(e) {
  this.pressp++

}
pressEvent4(e) {
  this.pressc++

}


}
