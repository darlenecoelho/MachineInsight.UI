import { Component, OnInit } from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule }                      from '@angular/material/card';
import { MatButtonModule }                    from '@angular/material/button';
import { MachineCrudService }                 from '../../../core/infrastructure/services/machine-manage.service';
import { MachineDto }                      from '../../../core/infrastructure/dtos/machine.dto';
import { MachineStatus }                      from '../../../core/domain/enums/machine-status';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  machine?: MachineDto;
  statusEnum = MachineStatus;

  constructor(
    private crud: MachineCrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.crud.getById(id).subscribe(m => this.machine = m);
    }
  }

  goEdit(): void {
    if (this.machine) {
      this.router.navigate(['/machines/edit', this.machine.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/manage']);
  }

  delete(): void {
    if (!this.machine) return;
    if (confirm('Confirma exclusão?')) {
      this.crud.delete(this.machine.id)
        .subscribe(() => this.router.navigate(['/manage']));
    }
  }
}