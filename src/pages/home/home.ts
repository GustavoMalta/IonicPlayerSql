import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { LoadingController } from 'ionic-angular';
import { ListaProvider } from '../../providers/lista/lista';
import { BancoProvider } from '../../providers/banco/banco';
import { ListasProvider } from '../../providers/listas/listas'
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
  duration: any = -1;
  interval;
  SQL;
  test: any[]=[];

  constructor(public navCtrl: NavController,
              private media: Media,
              public loadingCtrl: LoadingController,
              public navParam: NavParams,
              public lista: ListaProvider,
              public banco: BancoProvider,
              public listas: ListasProvider) {
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
      console.log(JSON.stringify(this.arquivo))
      
    }
      if (this.pp=="play"){
        this.isAudioPlaying = true;
        this.pp="pause";
        console.log("Tocando arquivo");
        this.interval = setInterval(() => {
         /* if(this.duration == -1) {*/
            this.duration = this.arquivo.getDuration();
            
         /* } else {
            this.arquivo.stop();
            this.arquivo.setVolume(1.0);
            clearInterval(this.interval);
          }*/
       }, 2);
        if (!this.pause){
          this.startLoad("Carregando...");
          this.arquivo.play(); 
          
          this.endLoad();
        }else{
          this.arquivo.play();
          
        }
      }else{
        this.pp="play";
        this.isAudioPlaying = false;
        this.arquivo.pause();
        this.pause=true;
      }
      //this.controlProgressBar('');
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

      // printar toras as categorias 
      this.listas.categorias()
      .then((data: any[]) => {
        this.test = data;
      console.log (JSON.stringify(this.test));
      })
      .catch((e) => console.error('1'+JSON.stringify(e)));
  }

     
    

    
    

controlProgressBar(event) {
      //console.log("ControlprogressBar" +event.toString());
      var self = this;
      if(this.isAudioPlaying == true ) {
          setInterval(function () {
          self.arquivo.getCurrentPosition().then((position) => {
            self.position = position;
            console.log(position);
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
