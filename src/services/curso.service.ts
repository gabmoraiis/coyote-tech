import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from '../interface/cursos';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  private apiUrl = 'https://coyote-tech-df152a901520.herokuapp.com/cursos';

  constructor(private http: HttpClient) { }

  listarCursos(id?: number): Observable<Cursos[]> {
    if (id) {
      return this.http.get<Cursos[]>(`${this.apiUrl}/${id}`);
    } else {
      return this.http.get<Cursos[]>(this.apiUrl);
    }
  }

  cadastrarCurso(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.apiUrl, curso);
  }

  editarCurso(id: number, curso: Cursos): Observable<Cursos> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Cursos>(url, curso);
  }

  excluirCurso(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
