import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarListadoComponent } from './exportar-listado.component';

describe('ExportarListadoComponent', () => {
  let component: ExportarListadoComponent;
  let fixture: ComponentFixture<ExportarListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportarListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
