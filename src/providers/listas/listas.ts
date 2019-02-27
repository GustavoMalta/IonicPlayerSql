import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancoProvider } from '../banco/banco';

@Injectable()
export class ListasProvider {

  constructor(private banco: BancoProvider) {
    console.log('Hello ListasProvider Provider');
  }

 
 
  public update(product: Product) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update products set name = ?, price = ?, duedate = ?, active = ?, category_id = ? where id = ?';
        let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id, product.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from products where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public clearPlaylist(id: number) {
    let sql = 'delete from arquivo where id_arquivo = ?';
    let data = [id];
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        if(id==0){
        sql = 'delete from arquivo';
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
        let sql = 'UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name = "arquivo"';
        let data = null
      return db.executeSql(sql, data) 
        .catch((e) => console.error(e));
    })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from products where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let product = new Product();
              product.id = item.id;
              product.name = item.name;
              product.price = item.price;
              product.duedate = item.duedate;
              product.active = item.active;
              product.category_id = item.category_id;
 
              return product;
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
        let sql = 'SELECT * from categories';
        var data: [];
        console.log(sql);
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let categorias: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var categoria = data.rows.item(i);
                categorias.push(categoria);
              }
              console.log(categorias)
              return categorias;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error('teste '+ e));
  }


  
}


export class Product {
  id: number;
  name: string;
  price: number;
  duedate: Date;
  active: boolean;
  category_id: number;
}

  
  


