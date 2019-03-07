import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ListasProvider } from '../../providers/listas/listas'
import { ArquivosProvider } from '../../providers/arquivos/arquivos';
import { NavegaPage } from '../navega/navega';
 
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
  vazio:boolean;
  teste = "";

  nome:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public playlist: ListasProvider,
    public modalCtrl: ModalController,
    public arquivos: ArquivosProvider) {
  }


  ionViewDidEnter() {
    console.log('ionViewDidLoad PlaylistsPage');

    this.playlist.getAll()
            .then((result: any) => {
              this.lista = result;
              
            })
            .catch((e) => console.error(e));
      console.log (JSON.stringify(this.lista));

  }

  criar(){
   console.log(this.nome);
   this.playlist.insert(this.nome)
   .then(() => {
    this.ionViewDidEnter(); 
   })
   .catch((e) => console.error("Lista Vazia"+e));   
 
  }

  limpaLista(){    
    this.playlist.clearPlaylist(0)
    .then(() => {
      this.ionViewDidEnter(); 
   })
   .catch((e) => console.error("Lista Vazia"+e));    
   
  }

  apagar(id){    
    this.playlist.clearPlaylist(id)
    .then(() => {
      console.log("Lista Apagada!")
      this.arquivos.clearPlaylist(id)
      .then(()=>{
        console.log("Arquivos Apagados!")
      })
      .catch((e) => console.error("Erro nos Arquivos"+e));    
      this.ionViewDidEnter(); 
   })
   .catch((e) => console.error("Erro na Lista"+e));    
   
  }

  toPlayer(id, nome){
    //this.playlist.get(id);
    this.playlist.id_lista_atual = id
    this.playlist.nome_lista_atual = nome
    //this.vei.willLeave()
}

  adicionar(id: number){
    this.modalCtrl.create(NavegaPage, {"id_lista": id}).present()
  
 
    console.log('plylist: ' + id)
  }










}


