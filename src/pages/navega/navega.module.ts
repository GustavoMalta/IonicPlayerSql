import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavegaPage } from './navega';

@NgModule({
  declarations: [
    NavegaPage,
  ],
  imports: [
    IonicPageModule.forChild(NavegaPage),
  ],
})
export class NavegaPageModule {}
