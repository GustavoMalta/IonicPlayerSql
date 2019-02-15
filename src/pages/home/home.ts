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
        
      
        this.arquivos.getAll()
            .then((result: any) => {
              this.file = result;
              this.teste= JSON.stringify(result);
            })
            .catch((e) => console.error("Lista Vazia"+e));
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
       // this.pause=true;
        this.isAudioPlaying = false;
        }

        this.getAndSetCurrentAudioPosition();
      }

     /* if (!this.pause){
        this.startLoad("Carregando...");
        this.arquivo.play(); 
        this.endLoad();

      }else{
        
      }*/
    //this.controlProgressBar('');
    //this.getAndSetCurrentAudioPosition();
   // }
  }


 para(){
   if (this.arquivo != null){
      this.arquivo.stop();
      this.position = 0;
      console.log("parando arquivo"); 
      //this.pause = false;  
      this.pp="play";
      this.isAudioPlaying = false;
      }

  }

 limpaLista(){
      //this.lista.limpa();
      this.para()
      this.arquivo = null //this.media.create(this.navParam.data);
      this.listas.clearPlaylist(0);
      this.ionViewDidEnter();

  }

     
  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    
    this.get_position_interval = setInterval(function(){ //essa func fica rodadn o tempo todo. Deal With It
      let last_position = self.position;
    //  if (this.position > 0){
      if (self.arquivo != null){
 //     console.log(self.position)
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
          //self.para();
        }
        
      })
      .catch((e) => console.error("Arquivo Vazio"+e));
      }else{
        self.position=-1;
      }
      

    //}
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
