import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancoProvider } from '../banco/banco';
import { ArquivosProvider } from '../arquivos/arquivos'

@Injectable()
export class ListasProvider {

  constructor(private banco: BancoProvider, private arquivos:ArquivosProvider) {
    console.log('Hello ListasProvider Provider');
  }

 public id_lista_atual : number
 public nome_lista_atual : string

  public insert(nome: string) {

    return this.banco.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from listas where nome_lista = ? ';
      let data = [nome];

      return db.executeSql(sql, data)
          .then((data: any) => {
            console.log("numero de rows" + JSON.stringify(data.rows));
            if (data.rows.length == 0) {
              this.insere(nome)
              .then(() => {
              })
              .catch((e) => console.error(e));
              console.log ("Inserido!!!!")
              return true;
            }else{
              console.log ("ja exixte playlist com esse nome!!!!")
              return false;
            }
          })
          .catch((e) => console.error(JSON.stringify(e)));
      })
    .catch((e) => console.error(JSON.stringify(e)));

  }

  public update(lista: Lista) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update listas set nome_lista = ?';
        let data = [lista.nome_lista];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from listas where id_lista = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public clearPlaylist(id: number) {
    let sql = 'delete from listas where id_lista = ?';
    let data = [id];
    this.arquivos.clearPlaylist(id)
    this.nome_lista_atual='';
    this.id_lista_atual=0;
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        this.nome_lista_atual='';
        this.id_lista_atual=0;
        if(id==0){
        sql = 'delete from listas';
        data = null
        this.resetSequence();
        }
        console.log(sql)
    return db.executeSql(sql, data)
      .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  } 

  private resetSequence(){
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name = "listas" or name = "arquivos"';
        let data = null
      return db.executeSql(sql, data) 
        .catch((e) => console.error(e));
    })
      .catch((e) => console.error(e));
  }
  
  public insere(nome: string){

      return this.banco.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'insert into listas (nome_lista) values (?)';
          let data = [nome];
          return db.executeSql(sql, data)
            .catch((e) => console.error('1'+JSON.stringify(e)));
        })
        .catch((e) => console.error('2'+e));
  }

  public get(id: number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from listas where id_lista = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let lista = new Lista();
              lista.id_lista = item.id_lista;
              lista.nome_lista = item.nome_lista;
 
              return lista;
            }
             return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll() {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from listas';
 
        return db.executeSql(sql, [])
          .then((data: any) => {
            console.log(sql);
            if (data.rows.length > 0) {
              let listas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var lista = data.rows.item(i);
                listas.push(lista);
              }
              return listas;
            } else {
              return null;
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  
}


export class Lista {
  id_lista: number;
  nome_lista: string;
}

  
  


