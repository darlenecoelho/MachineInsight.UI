import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/machines/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'manage',
    loadComponent: () =>
      import('./features/machines/manage/manage-machines.component')
        .then(m => m.ManageMachinesComponent)
  },

  {
    path: 'machines/new',
    loadComponent: () =>
      import('./features/machines/create/create-machine-dialog.component')
        .then(m => m.CreateMachineDialogComponent)
  },
  {
    path: 'machines/:id',
    loadComponent: () =>
      import('./features/machines/details/details.component')
        .then(m => m.DetailsComponent)
  },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
