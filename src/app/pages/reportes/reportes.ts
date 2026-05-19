import { Component, computed, inject } from '@angular/core';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {
  private readonly service = inject(ExpedienteService);

  readonly totalRegistrado = computed(() => this.service.expedientes().length);
  readonly pendienteDeGestion = computed(() =>
    this.service.expedientes().filter(e => e.estado === 'Pendiente').length,
  );
  readonly enProceso = computed(() =>
    this.service.expedientes().filter(e => e.estado === 'En proceso').length,
  );
  readonly procesoTerminado = computed(() =>
    this.service.expedientes().filter(e => e.estado === 'Finalizado').length,
  );
}
