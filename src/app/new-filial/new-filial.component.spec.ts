import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { NewFilialComponent } from './new-filial.component';
import { FilialService } from '../filial.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subject, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('NewFilialComponent', () => {
  let component: NewFilialComponent;
  let fixture: ComponentFixture<NewFilialComponent>;
  let filialServiceStub: Partial<FilialService>;
  let messageService: MessageService;

  beforeEach(async () => {
    filialServiceStub = {
      getFiliais: () => of([]),
      create: () => of({ name: 'Nova Filial', code: '123' }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        ToastModule,
        HttpClientModule,
      ],
      providers: [
        FormBuilder,
        { provide: FilialService, useValue: filialServiceStub },
        MessageService,
        HttpClient,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFilialComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['code']).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['street']).toBeDefined();
    expect(component.form.controls['city']).toBeDefined();
    expect(component.form.controls['number']).toBeDefined();
    expect(component.form.controls['state']).toBeDefined();
    expect(component.form.controls['zipcode']).toBeDefined();
    expect(component.form.controls['responsible']).toBeDefined();
  });

  it('should load responsibles on initialization', () => {
    expect(component.responsibles).toBeDefined();
    expect(component.responsibles.length).toBeGreaterThan(0);
  });

  it('should get filiais on initialization', () => {
    expect(component.filiais).toBeDefined();
    expect(component.filiais.length).toEqual(0);
  });
});