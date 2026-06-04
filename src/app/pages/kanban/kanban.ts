import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
export class Kanban implements OnInit {
  private readonly service = inject(ExpedienteService);

  private readonly _expedientes = signal<Expediente[]>([]);

  readonly pendientes = computed(() => this._expedientes().filter(e => e.estado === 'Pendiente'));
  readonly enProceso  = computed(() => this._expedientes().filter(e => e.estado === 'En proceso'));
  readonly finalizados = computed(() => this._expedientes().filter(e => e.estado === 'Finalizado'));

  readonly columnas: KanbanColumna[] = [
    { estado: 'Pendiente',  titulo: 'Pendiente',  headerClass: 'col-header-pendiente',  badgeClass: 'badge-pendiente'  },
    { estado: 'En proceso', titulo: 'En proceso', headerClass: 'col-header-proceso',    badgeClass: 'badge-proceso'    },
    { estado: 'Finalizado', titulo: 'Finalizado', headerClass: 'col-header-finalizado', badgeClass: 'badge-finalizado' },
  ];

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes(): void {
    this.service.obtenerExpedientes().subscribe({
      next: data => this._expedientes.set(data),
    });
  }

  getExpedientesPorEstado(estado: string): Expediente[] {
    switch (estado) {
      case 'Pendiente':   return this.pendientes();
      case 'En proceso':  return this.enProceso();
      case 'Finalizado':  return this.finalizados();
      default:            return [];
    }
  }

  onDrop(event: CdkDragDrop<KanbanColumna>): void {
    if (event.previousContainer === event.container) return;
    const expediente = event.item.data as Expediente;
    const nuevoEstado = event.container.data.estado;
    const actualizado: Expediente = { ...expediente, estado: nuevoEstado };
    this.service.agregarHistorial(actualizado, expediente.estado, nuevoEstado, 'Estado cambiado desde Kanban');
    this.service.actualizarExpediente(actualizado).subscribe({
      next: () => this.cargarExpedientes(),
    });
  }
}
