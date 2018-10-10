import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { LoadingController } from 'ionic-angular';
import { ListaProvider } from '../../providers/lista/lista';
/*
ionic cordova plugin add cordova-plugin-media
npm install --save @ionic-native/media
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arquivo: MediaObject = this.media.create('https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3');///storage/emulated/0/Download/lobo.mp3');
  pause = false;
  pp="play";
  loader: any;
  teste = "";
  file=[];
  isAudioPlaying:boolean;
  position: number = 0;
	duration: number;

  constructor(public navCtrl: NavController,
              private media: Media,
              public loadingCtrl: LoadingController,
              public navParam: NavParams,
              public lista: ListaProvider) {
  }
  
  ionViewDidEnter() {
      if (!(this.navParam.data.contact && this.navParam.data.key)){ //foi o jeito que consegui ver se estava vazio
        this.lista.getAll()
            .then((result) => {
              this.file = result;
              this.teste= JSON.stringify(result);
            });
      }else{
        this.para();
        this.arquivo = this.media.create(this.navParam.data);
          this.lista.getAll()
            .then((result) => {
              this.file = result;
              this.teste= JSON.stringify(result);
            });
      }
  }

toca(caminho:string){
   if (caminho){
      this.para();
      this.arquivo = this.media.create(caminho);
      this.isAudioPlaying = true;
      
    }
      if (this.pp=="play"){
        this.pp="pause";
        console.log("Tocando arquivo");
        this.arquivo.getDuration();
        if (!this.pause){
          this.startLoad("Carregando...");
          this.arquivo.play(); 
          
          this.endLoad();
        }else{
          this.arquivo.play();
          
        }
      }else{
        this.pp="play";
        this.arquivo.pause();
        this.pause=true;
      }
    
    }


 para(){
     console.log("parando arquivo");
     this.arquivo.stop();   
     this.pause = false;  
     this.pp="play";
    }

 limpaLista(){
      this.lista.limpa();
      this.ionViewDidEnter();
    }

    controlProgressBar(event) {
      var self = this;
      if(this.isAudioPlaying == true ) {
          setInterval(function () {
          self.arquivo.getCurrentPosition().then((position) => {
            self.position = position;
          });
          }, 1000);
      }		
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
