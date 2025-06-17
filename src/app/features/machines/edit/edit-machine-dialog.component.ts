import { Component, Inject }                   from '@angular/core';
import {FormBuilder, FormGroup, Validators, 
ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule }                  from '@angular/material/form-field';
import { MatInputModule }                      from '@angular/material/input';
import { MatButtonModule }                     from '@angular/material/button';
import {MatDialogModule, MatDialogRef, 
MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MachineCrudService }                  from '../../../core/infrastructure/services/machine-manage.service';
import { MachineDto }                       from '../../../core/infrastructure/dtos/machine.dto';
import { UpdateMachineDto }                    from '../../../core/infrastructure/dtos/update-machine.dto';
import { CommonModule }        from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-machine-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './edit-machine-dialog.component.html', 
  styleUrls: ['./edit-machine-dialog.component.scss']
})
export class EditMachineDialogComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private crud: MachineCrudService,
    public dialogRef: MatDialogRef<EditMachineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name:      ['', Validators.required],
      latitude:  [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]]
    });

    this.crud.getById(this.data.id).subscribe((dto: MachineDto) => {
      this.form.patchValue({
        name:      dto.name,
        latitude:  dto.latitude,
        longitude: dto.longitude
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: UpdateMachineDto = this.form.value;
    this.crud.update(this.data.id, dto).subscribe({
      next: ()  => this.dialogRef.close('saved'),
      error: e  => console.error('Erro ao editar máquina', e)
    });
  }
}
