import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Expediente } from '../../models/expediente';
import { CommonModule } from '@angular/common';
import { ExpedienteService } from '../services/expediente';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-bandeja',
  imports: [
    FormsModule, 
    CommonModule, 
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit {
  expedientes: Expediente[] = [];
  
  columnas: string[] = [
    'id',
    'nombre',
    'estado',
    'prioridad',
    'fecha',
    'vencimiento',
    'observación',
    'acciones'
  ];

  mostrarFormulario = false;
  formularioEnviado = false;
  alerta = { mensaje: '', visible: false };

  private readonly flujoEstados = ['Pendiente', 'En proceso', 'Finalizado'];
  private alertaTimeout: ReturnType<typeof setTimeout> | null = null;

  filtroEstado = '';
  filtroPrioridad = '';
  filtroVencimiento = '';

  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    prioridad: '',
    fechaCreacion: '',
    fechaVencimiento: '',
    historial: [],
  };

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit() {
    this.cargarExpediente();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) this.limpiarFormulario();
  }

  mostrarAlerta(mensaje: string) {
    if (this.alertaTimeout) clearTimeout(this.alertaTimeout);
    this.alerta = { mensaje, visible: true };
    this.alertaTimeout = setTimeout(() => {
      this.alerta.visible = false;
    }, 3500);
  }

  cambiarEstado(id: number) {
    const expediente = this.expedientes.find(e => e.id === id);
    if (!expediente) return;
    const estadoAnterior = expediente.estado;
    const indiceActual = this.flujoEstados.indexOf(expediente.estado);
    expediente.estado = this.flujoEstados[(indiceActual + 1) % this.flujoEstados.length];
    this.expedienteService.agregarHistorial(
      expediente,
      estadoAnterior,
      expediente.estado,
      `Avance de estado registrado automáticamente`,
    );
    this.expedienteService.actualizarExpediente(expediente);
    this.cargarExpediente();
  }

  cargarExpediente() {
    this.expedientes = this.expedienteService.obtenerExpediente();
  }

  agregarExpediente() {
    this.formularioEnviado = true;
    if (!this.nuevoExpediente.nombre || !this.nuevoExpediente.estado || !this.nuevoExpediente.prioridad || !this.nuevoExpediente.fechaCreacion) {
      this.mostrarAlerta('Complete todos los campos obligatorios antes de agregar.');
      return;
    }

    const expediente: Expediente = {
      id: Date.now(),
      nombre: this.nuevoExpediente.nombre,
      estado: this.nuevoExpediente.estado,
      prioridad: this.nuevoExpediente.prioridad,
      fechaCreacion: this.nuevoExpediente.fechaCreacion,
      fechaVencimiento: this.nuevoExpediente.fechaVencimiento || undefined,
      observaciones: this.nuevoExpediente.observaciones,
      historial: this.nuevoExpediente.historial,
    };

    this.expedienteService.agregarExpediente(expediente);
    this.cargarExpediente();
    this.limpiarFormulario();
    this.mostrarFormulario = false;
  }

  eliminarExpediente(id: number) {
    const confirmar = confirm('¿Está seguro de eliminar el expediente?');
    if (!confirmar) return;
    this.expedienteService.eliminarExpediente(id);
    this.cargarExpediente();
  }

  limpiarFormulario() {
    this.nuevoExpediente = {
      id: 0,
      nombre: '',
      estado: '',
      prioridad: '',
      fechaCreacion: '',
      fechaVencimiento: '',
      historial: [],
    };
    this.formularioEnviado = false;
  }

  estadoVencimiento(expediente: Expediente): 'vencido' | 'proximo' | 'vigente' | 'sin-fecha' {
    if (!expediente.fechaVencimiento) return 'sin-fecha';
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [y, m, d] = expediente.fechaVencimiento.split('-').map(Number);
    const venc = new Date(y, m - 1, d);
    const diffDias = (venc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDias < 0) return 'vencido';
    if (diffDias <= 7) return 'proximo';
    return 'vigente';
  }

  obtenerExpedienteFiltrados() {
    return this.expedientes.filter(expediente => {
      const cumpleEstado = !this.filtroEstado || expediente.estado === this.filtroEstado;
      const cumplePrioridad = !this.filtroPrioridad || expediente.prioridad === this.filtroPrioridad;
      const cumpleVencimiento =
        !this.filtroVencimiento || this.estadoVencimiento(expediente) === this.filtroVencimiento;
      return cumpleEstado && cumplePrioridad && cumpleVencimiento;
    });
  }

  limpiarFiltros() {
    this.filtroEstado = '';
    this.filtroPrioridad = '';
    this.filtroVencimiento = '';
  }


}
