import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { LoadingController } from 'ionic-angular';
import { ListasProvider } from '../../providers/listas/listas'
import { ArquivosProvider } from '../../providers/arquivos/arquivos';
/*
ionic cordova plugin add cordova-plugin-media
npm install --save @ionic-native/media
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arquivo: MediaObject = null//this.media.create('https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3');///storage/emulated/0/Download/lobo.mp3');
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
  get_position_interval: number;

  constructor(public navCtrl: NavController,
              private media: Media,
              public loadingCtrl: LoadingController,
              public navParam: NavParams,
              public listas: ListasProvider,
              public arquivos: ArquivosProvider) {
  }
  
  ionViewDidEnter() {
      if (this.pp=="play"){ //foi o jeito que consegui ver se estava vazio
        this.para()
      }
        
      
      this.arquivos.getAll()
            .then((result: any) => {
              this.file = result;
              this.teste= JSON.stringify('1'+result);
            });
      console.log (JSON.stringify(this.teste));
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
        if(this.arquivo != null) {
            this.duration = this.arquivo.getDuration();
            
        } /*else {
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
      this.getAndSetCurrentAudioPosition();
    }


 para(){
   if (this.arquivo != null){
      this.arquivo.stop();
      console.log("parando arquivo"); 
      this.pause = false;  
      this.pp="play";
   }
  }

 limpaLista(){
      //this.lista.limpa(); 
      this.listas.clearPlaylist(0);
      this.arquivo = null //this.media.create(this.navParam.data);
      this.ionViewDidEnter();
    

  }

     
  private getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.arquivo.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          if(Math.abs(last_position - position) >= diff) {
            // set position
            self.arquivo.seekTo(last_position*1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.para();
        }
      });
    }, 100);
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
    
    
    
/*
controlProgressBar(event) {
      //console.log("ControlprogressBar" +event.toString());
      var self = this;
      if(this.isAudioPlaying == true ) {
          setInterval(function () {
            console.log('loop')
          self.arquivo.getCurrentPosition()
            .then((position: any) => {
              
              if (position > 0 &&  !isNaN(position)) {
                self.position = position;
                console.log(position);
              }
            })
            .catch((e) => console.error(e));
            
          }, 1000);
        }

      }		
*/
}
