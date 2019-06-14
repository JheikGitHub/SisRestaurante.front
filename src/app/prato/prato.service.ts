import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prato } from './Prato';

const URL_API: string = 'https://localhost:44337/api/prato/';

@Injectable({
  providedIn: 'root'
})
export class PratoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Prato[]>(URL_API + "getall");
  }

  getOne(id: number) {
    return this.http.get<Prato>(URL_API + "getone/" + id);
  }

  create(prato: Prato) {
    return this.http.post(URL_API + "create", prato);
  }

  update(id: number, prato: Prato) {

    return this.http.put(URL_API + "update/" + id, prato );
  }

  delete(id: number) {
    return this.http.delete(URL_API + "delete/" + id);
  }
}
