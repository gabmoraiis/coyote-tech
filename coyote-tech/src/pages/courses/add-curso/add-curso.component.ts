import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CursoService } from '../../../services/curso.service';
import { Cursos } from '../../../interface/cursos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-add-curso',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    HttpClientModule
  ],
  providers: [CursoService],
  templateUrl: './add-curso.component.html',
  styleUrl: './add-curso.component.scss'
})
export class AddCursoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private cursoService: CursoService,
    private snackBar: MatSnackBar
  ) {}

  isLoading: boolean = false;
  body?: Cursos ;
  formCurso = this.fb.group({
    nomeCurso: ['', Validators.required],
    modulo: ['', Validators.required],
    disciplinas: ['', Validators.required],
    cargaHoraria: ['', Validators.required],
  });

  ngOnInit(): void {
   if(this.data.title === 'Editar Curso'){
    this.isLoading = true;
    this.cursoService.listarCursos(this.data.id).subscribe((response: any) => {
      this.formCurso.get('nomeCurso')?.setValue(response.nomeCurso);
      this.formCurso.get('modulo')?.setValue(response.modulo);
      this.formCurso.get('disciplinas')?.setValue(response.disciplinas);
      this.formCurso.get('cargaHoraria')?.setValue(response.cargaHoraria);
      this.isLoading = false;
    }, (error) => {
      this.snackBar.open('Erro carregar informações do curso, tente novamente mais tarde.')
      this.isLoading = false;
    });
   } 
  }

  handleClickBack() {
    this.dialog.closeAll();
  }

  submitForm(): void {
    if(this.data.title === 'Novo Curso'){
      if(this.formCurso.valid){
        if(this.formCurso.valid){
          this.body = {
            nomeCurso: this.formCurso.get('nomeCurso')?.value!,
            modulo: this.formCurso.get('modulo')?.value!,
            disciplinas: this.formCurso.get('disciplinas')?.value!,
            cargaHoraria: this.formCurso.get('cargaHoraria')?.value!
          }
          this.isLoading = true;
          this.cursoService.cadastrarCurso(this.body!).subscribe((response: any) => {
            this.isLoading = false;
            this.snackBar.open('Curso salvo com sucesso!');
            this.dialog.closeAll();
            window.location.reload();
          }, (error) => {
            this.snackBar.open('Erro ao salvar curso, tente novamente mais tarde.')
            this.isLoading = false;
          })
        } else {
          this.formCurso.markAllAsTouched();
        }
      } else {
        this.formCurso.markAllAsTouched();
      }
    } else if(this.data.title === 'Editar Curso'){
      if(this.formCurso.valid){
        this.body = {
          nomeCurso: this.formCurso.get('nomeCurso')?.value!,
          modulo: this.formCurso.get('modulo')?.value!,
          disciplinas: this.formCurso.get('disciplinas')?.value!,
          cargaHoraria: this.formCurso.get('cargaHoraria')?.value!
        }
        this.isLoading = true;
        this.cursoService.editarCurso(this.data.id, this.body!).subscribe((response: any) => {
          this.isLoading = false;
          this.snackBar.open('Curso editado com sucesso!');
          this.dialog.closeAll();
          window.location.reload();
        }, (error) => {
          this.snackBar.open('Erro ao editar curso, tente novamente mais tarde.')
          this.isLoading = false;
        })
      } else {
        this.formCurso.markAllAsTouched();
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
