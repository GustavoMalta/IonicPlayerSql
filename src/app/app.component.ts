import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BancoProvider } from '../providers/banco/banco';
import { ListasProvider } from '../providers/listas/listas';

import { TabsPage } from '../pages/tabs/tabs';
import { PlaylistsPage } from '../pages/playlists/playlists';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = null;
  playlists:any = null;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: BancoProvider, playlist: ListasProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      dbProvider.createDatabase()
        .then(() => {
          this.openHomePage(splashScreen)
        })
        .catch(() => {
          this.openHomePage(splashScreen)
        }) 
    });

    /*playlist.getAll()
      .then((data: any) => {

        console.log('sucesso ' + JSON.stringify(data));
      })  
      .catch((e) => console.error(e));
  */
    }

  private openHomePage(splashScreen: SplashScreen){
    splashScreen.hide();
    this.rootPage = TabsPage;
    this.nav.setRoot(PlaylistsPage)

  }



}
