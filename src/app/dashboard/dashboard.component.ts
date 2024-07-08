import { Component, OnInit } from '@angular/core';
import { FilialService } from '../filial.service';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, AccordionModule, JsonPipe ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  filiais!: any;

  constructor(private filialService: FilialService, private router: Router) {}

  ngOnInit(): void {
    this.getFiliais()
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

}
