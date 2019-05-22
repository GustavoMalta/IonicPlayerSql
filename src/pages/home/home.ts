import { Component } from '@angular/core';
import { NavController,NavParams, IonicPageModule, IonicPage } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { LoadingController } from 'ionic-angular';
import { ListasProvider } from '../../providers/listas/listas'
import { ArquivosProvider } from '../../providers/arquivos/arquivos';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arquivo: MediaObject = null //this.media.create('https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3');///storage/emulated/0/Download/lobo.mp3');
  pause = false;
  pp="play";
  loader: any;
  teste = "";
  file=[];
  isAudioPlaying:boolean = false;
  position: number = 0;
  duration: any = -1;
  interval;
  test: any[]=[];
  get_position_interval: number;
  id_lista_atual: number;
  nome_lista_atual: string;


  constructor(public navCtrl: NavController,
              private media: Media,
              public loadingCtrl: LoadingController,
              public navParam: NavParams,
              public listas: ListasProvider,
              public arquivos: ArquivosProvider) {
  }
  
  ionViewDidEnter() {
      if (this.pp=="play"){ //foi o jeito que consegui ver se estava vazio
        //this.para()
      }
      this.id_lista_atual = this.listas.id_lista_atual
      this.nome_lista_atual = this.listas.nome_lista_atual
      console.log("Lista atual " + this.id_lista_atual)

          if (this.id_lista_atual > 0){
          this.arquivos.get(this.id_lista_atual)
          .then((result: any) => {
            this.file = result;
            this.teste= JSON.stringify(result);
          })
          .catch((e) => console.error("Lista Vazia"+e));
        }else {
        this.file =[]
        }
        
      
        
      console.log (JSON.stringify(this.teste));
      
  }

  toca(caminho:string){
    if (caminho){
      this.para();
      this.arquivo = this.media.create(caminho);
      console.log(JSON.stringify(this.arquivo))
      this.startLoad("Carregando...");
      this.interval = setInterval(() => {
        if(this.arquivo != null) {
            this.duration = this.arquivo.getDuration();  
          }
        }, 2);
      this.ionViewDidEnter();
      this.endLoad();

    }

    if (this.arquivo != null) {
      if (!this.isAudioPlaying){
        this.pp="pause";
        console.log("Tocando arquivo");
        this.arquivo.play();
        this.isAudioPlaying = true;
        }else{
        this.pp="play";
        this.arquivo.pause();
        this.isAudioPlaying = false;
        }

        this.getAndSetCurrentAudioPosition();
      }
  }


 para(){
   if (this.arquivo != null){
      this.arquivo.stop();
      this.position = 0;
      console.log("parando arquivo"); 
      this.pp="play";
      this.isAudioPlaying = false;
      }

  }

 limpaLista(){
      this.arquivos.clearPlaylist(this.id_lista_atual);
      this.para()
      this.arquivo = null
      this.duration = -1
      this.ionViewDidEnter();
      this.position = -0.001

  }

     
  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    
    this.get_position_interval = setInterval(function(){ //essa func fica rodadn o tempo todo. Deal With It
      let last_position = self.position;
      if (self.arquivo != null){
        self.arquivo.getCurrentPosition()
      .then((position) => {
    //    console.log(position)
        if (position >= 0 && position < self.duration) {
          if(Math.abs(last_position - position) >= diff) {
            // set position
            self.arquivo.seekTo(last_position*1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
        }
        
      })
      .catch((e) => console.error("Arquivo Vazio"+e));
      }else{
        self.position = -0.001;
      }      
    }, 100)
    
}


private startLoad(load){
      this.loader = this.loadingCtrl.create({
      content: load,
      }); 
    this.loader.present();
    }

private endLoad(){
      this.loader.dismiss();
    }
    
}


export class Lista {
  id_lista: number =null;
  nome_lista: string = null;
}