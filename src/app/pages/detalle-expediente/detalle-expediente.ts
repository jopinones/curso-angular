import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { ExpedienteService } from '../../services/expediente';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink, NgClass, DatePipe],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly expedienteService = inject(ExpedienteService);

  expediente: Expediente | undefined = undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.expedienteService.obtenerPorId(id).subscribe({
      next: exp => (this.expediente = { ...exp, historial: exp.historial ?? [] }),
      error: () => (this.expediente = undefined),
    });
  }

  obtenerClasePrioridad(prioridad: string): string {
    if (prioridad === 'Alta') return 'prioridad-alta';
    if (prioridad === 'Media') return 'prioridad-media';
    if (prioridad === 'Baja') return 'prioridad-baja';
    return '';
  }

  obtenerClaseEstado(estado: string): string {
    if (estado === 'Pendiente') return 'estado-pendiente';
    if (estado === 'En proceso') return 'estado-en-proceso';
    if (estado === 'Finalizado') return 'estado-finalizado';
    return '';
  }
}
