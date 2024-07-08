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
import { Responsible } from './filial';

@Component({
  selector: 'app-new-filial',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DropdownModule, InputTextModule],
  templateUrl: './new-filial.component.html',
  styleUrl: './new-filial.component.css',
})

export class NewFilialComponent implements OnInit{
  responsibles: Responsible[] | undefined;

  form: FormGroup = this.formBuilder.group({
    code:[''],
    name: ['', Validators.required],
    street: [''],
    city: [''],
    number: [''],
    state: [''],
    zipcode: [''],
    responsible: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private filialService: FilialService
  ) {}

  ngOnInit(): void {
    this.responsibles = [
      { name: 'Jeremias', id: 'd7ewfyu' },
      { name: 'Marcia', id: 'fer3frw' },
      { name: 'Rafael', id: 'f43tfr3g' },
      { name: 'Akira', id: '43grtg' },
      { name: 'Emily', id: 'r3gfr' }
  ];
  }

  onSubmit() {
    console.log(`jjjjj`);
    this.filialService
      .create(this.form.value)
      .subscribe((teste) => console.log(teste));
  }
}
