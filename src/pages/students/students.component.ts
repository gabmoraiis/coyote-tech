import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableListComponent } from '../../components/table-list/table-list.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { Alunos } from '../../interface/alunos';
import { AddAlunoComponent } from './add-aluno/add-aluno.component';
import { AlunosService } from '../../services/alunos.service';
import { CursoService } from '../../services/curso.service';
import { Cursos } from '../../interface/cursos';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    TableListComponent,
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    HttpClientModule,
    AddAlunoComponent
  ],
    providers: [AlunosService, CursoService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
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
      value: 'nome',
      name: 'Nome do Aluno',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'cpf',
      name: 'CPF',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'email',
      name: 'E-mail',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'tipoPagamento',
      name: 'Tipo',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'endereco',
      name: 'Endereço',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'telefone',
      name: 'Telefone',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'nascimento',
      name: 'Data de Nascimento',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'curso',
      name: 'Curso',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'faltas',
      name: 'Número de Faltas',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
  ];
  isLoading: boolean = false;
  formFilter!: FormGroup;
  studentsList: Alunos[] = []
  coursesList: Cursos[] = [];

  constructor(
    protected dialog: MatDialog,
    private snackBar: MatSnackBar,
    private studentsService: AlunosService,
    private cursoService: CursoService
  ) {
   
  }

  ngOnInit(): void {
    this.displayedColumns = ['nome', 'tipoPagamento', 'endereco', 'cpf', 'telefone', 'nascimento', 'curso', 'faltas', 'email'];
    this.cursoService.listarCursos().subscribe((res: any) => {
      this.coursesList = res;
    }, (error) => {
      this.openSnackBar('Erro ao listar cursos, tente novamente mais tarde.')
    });
    this.studentsService.listarAlunos().subscribe((res: any) => {
      res.forEach((item: any) => {
        item.nascimento = this.formatDate(item.nascimento);
      })
      this.studentsList = res;
    }, (error) => {
      this.openSnackBar('Erro ao listar alunos, tente novamente mais tarde.')
    })
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  handleDeleteClick(event: any): void {
    this.isLoading = true;
    this.studentsService.excluirAluno(event.id).subscribe((item: any) => {
      this.openSnackBar('Registro de aluno deletado com sucesso!')
      this.isLoading = false;
      window.location.reload();
    },(error) => {
      this.openSnackBar('Erro ao deletar registro de aluno, tente novamente mais tarde.')
      this.isLoading = false;
    })
  }

  newStudent(): void{
    this.dialog.open(AddAlunoComponent, {
      data: {
        flag: 'Novo Aluno',
        title: 'Novo Aluno'
      }
    })
  }

  editStudent(event: any): void {
    this.dialog.open(AddAlunoComponent, {
      data: {
        title: 'Editar Aluno',
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
