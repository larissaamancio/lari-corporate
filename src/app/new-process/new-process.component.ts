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
import { Filial, Responsible } from '../new-filial/filial';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProcessService } from '../process.service';
import { ViaCepService } from '../cep.service';

@Component({
  selector: 'app-new-process',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule
  ],
  templateUrl: './new-process.component.html',
  styleUrl: './new-process.component.css'
})
export class NewProcessComponent implements OnInit {
  filiais!: any;
  minDate!: any;

  form: FormGroup = this.formBuilder.group({
    cep:['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]],
    street: [{value: '', disabled: true}, Validators.required],
    city: [{value: '', disabled: true}, Validators.required],
    state: [{value: '', disabled: true}, Validators.required],
    number: [''],
    destiny: [''],
    deadline: [''],
    description: [''],
  });

  constructor(
    private filialService: FilialService,
    private formBuilder: FormBuilder,
    private processService: ProcessService,
    private cepService: ViaCepService,
  ){}

  ngOnInit(): void {
    this.getAllFiliais();
    this.minDate = new Date();
  }

  getAllFiliais(){
    this.filialService.getFiliais().subscribe( filiais => this.filiais = filiais)
  }

  onSubmit() {
    console.log(`jjjjj`);
    this.processService
      .create(this.form.value)
      .subscribe((teste) => console.log(teste));
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

}
