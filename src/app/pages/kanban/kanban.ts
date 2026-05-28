import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ExpedienteService } from '../../services/expediente';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-kanban',
  imports: [
    RouterLink, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule, 
    MatDividerModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban {
  private readonly service = inject(ExpedienteService);

  readonly pendientes = computed(() => this.service.expedientes().filter(e => e.estado === 'Pendiente'));
  readonly enProceso = computed(() => this.service.expedientes().filter(e => e.estado === 'En Proceso'));
  readonly finalizados = computed(() => this.service.expedientes().filter(e => e.estado === 'Finalizado'));

  cambiarEstado(expediente: Expediente, nuevoEstado: string): void {
    const estadoAnterior = expediente.estado;
    const actualizado: Expediente = { ...expediente, estado: nuevoEstado };
    this.service.agregarHistorial(actualizado, estadoAnterior, nuevoEstado, 'Estado cambiado desde Kanban');
    this.service.actualizarExpediente(actualizado);
  }
}
