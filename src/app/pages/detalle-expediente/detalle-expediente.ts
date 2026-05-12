import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idExpediente = Number(this.route.snapshot.paramMap.get('id'));
    const data = localStorage.getItem('expedientes');

    if (data) {
      const expedientes: Expediente[] = JSON.parse(data);
      this.expediente = expedientes.find(e => e.id === this.idExpediente);
    }
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
