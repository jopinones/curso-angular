import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-proximos-vencer',
  imports: [CommonModule, RouterLink],
  templateUrl: './proximos-vencer.html',
  styleUrl: './proximos-vencer.css',
})
export class ProximosVencer implements OnInit {
  expedientes: Expediente[] = [];

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit(): void {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const limite = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);

    this.expedientes = this.expedienteService.obtenerExpediente().filter(e => {
      if (!e.fechaVencimiento) return false;
      const [y, m, d] = e.fechaVencimiento.split('-').map(Number);
      const venc = new Date(y, m - 1, d);
      return venc >= hoy && venc <= limite;
    });
  }

  diasRestantes(fechaVencimiento: string): number {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [y, m, d] = fechaVencimiento.split('-').map(Number);
    const venc = new Date(y, m - 1, d);
    return Math.round((venc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  }

  urgencia(fechaVencimiento: string): 'hoy' | 'critico' | 'proximo' {
    const dias = this.diasRestantes(fechaVencimiento);
    if (dias === 0) return 'hoy';
    if (dias <= 3) return 'critico';
    return 'proximo';
  }
}
