import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ExpedienteService } from '../../services/expediente';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  private readonly service = inject(ExpedienteService);

  private readonly _expedientes = signal<Expediente[]>([]);

  ngOnInit(): void {
    this.service.obtenerExpedientes().subscribe({
      next: data => this._expedientes.set(data),
    });
  }

  readonly totalRegistrado    = computed(() => this._expedientes().length);
  readonly pendienteDeGestion = computed(() => this._expedientes().filter(e => e.estado === 'Pendiente').length);
  readonly enProceso          = computed(() => this._expedientes().filter(e => e.estado === 'En proceso').length);
  readonly procesoTerminado   = computed(() => this._expedientes().filter(e => e.estado === 'Finalizado').length);
}
