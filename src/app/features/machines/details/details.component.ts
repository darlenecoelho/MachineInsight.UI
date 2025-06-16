// src/app/features/machines/details/details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MachineRepositoryService } from '../../../core/infrastructure/machine-repository.service';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private repo: MachineRepositoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.repo.getById(id)
        .then(machine => {
          // aqui você pode armazenar em uma propriedade e exibir no template
          console.log('Máquina carregada:', machine);
        })
        .catch(err => console.error('Erro ao carregar detalhes:', err));
    }
  }
}