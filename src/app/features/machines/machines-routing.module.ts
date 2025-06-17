import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'manage',
    loadComponent: () =>
      import('./manage/manage-machines.component')
        .then(m => m.ManageMachinesComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./details/details.component')
        .then(m => m.DetailsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule {}
