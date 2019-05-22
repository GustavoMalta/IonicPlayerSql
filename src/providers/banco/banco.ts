import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class BancoProvider {

  constructor(private sqlite: SQLite){
    console.log('Hello BancoProvider Provider');
  }
   /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'database.db',
      location: 'default'
    });
  }
 
  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db); 
      })
      .catch(e => console.log(e));
  }
 
  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([ //inclui em lote
      ['CREATE TABLE IF NOT EXISTS listas (id_lista integer primary key AUTOINCREMENT NOT NULL, nome_lista TEXT)'],
      ['CREATE TABLE IF NOT EXISTS arquivos (id_arquivo integer primary key AUTOINCREMENT NOT NULL, nome_arquivo TEXT, caminho_arquivo TEXT, id_lista integer, FOREIGN KEY(id_lista) REFERENCES listas(id_lista))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', JSON.stringify(e)));
  }
 
}
