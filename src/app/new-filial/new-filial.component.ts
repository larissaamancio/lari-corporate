import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { FilialService } from "../filial.service";
import { Filial, Responsible } from "./filial";
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-new-filial",
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DropdownModule, InputTextModule, ToastModule],
  providers:[MessageService],
  templateUrl: "./new-filial.component.html",
  styleUrl: "./new-filial.component.css",
})
export class NewFilialComponent implements OnInit {
  private destroy$ = new Subject<void>();
  responsibles!: Responsible[];
  filiais: any;

  form: FormGroup = this.formBuilder.group({
    code: ["", Validators.required],
    name: ["", Validators.required],
    street: ["", Validators.required],
    city: ["", Validators.required],
    number: ["", Validators.required],
    state: ["", Validators.required],
    zipcode: ["", Validators.required],
    responsible: ["", Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private filialService: FilialService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllFiliais();
    this.responsibles = [
      { name: "Jeremias", id: "d7ewfyu" },
      { name: "Marcia", id: "fer3frw" },
      { name: "Rafael", id: "f43tfr3g" },
      { name: "Akira", id: "43grtg" },
      { name: "Emily", id: "r3gfr" },
    ];
  }

  getAllFiliais() {
    this.filialService.getFiliais().pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.filiais = data;
    });
  }

  onSubmit() {
    const code = this.form.value.code;
    const codeExists = this.filiais.some((filial: any) => filial.code === code);

    if (codeExists) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Código de filial ja existe na base de dados' });
    } else {

    this.filialService.create(this.form.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: Filial) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Filial ' + res.name + ' cadastrada com sucesso.'
        })
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'Filial nao cadastrada.' + e
        })
      },
    });
  }
}

  ngOnDestroy(){
    this.destroy$.next();
  }
}
