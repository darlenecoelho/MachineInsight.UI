import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule }  from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-button routerLink="/dashboard" routerLinkActive="active">
        Dashboard
      </button>
      <button mat-button routerLink="/manage" routerLinkActive="active">
        Gerenciar Máquinas
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: center;    
    }
    .active {
      font-weight: bold;          
      text-decoration: underline;
    }
  `]
})
export class NavComponent {}
