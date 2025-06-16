import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachinesRoutingModule } from './machines-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  imports: [
    CommonModule,
    MachinesRoutingModule,

    // → importe seus componentes standalone aqui
    DashboardComponent,
    FormComponent,
    DetailsComponent,
  ]
})
export class MachinesModule { }