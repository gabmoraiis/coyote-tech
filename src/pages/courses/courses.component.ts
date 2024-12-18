
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableListComponent } from '../../components/table-list/table-list.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Cursos } from '../../interface/cursos';
import { AddCursoComponent } from './add-curso/add-curso.component';
import { CursoService } from '../../services/curso.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    TableListComponent,
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CursoService],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

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
      value: 'nomeCurso',
      name: 'Nome do Curso',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'modulo',
      name: 'Módulo',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'turno',
      name: 'Turno',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'cargaHoraria',
      name: 'Carga-horária',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
  ];
  isLoading: boolean = false;
  formFilter!: FormGroup;
  coursesList: Cursos[] = []

  constructor(
    protected dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService
  ) {
   
  }

  ngOnInit(): void {
    this.displayedColumns = ['id','nomeCurso', 'modulo', 'turno', 'cargaHoraria'];
    this.cursoService.listarCursos().subscribe((res: any) => {
      this.coursesList = res;
    }, (error) => {
      this.openSnackBar('Erro ao listar cursos, tente novamente mais tarde.')
    });
  }

  handleDeleteClick(event: any): void {
    this.isLoading = true;
    this.cursoService.excluirCurso(event.id).subscribe((item: any) => {
      this.openSnackBar('Curso deletado com sucesso!')
      this.isLoading = false;
      window.location.reload();
    },(error) => {
      this.openSnackBar('Erro ao deletar curso, tente novamente mais tarde.')
      this.isLoading = false;
    })
  }

  newCourse(): void{
    this.dialog.open(AddCursoComponent, {
      data: {
        flag: 'Novo Curso',
        title: 'Novo Curso'
      }
    })
  }

  editCourse(event: any): void {
    this.dialog.open(AddCursoComponent, {
      data: {
        title: 'Editar Curso',
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
