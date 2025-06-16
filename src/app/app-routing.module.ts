// src/app/app-routing.module.ts
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // raiz → redireciona para /dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Dashboard em /dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/machines/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  // Mantém as rotas antigas de CRUD apontando pra Dashboard (temporário)
  { path: 'machines', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'machines/new', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'machines/edit/:id', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'machines/:id', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
