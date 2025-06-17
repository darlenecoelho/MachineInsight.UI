import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachinesRoutingModule } from './machines-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  imports: [
    CommonModule,
    MachinesRoutingModule,
    DashboardComponent,
    DetailsComponent,
  ]
})
export class MachinesModule { }