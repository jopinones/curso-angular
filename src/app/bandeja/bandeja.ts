import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';

@Component({
  selector: 'app-bandeja',
  imports: [FormsModule],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit{
  expedientes: Expediente[] = []; 
  
  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    fechaCreacion: ''
  }

  ngOnInit() {
    const data = localStorage.getItem('expedientes');

    if (data) {
      this.expedientes = JSON.parse(data);      
    } else {
      this.expedientes = [
        {
          id: 1,
          nombre: 'Fiscalización',
          estado: 'Pendiente',
          fechaCreacion: '02/05/2026'
        },
        {
          id: 2,
          nombre: 'Revisión',
          estado: 'Pendiente',
          fechaCreacion: '04/05/2026'
        }
      ];
    }
  }

  agregarExpediente() {
    if (!this.nuevoExpediente.nombre ||
        !this.nuevoExpediente.estado ||
        !this.nuevoExpediente.fechaCreacion) {
          alert('Debe completar todos los datos');

          return;
    }

    const expediente: Expediente = {
      id: Date.now(),
      nombre: this.nuevoExpediente.nombre,
      estado: this.nuevoExpediente.estado,
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
    this.nuevoExpediente = {
      id: 0,
      nombre: '',
      estado: '',
      fechaCreacion: '',
    };
  }

  guardarLocalStorage() {
    localStorage.setItem('expedientes', JSON.stringify(this.expedientes));
  }
}