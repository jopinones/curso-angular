import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ExpedienteService } from '../../services/expediente';
import { Expediente } from '../../../models/expediente';

interface KanbanColumna {
  estado: string;
  titulo: string;
  headerClass: string;
  badgeClass: string;
  estadoAnterior?: string;
  estadoSiguiente?: string;
  labelAvanzar?: string;
  iconoAvanzar?: string;
  btnAvanzarClass?: string;
}

@Component({
  selector: 'app-kanban',
  imports: [RouterLink, NgClass, DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDividerModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban {
  private readonly service = inject(ExpedienteService);

  readonly columnas: KanbanColumna[] = [
    {
      estado: 'Pendiente',
      titulo: 'Pendiente',
      headerClass: 'col-header-pendiente',
      badgeClass: 'badge-pendiente',
      estadoSiguiente: 'En Proceso',
      labelAvanzar: 'Iniciar',
      iconoAvanzar: 'arrow_forward',
      btnAvanzarClass: 'btn-iniciar',
    },
    {
      estado: 'En Proceso',
      titulo: 'En Proceso',
      headerClass: 'col-header-proceso',
      badgeClass: 'badge-proceso',
      estadoAnterior: 'Pendiente',
      estadoSiguiente: 'Finalizado',
      labelAvanzar: 'Finalizar',
      iconoAvanzar: 'check',
      btnAvanzarClass: 'btn-finalizar',
    },
    {
      estado: 'Finalizado',
      titulo: 'Finalizado',
      headerClass: 'col-header-finalizado',
      badgeClass: 'badge-finalizado',
      estadoAnterior: 'En Proceso',
    },
  ];

  getExpedientesPorEstado(estado: string): Expediente[] {
    return this.service.expedientes().filter(e => e.estado === estado);
  }

  cambiarEstado(expediente: Expediente, nuevoEstado: string): void {
    const estadoAnterior = expediente.estado;
    const actualizado: Expediente = { ...expediente, estado: nuevoEstado };
    this.service.agregarHistorial(actualizado, estadoAnterior, nuevoEstado, 'Estado cambiado desde Kanban');
    this.service.actualizarExpediente(actualizado);
  }
}
