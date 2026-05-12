import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Expediente } from '../../models/expediente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bandeja',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit {
  expedientes: Expediente[] = [];
  idEditando: number | null = null;
  expedienteEditando: Expediente = { id: 0, nombre: '', estado: '', prioridad: '', fechaCreacion: '' };

  formularioEnviado = false;
  edicionEnviada = false;
  alerta = { mensaje: '', visible: false };

  private readonly flujoEstados = ['Pendiente', 'En proceso', 'Finalizado'];
  private alertaTimeout: ReturnType<typeof setTimeout> | null = null;

  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    prioridad: '',
    fechaCreacion: '',
  };

  ngOnInit() {
    const data = localStorage.getItem('expedientes');
    if (data) {
      this.expedientes = JSON.parse(data);
    } else {
      this.expedientes = [
        { id: 1, nombre: 'Fiscalización', estado: 'Pendiente', prioridad: 'Alta', fechaCreacion: '02/05/2026' },
        { id: 2, nombre: 'Revisión', estado: 'Pendiente', prioridad: 'Media', fechaCreacion: '04/05/2026' },
      ];
    }
  }

  mostrarAlerta(mensaje: string) {
    if (this.alertaTimeout) clearTimeout(this.alertaTimeout);
    this.alerta = { mensaje, visible: true };
    this.alertaTimeout = setTimeout(() => {
      this.alerta.visible = false;
    }, 3500);
  }

  iniciarEdicion(expediente: Expediente) {
    this.idEditando = expediente.id;
    this.edicionEnviada = false;
    this.expedienteEditando = { ...expediente };
  }

  guardarEdicion() {
    this.edicionEnviada = true;
    if (!this.expedienteEditando.nombre || !this.expedienteEditando.estado || !this.expedienteEditando.fechaCreacion) {
      this.mostrarAlerta('Complete todos los campos obligatorios antes de guardar.');
      return;
    }
    const index = this.expedientes.findIndex(e => e.id === this.idEditando);
    if (index !== -1) {
      this.expedientes[index] = { ...this.expedienteEditando };
    }
    this.guardarLocalStorage();
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.idEditando = null;
    this.edicionEnviada = false;
    this.expedienteEditando = { id: 0, nombre: '', estado: '', prioridad: '', fechaCreacion: '' };
  }

  cambiarEstado(id: number) {
    const expediente = this.expedientes.find(e => e.id === id);
    if (!expediente) return;
    const indiceActual = this.flujoEstados.indexOf(expediente.estado);
    expediente.estado = this.flujoEstados[(indiceActual + 1) % this.flujoEstados.length];
    this.guardarLocalStorage();
  }

  agregarExpediente() {
    this.formularioEnviado = true;
    if (!this.nuevoExpediente.nombre || !this.nuevoExpediente.estado || !this.nuevoExpediente.fechaCreacion) {
      this.mostrarAlerta('Complete todos los campos obligatorios antes de agregar.');
      return;
    }

    const expediente: Expediente = {
      id: Date.now(),
      nombre: this.nuevoExpediente.nombre,
      estado: this.nuevoExpediente.estado,
      prioridad: this.nuevoExpediente.prioridad,
      fechaCreacion: this.nuevoExpediente.fechaCreacion,
    };

    this.expedientes.push(expediente);
    this.guardarLocalStorage();
    this.limpiarFormulario();
  }

  eliminarExpediente(id: number) {
    this.expedientes = this.expedientes.filter(e => e.id !== id);
    this.guardarLocalStorage();
  }

  limpiarFormulario() {
    this.nuevoExpediente = { id: 0, nombre: '', estado: '', prioridad: '', fechaCreacion: '' };
    this.formularioEnviado = false;
  }

  guardarLocalStorage() {
    localStorage.setItem('expedientes', JSON.stringify(this.expedientes));
  }
}
