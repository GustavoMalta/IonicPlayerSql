import { Injectable } from '@angular/core';
import { BancoProvider } from '../banco/banco';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ArquivosProvider {

  constructor(public banco: BancoProvider) {
    console.log('Hello ArquivosProvider Provider');
  }

  public insert(arquivo: Arquivo, id_lista:number) {
    return this.banco.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from arquivos where caminho_arquivo = ? and id_lista = ?';
      let data = [arquivo.caminho, id_lista];

      return db.executeSql(sql, data)
          .then((data: any) => {
            console.log("numero de rows" + JSON.stringify(data.rows));
            if (data.rows.length == 0) {
              this.insere(arquivo, id_lista)
              .then(() => {
              })
              .catch((e) => console.error(e));
              console.log ("Inserido!!!!")
              return true;
            }else{
              console.log ("Arquivo ja exixte na playlist!!!!")
              return false;
            }
          })
          .catch((e) => console.error(JSON.stringify(e)));
      })
    .catch((e) => console.error(JSON.stringify(e)));
    
  }

  public get(id: number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from arquivos where id_lista = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .then((data: any) => {
 console.log(JSON.stringify(data))
              let arquivos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var arquivo = data.rows.item(i);
                arquivos.push(arquivo);
              }
              console.log(JSON.stringify(arquivos))
              return arquivos;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM arquivos';
       

        return db.executeSql(sql,[])
          .then((data: any) => {
              console.log(sql);
              
              if (data.rows.length > 0) {
                let arquivos: any[] = [];
                for (var i = 0; i < data.rows.length; i++) {
                  var arquivo = data.rows.item(i);
                  arquivos.push(arquivo);
                }
                console.log(JSON.stringify(arquivos))
                return arquivos;
              } else {
                return null;
              }
            })
            .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public insere(arquivo: Arquivo, id_lista){

    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into arquivos (nome_arquivo, caminho_arquivo, id_lista) values (?,?,?)';
        let data = [arquivo.nome, arquivo.caminho, id_lista];
        return db.executeSql(sql, data)
          .catch((e) => console.error('1'+JSON.stringify(e)));
      })
      .catch((e) => console.error('2'+e));
}

public clearPlaylist(id: number) {
  let sql = 'delete from arquivos where id_lista = ?';
  let data = [id];
  return this.banco.getDB()
    .then((db: SQLiteObject) => {
      if(id==0){
      sql = 'delete from arquivos';
      data = null
      
      }
      console.log(sql + data)
  return db.executeSql(sql, data)
    .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
} 



}

export class Arquivo{
  nome: string;
  caminho: string;
}