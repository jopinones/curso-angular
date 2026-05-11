import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  expedientes: Expediente[] = [];

  ngOnInit() {
    const data = localStorage.getItem('expedientes');
    if (data) {
      this.expedientes = JSON.parse(data);
    }
  }

  get totalRegistrado(): number {
    return this.expedientes.length;
  }

  get pendienteDeGestion(): number {
    return this.expedientes.filter(e => e.estado === 'Pendiente').length;
  }

  get procesoTerminado(): number {
    return this.expedientes.filter(e => e.estado === 'Finalizado').length;
  }
}
