import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-pendientes',
  imports: [CommonModule, RouterLink],
  templateUrl: './pendientes.html',
  styleUrl: './pendientes.css',
})
export class Pendientes implements OnInit {
  expedientes: Expediente[] = [];

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit(): void {
    this.expedientes = this.expedienteService.obtenerExpediente().filter(e => e.estado === 'Pendiente');
  }
}
