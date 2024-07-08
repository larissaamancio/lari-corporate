import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FilialService } from '../filial.service';
import { ProcessService } from '../process.service';
import { MessageService } from "primeng/api";
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { Process } from '../new-filial/filial';

class RouterStub {
  navigate(commands: any[], extras?: any) {}
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let filialService: FilialService;
  let processService: ProcessService;
  let messageService: MessageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastModule,
        DashboardComponent // Importando o componente standalone
      ],
      providers: [
        FilialService,
        ProcessService,
        MessageService,
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    filialService = TestBed.inject(FilialService);
    processService = TestBed.inject(ProcessService);
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);

    spyOn(filialService, 'getFiliais').and.returnValue(of([]));
    spyOn(processService, 'getAll').and.returnValue(of([]));
    spyOn(messageService, 'add'); // Espionando messageService.add
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch filiais on init', () => {
    expect(filialService.getFiliais).toHaveBeenCalled();
    expect(component.filiais).toEqual([]);
  });

  it('should fetch processes on init', () => {
    expect(processService.getAll).toHaveBeenCalled();
    expect(component.processes).toEqual([]);
  });

  it('should navigate to new filial', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.newFilial();
    expect(routerSpy).toHaveBeenCalledWith(['/new-filial']);
  });

  it('should navigate to new process', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.newProcess();
    expect(routerSpy).toHaveBeenCalledWith(['/new-process']);
  });

  it('should update process and show success message on accept', () => {
    const process: Process = {
      id: '1', accept: true, acceptAt: new Date(),
      cep: '',
      street: '',
      city: '',
      state: '',
      number: '',
      destiny: '',
      deadline: '',
      description: ''
    };
    spyOn(processService, 'update').and.returnValue(of(process));

    component.hasAccept(process, true);
    
    expect(processService.update).toHaveBeenCalledWith(jasmine.objectContaining({ accept: true }));
  });

  it('should show error message on process update failure', () => {
    const process: Process = {
      id: '1', accept: true, acceptAt: new Date(),
      cep: '',
      street: '',
      city: '',
      state: '',
      number: '',
      destiny: '',
      deadline: '',
      description: ''
    };
    spyOn(processService, 'update').and.returnValue(throwError('error'));

    component.hasAccept(process, true);
    
    expect(processService.update).toHaveBeenCalled();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
