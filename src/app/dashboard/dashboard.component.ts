import { Component, OnInit } from '@angular/core';
import { FilialService } from '../filial.service';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProcessService } from '../process.service';
import { Process } from '../new-filial/filial';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, PanelModule, JsonPipe, CommonModule, ToastModule ],
  providers:[MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  private destroy$ = new Subject<void>();
  filiais!: any;
  processes!: any;

  constructor(
    private filialService: FilialService,
    private router: Router,
    private processService: ProcessService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getFiliais();
    this.getAllProcess();
  }

  getFiliais(){
    this.filialService.getFiliais().subscribe( filiais => this.filiais = filiais)
  }

  newFilial(){
    this.router.navigate(['/new-filial']);
  }

  newProcess(){
    this.router.navigate(['/new-process']);
  }

  getAllProcess(){
    this.processService.getAll().subscribe(processes => this.processes = processes)
  }

  hasAccept(data: any, value: boolean) {
    const body = {...data, accept: value, acceptAt: new Date()}
    console.log(value)

    this.processService.update(body).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: Process) => {
        if(res.accept) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Processo de entrega atualizado para "recebido".'
          })
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atencao',
            detail: 'Processo de entrega atualizado para "nao recebido".'
          })
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Processo de entrega nao atualizado.' + e
        })
      },
    })
  }

  ngOnDestroy(){
    this.destroy$.next();
  }
}
