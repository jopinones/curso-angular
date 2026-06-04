import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-editar-expediente',
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {
  expediente: Expediente = { id: 0, nombre: '', estado: '', prioridad: '', fechaCreacion: '', historial: [] };
  encontrado = false;
  enviado = false;
  alerta = { mensaje: '', tipo: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expedienteService: ExpedienteService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.expedienteService.obtenerPorId(id).subscribe({
      next: exp => {
        this.expediente = { ...exp, historial: exp.historial ?? [] };
        this.encontrado = true;
      },
      error: () => {
        this.alerta = { mensaje: 'No se encontró el expediente.', tipo: 'error' };
      },
    });
  }

  guardar() {
    this.enviado = true;
    if (!this.expediente.nombre || !this.expediente.estado || !this.expediente.fechaCreacion) {
      this.alerta = { mensaje: 'Complete todos los campos obligatorios.', tipo: 'error' };
      return;
    }
    this.expedienteService.actualizarExpediente(this.expediente).subscribe({
      next: () => this.router.navigate(['/bandeja']),
      error: () => (this.alerta = { mensaje: 'Error al guardar los cambios.', tipo: 'error' }),
    });
  }

  cancelar() {
    this.router.navigate(['/bandeja']);
  }
}
