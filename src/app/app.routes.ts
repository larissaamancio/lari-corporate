import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewFilialComponent } from './new-filial/new-filial.component';
import { NewProcessComponent } from './new-process/new-process.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'new-filial',
    component: NewFilialComponent
  },
  {
    path: 'new-process',
    component: NewProcessComponent
  }
];
