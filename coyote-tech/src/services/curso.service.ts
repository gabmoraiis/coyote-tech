import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from '../interface/cursos';

interface Curso {
  id?: number;
  nomeCurso: string;
  modulo: string;
  disciplina: string;
  cargaHoraria: number;
}

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  private apiUrl = 'http://localhost:3000/cursos';

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
