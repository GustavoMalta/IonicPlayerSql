//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'

/*
ionic cordova plugin add cordova-plugin-nativestorage
npm install --save @ionic-native/native-storage
 */

@Injectable()
export class ListaProvider {

  constructor(public storage: Storage ) {
    console.log('Hello ListaProvider Provider');
  }
  
 

  public insert(arquivo: Arquivo, key:string) {
   
    //let key = Math.random().toString(36).replace(/[^a-z]+/g, '')
   //console.log(this.storage(key));
    console.log("Ja existe na lista!!");
   
   console.log("Json" + JSON.stringify(arquivo));
   
    return this.save(key, arquivo);
  }
 
  public update(key: string, arquivo:Arquivo) {
    return this.save(key, arquivo);
  }
 
  private save(key: string, arquivo:Arquivo) {
    //let temptemp.caminho=caminho; temp.nome=nome;   
   // console.log("set" + JSON.stringify(this.storage.(key)));
    return this.storage.set(key, arquivo);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }

  public limpa() {
    return this.storage.clear();
  }

  public getAll() {

    let arquivos: Lista[]=[];

    return this.storage.forEach((value: Arquivo, key: string, iterationNumber: Number) => {
      let file = new Lista();
      file.key = key;
      file.arquivo = value;
      arquivos.push(file);
    })
      .then(() => {
        return Promise.resolve(arquivos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Arquivo{
  nome: string;
  caminho: string;
}


export class Lista {
  key: string;
  arquivo: Arquivo;
}
