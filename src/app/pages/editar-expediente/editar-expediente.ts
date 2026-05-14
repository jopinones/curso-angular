import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-editar-expediente',
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {
  expediente: Expediente = { id: 0, nombre: '', estado: '', prioridad: '', fechaCreacion: '' };
  encontrado = false;
  enviado = false;
  alerta = { mensaje: '', tipo: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = localStorage.getItem('expedientes');
    if (data) {
      const expedientes: Expediente[] = JSON.parse(data);
      const exp = expedientes.find(e => e.id === id);
      if (exp) {
        this.expediente = { ...exp };
        this.encontrado = true;
      }
    }
  }

  guardar() {
    this.enviado = true;
    if (!this.expediente.nombre || !this.expediente.estado || !this.expediente.fechaCreacion) {
      this.alerta = { mensaje: 'Complete todos los campos obligatorios.', tipo: 'error' };
      return;
    }
    const data = localStorage.getItem('expedientes');
    if (data) {
      const expedientes: Expediente[] = JSON.parse(data);
      const index = expedientes.findIndex(e => e.id === this.expediente.id);
      if (index !== -1) {
        expedientes[index] = { ...this.expediente };
        localStorage.setItem('expedientes', JSON.stringify(expedientes));
      }
    }
    this.router.navigate(['/bandeja']);
  }

  cancelar() {
    this.router.navigate(['/bandeja']);
  }
}
