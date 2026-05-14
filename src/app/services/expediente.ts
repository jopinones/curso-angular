import { Injectable } from '@angular/core';
import { Expediente } from '../../models/expediente';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  private storageKey = 'expediente';

  obtenerExpediente(): Expediente[] {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      return JSON.parse(data);
    }

    const expedientesIniciales: Expediente[] = [
      {
        id: 1,
        nombre: 'Fiscalización',
        estado: 'Pendiente',
        prioridad: 'Alta',
        fechaCreacion: '2026-05-02',
      },
      {
        id: 2,
        nombre: 'Revisión',
        estado: 'Pendiente',
        prioridad: 'Media',
        fechaCreacion: '2026-05-04',
      },
    ];

    this.guardarExpedientes(expedientesIniciales);

    return expedientesIniciales;
  }

  obtenerPorId(id: number): Expediente | undefined {
    const expedientes = this.obtenerExpediente();
    return expedientes.find(e => e.id === id);
  }

  agregarExpediente(expediente: Expediente): void {
    const expedientes = this.obtenerExpediente();
    expedientes.push(expediente);
    this.guardarExpedientes(expedientes);
  }

  eliminarExpediente(id: number): void {
    const expedientes = this.obtenerExpediente();
    const expedientesActualizados = expedientes.filter(e => e.id !== id);
    this.guardarExpedientes(expedientesActualizados);
  }

  actualizarExpediente(expedienteActualizado: Expediente): void {
    const expedientes = this.obtenerExpediente();
    const expedientesActualizados = expedientes.map(e =>
      e.id === expedienteActualizado.id ? expedienteActualizado : e,
    );
    this.guardarExpedientes(expedientesActualizados);
  }

  contarTotal(): number {
    return this.obtenerExpediente().length;
  }

  contarPendientes(): number {
    return this.obtenerExpediente().filter(e => e.estado === 'Pendiente').length;
  }

  contarFinalizado(): number {
    return this.obtenerExpediente().filter(e => e.estado === 'Finalizado').length;
  }

  private guardarExpedientes(expedientes: Expediente[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(expedientes));
  }
}
