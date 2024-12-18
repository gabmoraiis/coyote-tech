import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisciplinaComponent } from './add-disciplina.component';

describe('AddDisciplinaComponent', () => {
  let component: AddDisciplinaComponent;
  let fixture: ComponentFixture<AddDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDisciplinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
