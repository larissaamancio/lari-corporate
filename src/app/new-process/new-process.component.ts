import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FilialService } from '../filial.service';
import { Filial, Process, Responsible } from '../new-filial/filial';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProcessService } from '../process.service';
import { ViaCepService } from '../cep.service';
import { MessageService } from "primeng/api";
import { Subject, takeUntil } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-new-process',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    ToastModule
  ],
  providers:[MessageService, ViaCepService],
  templateUrl: './new-process.component.html',
  styleUrl: './new-process.component.css'
})
export class NewProcessComponent implements OnInit {
  private destroy$ = new Subject<void>();
  filiais!: any;
  minDate!: any;

  form: FormGroup = this.formBuilder.group({
    cep:['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]],
    street: [{value: '', disabled: true}, Validators.required],
    city: [{value: '', disabled: true}, Validators.required],
    state: [{value: '', disabled: true}, Validators.required],
    number: ['', Validators.required],
    destiny: ['', Validators.required],
    deadline: ['', Validators.required],
    description: ['', Validators.required],
    createdAt: [new Date(), Validators.required],
    accept: [''],
    acceptAt: ['']
  });

  constructor(
    private filialService: FilialService,
    private formBuilder: FormBuilder,
    private processService: ProcessService,
    private cepService: ViaCepService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllFiliais();
    this.minDate = new Date();
  }

  getAllFiliais(){
    this.filialService.getFiliais().subscribe( filiais => this.filiais = filiais)
  }

  onSubmit() {
    this.processService
      .create(this.form.value).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Process) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Processo de entrega cadastrado com sucesso.'
          })
        },
        error: (e) => {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: 'Processo de entrega nao cadastrado.' + e
          })
        },
      });
  }

  fetchAddress() {
    const cep = this.form.get('cep')?.value;
    if (cep && cep.length === 9) { // CEP brasileiro no formato 12345-678
      this.cepService.getAddressByCep(cep).subscribe(data => {
        if (data) {
          this.form.patchValue({
            street: data.logradouro,
            city: data.localidade,
            state: data.uf
          });
        }
      });
    }
  }

  ngOnDestroy(){
    this.destroy$.next();
  }

}
