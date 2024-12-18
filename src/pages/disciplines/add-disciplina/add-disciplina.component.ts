import { Disciplinas } from './../../../interface/disciplinas';
import { DisciplinasService } from './../../../services/disciplinas.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { Cursos } from '../../../interface/cursos';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-add-disciplina',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    HttpClientModule
  ],
  providers: [DisciplinasService, CursoService],
  templateUrl: './add-disciplina.component.html',
  styleUrl: './add-disciplina.component.scss'
})
export class AddDisciplinaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private disciplinasService: DisciplinasService,
    private snackBar: MatSnackBar,
    private cursoService: CursoService
  ) {}

  isLoading: boolean = false;
  body?: Disciplinas;
  coursesList: Cursos[] = []
  formDisciplinas = this.fb.group({
    nomeDisciplina: ['', Validators.required],
    cargaHoraria: [null, Validators.required],
    educador: ['', Validators.required],
    curso: ['', Validators.required],
  });

  ngOnInit(): void {
    this.cursoService.listarCursos().subscribe((res: any) => {
      this.coursesList = res;
    }, (error) => {
      this.openSnackBar('Erro ao listar cursos, tente novamente mais tarde.')
    })
    if(this.data.title === 'Editar Disciplina'){
     this.isLoading = true;
     this.disciplinasService.listarDisciplinas(this.data.id).subscribe((response: any) => {
       this.formDisciplinas.get('nomeDisciplina')?.setValue(response[0].nomeDisciplina);
       this.formDisciplinas.get('cargaHoraria')?.setValue(response[0].cargaHoraria);
       this.formDisciplinas.get('educador')?.setValue(response[0].educador);
       this.formDisciplinas.get('curso')?.setValue(response[0].curso);
       this.isLoading = false;
     }, (error) => {
       this.snackBar.open('Erro carregar informações da disciplina, tente novamente mais tarde.')
       this.isLoading = false;
     });
    } 
   }
 
   handleClickBack() {
     this.dialog.closeAll();
   }
 
  submitForm(): void {
    if (this.data.title === 'Nova Disciplina') {
      if (this.formDisciplinas.valid) {
        this.body = {
          nomeDisciplina: this.formDisciplinas.get('nomeDisciplina')?.value!,
          cargaHoraria: this.formDisciplinas.get('cargaHoraria')?.value!,
          educador: this.formDisciplinas.get('educador')?.value!,
          curso: this.formDisciplinas.get('curso')?.value!
        }
        this.isLoading = true;
        this.disciplinasService.cadastrarDisciplina(this.body!).subscribe((response: any) => {
          this.isLoading = false;
          this.snackBar.open('Disciplina salva com sucesso!');
          this.dialog.closeAll();
        }, (error) => {
          this.snackBar.open('Erro ao salvar disciplina, tente novamente mais tarde.')
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          window.location.reload();
        })
      } else {
        this.formDisciplinas.markAllAsTouched();
      }
     } else if(this.data.title === 'Editar Disciplina'){
       if(this.formDisciplinas.valid){
        let nomeCurso = this.formDisciplinas.get('curso')?.value!
         this.body = {
           nomeDisciplina: this.formDisciplinas.get('nomeDisciplina')?.value!,
           cargaHoraria: this.formDisciplinas.get('cargaHoraria')?.value!,
           educador: this.formDisciplinas.get('educador')?.value!,
           curso: this.formDisciplinas.get('curso')?.value!
         }
         this.isLoading = true;
         this.disciplinasService.editarDisciplina(this.data.id, this.body!).subscribe((response: any) => {
           this.isLoading = false;
           this.snackBar.open('Disciplina editada com sucesso!');
           this.dialog.closeAll();   
         }, (error) => {
           this.snackBar.open('Erro ao editar disciplina, tente novamente mais tarde.')
           this.isLoading = false;
         }, () => {
           this.isLoading = false;
           window.location.reload();
         })
       } else {
         this.formDisciplinas.markAllAsTouched();
       }
     }
   }
   
   openSnackBar(content: string): void {
     this.snackBar.open(content, 'Fechar', {
       horizontalPosition: 'center',
       verticalPosition: 'top'
     });
   }
}
