import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disciplinas } from '../interface/disciplinas';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  private apiUrl = 'https://coyote-tech-df152a901520.herokuapp.com/disciplinas';

  constructor(private http: HttpClient) { }

  listarDisciplinas(id?: number): Observable<Disciplinas[]> {
    if (id) {
      return this.http.get<Disciplinas[]>(`${this.apiUrl}/${id}`);
    } else {
      return this.http.get<Disciplinas[]>(this.apiUrl);
    }
  }

  cadastrarDisciplina(disciplina: Disciplinas): Observable<Disciplinas> {
    return this.http.post<Disciplinas>(this.apiUrl, disciplina);
  }

  editarDisciplina(id: number, disciplina: Disciplinas): Observable<Disciplinas> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Disciplinas>(url, disciplina);
  }

  excluirDisciplina(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
