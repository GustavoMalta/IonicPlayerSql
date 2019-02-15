import { Injectable } from '@angular/core';
import { BancoProvider } from '../banco/banco';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ArquivosProvider {

  constructor(public banco: BancoProvider) {
    console.log('Hello ArquivosProvider Provider');
  }

  public insert(arquivo: Arquivo) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into arquivo (nome_arquivo, caminho_arquivo) values (?,?)';
        let data = [arquivo.nome, arquivo.caminho];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error('1'+JSON.stringify(e)));
      })
      .catch((e) => console.error('2'+e));
  }

  public getAll() {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM arquivo';
       

        return db.executeSql(sql,[])
          .then((data: any) => {
              console.log('123'+sql);
              
              if (data.rows.length > 0) {
                
                let categorias: any[] = [];
                for (var i = 0; i < data.rows.length; i++) {
                  var categoria = data.rows.item(i);
                  categorias.push(categoria);
                }
                console.log(JSON.stringify(categorias))
                return categorias;
              } else {
                return [];
              }
            })
            .catch((e) => console.error(e));
      })
      .catch((e) => console.error('2'+e));
  }
}

export class Arquivo{
  nome: string;
  caminho: string;
}
