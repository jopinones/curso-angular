import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-pendientes',
  imports: [CommonModule, RouterLink],
  templateUrl: './pendientes.html',
  styleUrl: './pendientes.css',
})
export class Pendientes implements OnInit {
  private readonly expedienteService = inject(ExpedienteService);

  readonly expedientes = signal<Expediente[]>([]);

  ngOnInit(): void {
    this.expedienteService.obtenerExpedientes().subscribe({
      next: data => this.expedientes.set(data.filter(e => e.estado === 'Pendiente')),
    });
  }
}
