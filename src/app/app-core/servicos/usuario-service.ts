import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface Usuario {
  id?: number;
  nome: string;
  idade: number;
  profissao: string;
  sexo: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends Dexie {
  usuarios: Dexie.Table<Usuario, number>;

  constructor() {
    super('UserDB');
    this.version(1).stores({
      usuarios: '++id, nome, idade, profissao, sexo, email'
    });
    this.usuarios = this.table('usuarios');
  }

  async setUsuario(usuario: Usuario): Promise<number> {
    return await this.usuarios.put(usuario);
  }

  async getUsuario(id: number): Promise<Usuario | undefined> {
    return await this.usuarios.get(id);
  }

}
