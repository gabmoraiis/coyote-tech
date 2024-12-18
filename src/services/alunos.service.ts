import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alunos } from '../interface/alunos';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private apiUrl = 'https://coyote-tech-df152a901520.herokuapp.com/alunos';

  constructor(private http: HttpClient) { }

  listarAlunos(id?: number): Observable<Alunos[]> {
    if (id) {
      return this.http.get<Alunos[]>(`${this.apiUrl}/${id}`);
    } else {
      return this.http.get<Alunos[]>(this.apiUrl);
    }
  }

  cadastrarAluno(aluno: Alunos): Observable<Alunos> {
    return this.http.post<Alunos>(this.apiUrl, aluno);
  }

  editarAluno(id: number, aluno: Alunos): Observable<Alunos> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Alunos>(url, aluno);
  }

  excluirAluno(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
