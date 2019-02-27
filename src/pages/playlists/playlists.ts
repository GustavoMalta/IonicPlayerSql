import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListasProvider } from '../../providers/listas/listas'

/**
 * Generated class for the PlaylistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlists',
  templateUrl: 'playlists.html',
})
export class PlaylistsPage {

  lista =[];
  
  teste = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public playlist: ListasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistsPage');

    this.playlist.getAll()
            .then((result: any) => {
              this.lista = result;
              
              this.teste= JSON.stringify(this.lista);
              console.log('teste ' + this.teste)
            })
            .catch((e) => console.error("Lista Vazia"+e));
      console.log (JSON.stringify(this.teste));

  }




}
