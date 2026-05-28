import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
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
}

@Component({
  selector: 'app-kanban',
  imports: [RouterLink, NgClass, DatePipe, DragDropModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDividerModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban {
  private readonly service = inject(ExpedienteService);

  readonly columnas: KanbanColumna[] = [
    { estado: 'Pendiente',  titulo: 'Pendiente',  headerClass: 'col-header-pendiente',  badgeClass: 'badge-pendiente'  },
    { estado: 'En Proceso', titulo: 'En Proceso', headerClass: 'col-header-proceso',    badgeClass: 'badge-proceso'    },
    { estado: 'Finalizado', titulo: 'Finalizado', headerClass: 'col-header-finalizado', badgeClass: 'badge-finalizado' },
  ];

  getExpedientesPorEstado(estado: string): Expediente[] {
    return this.service.expedientes().filter(e => e.estado === estado);
  }

  onDrop(event: CdkDragDrop<KanbanColumna>): void {
    if (event.previousContainer === event.container) return;
    const expediente = event.item.data as Expediente;
    const nuevoEstado = event.container.data.estado;
    const actualizado: Expediente = { ...expediente, estado: nuevoEstado };
    this.service.agregarHistorial(actualizado, expediente.estado, nuevoEstado, 'Estado cambiado desde Kanban');
    this.service.actualizarExpediente(actualizado);
  }
}
