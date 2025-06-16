import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent }      from './form/form.component';
import { DetailsComponent }   from './details/details.component';

const routes: Routes = [
  { path: '',      component: DashboardComponent },
  { path: 'new',   component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
  { path: ':id',   component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule {}
