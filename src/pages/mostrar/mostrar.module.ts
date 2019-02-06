import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarPage } from './mostrar';


@NgModule({
  declarations: [
    MostrarPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarPage),
  ],
})
export class MostrarPageModule {}
