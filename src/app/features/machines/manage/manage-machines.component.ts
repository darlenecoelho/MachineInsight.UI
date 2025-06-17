import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule }                from '@angular/common';
import { MatButtonModule }             from '@angular/material/button';
import { MatDialog, MatDialogModule }  from '@angular/material/dialog';
import { MatFormFieldModule }       from '@angular/material/form-field';    // ←
import { MatSelectModule }          from '@angular/material/select';
import { MatSortModule, MatSort }      from '@angular/material/sort';
import { MachineTelemetryService }     from '../../../core/infrastructure/services/machine-telemetry.service';
import { MachineDto }               from '../../../core/infrastructure/dtos/machine.dto';
import { CreateMachineDialogComponent } from '../create/create-machine-dialog.component';
import { MatIconModule }               from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule }           from '@angular/material/card';
import { Router }                      from '@angular/router';
import { EditMachineDialogComponent } from '../edit/edit-machine-dialog.component';
import { MachineStatus }                       from '../../../core/domain/enums/machine-status';

@Component({
  standalone: true,
  selector: 'app-manage-machines',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,   
    MatSelectModule, 
    EditMachineDialogComponent     
  ],
  templateUrl: './manage-machines.component.html',
  styleUrls: ['./manage-machines.component.scss']
})
export class ManageMachinesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['name','latitude','longitude','status','createdAt','actions'];
  dataSource = new MatTableDataSource<MachineDto>();  
  public MachineStatus = MachineStatus;
  

  public statusList = [
      { value: null, label: 'Todos' },
      { value: MachineStatus.Operating,   label: 'Operating'   },
      { value: MachineStatus.Maintenance, label: 'Maintenance' },
      { value: MachineStatus.Shutdown,    label: 'Shutdown'    },
      { value: MachineStatus.Idle,        label: 'Idle'        },
      { value: MachineStatus.Fault,       label: 'Fault'       },
    ];
  constructor(
    private telemetryService: MachineTelemetryService,
    private dialog: MatDialog,
    private router: Router 
  ) {}

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter === '' || filter == null) return true;
      return data.status === Number(filter);
    };
    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private load() {
    this.telemetryService
      .listMachines()
      .subscribe(list => this.dataSource.data = list);
  }

  applyStatusFilter(value: string|null) {
    this.dataSource.filter = value ?? '';
  }

  openCreateDialog() {
    const ref = this.dialog.open(CreateMachineDialogComponent, {
      width: '500px'
    });
    ref.afterClosed().subscribe(saved => {
      if (saved) this.load();
    });
  }

   openEditDialog(machine: MachineDto) {
  const ref = this.dialog.open(
    EditMachineDialogComponent,
    {
      width: '500px',
      data: { id: machine.id } 
    }
  );
  ref.afterClosed().subscribe(saved => {
    if (saved === 'saved') this.load();
  });
}

edit(id: string) {
    const ref = this.dialog.open(EditMachineDialogComponent, {
      width: '500px',
      data: { id }
    });
    ref.afterClosed().subscribe(saved => {
      if (saved === 'saved') this.load();
    });
  }
}