import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NavegaPageModule } from '../pages/navega/navega.module';
import { PlaylistsPageModule } from '../pages/playlists/playlists.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BancoProvider } from '../providers/banco/banco';

import { Media } from '@ionic-native/media';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { ListasProvider } from '../providers/listas/listas';
import { ArquivosProvider } from '../providers/arquivos/arquivos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NavegaPageModule,
    PlaylistsPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BancoProvider,
    Media,
    Storage,
    SQLite,
    ListasProvider,
    ArquivosProvider
    
  ]
})
export class AppModule {}
