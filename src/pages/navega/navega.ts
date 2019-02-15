import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { ArquivosProvider } from '../../providers/arquivos/arquivos';

@IonicPage()
@Component({
  selector: 'page-navega',
  templateUrl: 'navega.html',
})
export class NavegaPage {
  itensFiltrado;
  savedParentNativeURLs = [];
  itensCompleto;
  teste;
  dirAtual;
  dirRoot;
    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private platform: Platform,
              public ngZone: NgZone,
              public arquivos: ArquivosProvider) {
    platform.ready()
    .then(() => {
      this.listRootDir();
    })

    this.platform.registerBackButtonAction(() => {
       this.goUp();
    });

  }
  
  ionViewDidLoad() {

  }

  listRootDir = () => {

    const ROOT_DIRECTORY = "file:///storage/emulated/0/Music/";
    
    (<any> window).resolveLocalFileSystemURL(ROOT_DIRECTORY,
      (fileSystem) => {

        var reader = fileSystem.createReader();
        this.dirRoot=(reader.localURL);
        reader.readEntries(
          (entries) => {
              this.ngZone.run(()=> {
                this.itensCompleto = entries;
                this.itensFiltrado = this.filtro(entries);
                

              
              this.teste = JSON.stringify(this.itensCompleto); 
            });
          }, this.handleError);
      }, this.handleError);
      
   
  }
  handleError = error => { //to fix handleError's
    console.log("error reading,", error);

  };

toPlayer(arquivo){
    this.arquivos.insert(arquivo)
    //this.navCtrl.setRoot(HomePage, caminho);
  }

goDown (item){
    let childName = this.itensCompleto[0].name;
    let childNativeURL = this.itensCompleto[0].nativeURL;

    const parentNativeURL = childNativeURL.replace(childName, "");

    this.savedParentNativeURLs.push(parentNativeURL);

    this.itensCompleto.forEach(temp => { 
      if((temp.nativeURL.indexOf(item.nativeURL)>=0)){
        var reader = temp.createReader();
        this.dirAtual=(reader);
        this.teste = JSON.stringify(this.dirAtual);
        

        reader.readEntries(children => {
          this.ngZone.run(() => {
            this.itensFiltrado = this.filtro(children);
           // console.log(JSON.stringify(this.itensFiltrado));
            //this.teste = JSON.stringify(this.itensCompleto);
        });
      }, this.handleError);
    }
    
 // console.log('depois'+JSON.stringify(this.itensFiltrado));
});
    
  
}

goUp(){
  console.log(this.dirAtual.localURL + '>>>' + this.dirRoot)
  if ((this.dirAtual) && (this.dirAtual.localURL != this.dirRoot)){ //quando nao existe localURL. esta no diretorio Raiz
    
    const parentNativeURL = this.savedParentNativeURLs.pop();

      (<any> window).resolveLocalFileSystemURL(parentNativeURL,
        (fileSystem) => {

          var reader = fileSystem.createReader();
          this.dirAtual=(reader);
          this.teste= JSON.stringify(this.dirAtual);

          reader.readEntries(
            (entries) => {
              this.ngZone.run(()=> {
                this.itensFiltrado = this.filtro(entries);
              })
            }, this.handleError);
        }, this.handleError);
  }
}

filtro(pasta){
  let x=true;
  let filtrado;
  this.itensCompleto = pasta;
  //console.log('antes'+JSON.stringify(pasta));
  //if(completo.hasReadEntries)
  pasta.forEach(element => { //se é um diretorio
    if(element.isDirectory){
        if(x){
          filtrado='[';
          filtrado = filtrado + JSON.stringify(element);
          x=false;
        }else{
          filtrado = filtrado + ',' + JSON.stringify(element);
        }
    }
  });

  pasta.forEach(element => { //se é um mp3
    if((element.name.indexOf(".mp3")>=0)){
        if(x){
          filtrado='[';
          filtrado = filtrado + JSON.stringify(element);
          x=false;
        }else{
          filtrado = filtrado + ',' + JSON.stringify(element);
        }
    }
});

  if(x){
    return JSON.parse('[{"isVazio":true}]')
  }
  filtrado = filtrado + ']';
  return JSON.parse(filtrado);
}

}