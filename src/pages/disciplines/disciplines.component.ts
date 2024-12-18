import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableListComponent } from '../../components/table-list/table-list.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { Disciplinas } from '../../interface/disciplinas';
import { DisciplinasService } from '../../services/disciplinas.service';
import { CursoService } from '../../services/curso.service';
import { AddDisciplinaComponent } from './add-disciplina/add-disciplina.component';
import { Cursos } from '../../interface/cursos';

@Component({
  selector: 'app-disciplines',
  standalone: true,
  imports: [
    TableListComponent,
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DisciplinasService, CursoService],
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss'
})
export class DisciplinesComponent implements OnInit{
  displayedColumns: string[] = [];
  legends: Array<{value: string; name: string; view: boolean; checkbox: boolean; quantity1: boolean; quantity2: boolean; date: boolean}> = [
    {
      value: 'id',
      name: 'Código',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'nomeDisciplina',
      name: 'Nome da Disciplina',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'cargaHoraria',
      name: 'Carga Horária',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'educador',
      name: 'Educador Responsável',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'curso',
      name: 'Curso Vinculado',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
  ];
  isLoading: boolean = false;
  formFilter!: FormGroup;
  disciplinesList: Disciplinas[] = [];
  coursesList: Cursos[] = [];

  constructor(
    protected dialog: MatDialog,
    private snackBar: MatSnackBar,
    private disciplinasService: DisciplinasService,
    private cursoService: CursoService
  ) {
   
  }

  ngOnInit(): void {
    this.cursoService.listarCursos().subscribe((res: any) => {
      this.coursesList = res;
    }, (error) => {
      this.openSnackBar('Erro ao listar cursos, tente novamente mais tarde.')
    });
    this.displayedColumns = ['id','nomeDisciplina', 'cargaHoraria', 'educador','curso'];
    this.disciplinasService.listarDisciplinas().subscribe((res: any) => {
      res.forEach((item: any) => {
        let cursoId = item.curso;
        let curso = this.coursesList.find((item: any) => item.id === cursoId);
        item.curso = curso?.nomeCurso;
      });
      this.disciplinesList = res;
      
    }, (error) => {
      this.openSnackBar('Erro ao listar disciplinas, tente novamente mais tarde.')
    })
  }

  handleDeleteClick(event: any): void {
    this.isLoading = true;
    this.disciplinasService.excluirDisciplina(event.id).subscribe((item: any) => {
      this.openSnackBar('Disciplina deletada com sucesso!')
      this.isLoading = false;
      window.location.reload();
    },(error) => {
      this.openSnackBar('Erro ao deletar disciplina, tente novamente mais tarde.')
      this.isLoading = false;
    })
  }

  newDiscipline(): void{
    this.dialog.open(AddDisciplinaComponent, {
      data: {
        flag: 'Nova Disciplina',
        title: 'Nova Disciplina'
      }
    })
  }

  editDiscipline(event: any): void {
    this.dialog.open(AddDisciplinaComponent, {
      data: {
        title: 'Editar Disciplina',
        id: event.id
      }
    })
  }

  openSnackBar(content: string): void {
    this.snackBar.open(content, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
