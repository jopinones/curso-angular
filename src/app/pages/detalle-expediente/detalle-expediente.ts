import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink, NgClass],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  constructor(
    private route: ActivatedRoute,
    private expedienteService: ExpedienteService,
  ) {}

  ngOnInit(): void {
    this.idExpediente = Number(this.route.snapshot.paramMap.get('id'));
    this.expediente = this.expedienteService.obtenerPorId(this.idExpediente);
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
