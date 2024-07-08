import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NewProcessComponent } from './new-process.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { ViaCepService } from '../cep.service';
import { ProcessService } from '../process.service';
import { FilialService } from '../filial.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewProcessComponent', () => {
  let component: NewProcessComponent;
  let fixture: ComponentFixture<NewProcessComponent>;
  let viaCepService: jasmine.SpyObj<ViaCepService>;
  let processService: jasmine.SpyObj<ProcessService>;
  let filialService: jasmine.SpyObj<FilialService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const viaCepSpy = jasmine.createSpyObj('ViaCepService', ['getAddressByCep']);
    const processSpy = jasmine.createSpyObj('ProcessService', ['create']);
    const filialSpy = jasmine.createSpyObj('FilialService', ['getFiliais']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        InputTextareaModule,
        ToastModule,
        HttpClientModule
      ],
      providers: [
        { provide: ViaCepService, useValue: viaCepSpy },
        { provide: ProcessService, useValue: processSpy },
        { provide: FilialService, useValue: filialSpy },
        { provide: MessageService, useValue: messageSpy },
        FormBuilder
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProcessComponent);
    component = fixture.componentInstance;
    viaCepService = TestBed.inject(ViaCepService) as jasmine.SpyObj<ViaCepService>;
    processService = TestBed.inject(ProcessService) as jasmine.SpyObj<ProcessService>;
    filialService = TestBed.inject(FilialService) as jasmine.SpyObj<FilialService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['cep'].setValue('12345-678');
    component.form.controls['street'].setValue('Rua Teste');
    component.form.controls['city'].setValue('Cidade Teste');
    component.form.controls['state'].setValue('ST');
    component.form.controls['number'].setValue('123');
    component.form.controls['destiny'].setValue('Destino Teste');
    component.form.controls['deadline'].setValue(new Date());
    component.form.controls['description'].setValue('Descrição do teste');
    component.form.controls['createdAt'].setValue(new Date());
    expect(component.form.valid).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
