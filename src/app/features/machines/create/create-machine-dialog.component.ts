import { Component }                     from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule }            from '@angular/material/form-field';
import { MatInputModule }                from '@angular/material/input';
import { MatButtonModule }               from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MachineCrudService }            from '../../../core/infrastructure/services/machine-manage.service';
import { CreateMachineDto }              from '../../../core/infrastructure/dtos/create-machine.dto';
import { CommonModule }          from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-create-machine-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './create-machine-dialog.component.html',
  styleUrls: ['./create-machine-dialog.component.scss']
})
export class CreateMachineDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,                   
    private crud: MachineCrudService,
    public dialogRef: MatDialogRef<CreateMachineDialogComponent>
  ) {
    this.form = this.fb.group({
      name:      ['', Validators.required],
      latitude:  [0, Validators.required],
      longitude: [0, Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: CreateMachineDto = this.form.value;
    this.crud.create(dto).subscribe({
      next: () => this.dialogRef.close('saved'),
      error: e => console.error('Erro ao criar máquina', e)
    });
  }
}