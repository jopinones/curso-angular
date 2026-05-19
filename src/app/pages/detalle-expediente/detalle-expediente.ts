import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink, NgClass, DatePipe],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly expedienteService = inject(ExpedienteService);

  private readonly idExpediente = signal(0);

  readonly expediente = computed(() =>
    this.expedienteService.expedientes().find(e => e.id === this.idExpediente()),
  );

  ngOnInit(): void {
    this.idExpediente.set(Number(this.route.snapshot.paramMap.get('id')));
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
