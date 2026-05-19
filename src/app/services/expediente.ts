import { Injectable, signal } from '@angular/core';
import { Expediente } from '../../models/expediente';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  private readonly storageKey = 'expediente';
  private readonly _expedientes = signal<Expediente[]>(this.cargarDesdeStorage());

  readonly expedientes = this._expedientes.asReadonly();

  private cargarDesdeStorage(): Expediente[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) return JSON.parse(data);

    const iniciales: Expediente[] = [
      { id: 1, nombre: 'Fiscalización', estado: 'Pendiente', prioridad: 'Alta', fechaCreacion: '2026-05-02' },
      { id: 2, nombre: 'Revisión', estado: 'Pendiente', prioridad: 'Media', fechaCreacion: '2026-05-04' },
    ];
    this.guardarExpedientes(iniciales);
    return iniciales;
  }

  obtenerExpediente(): Expediente[] {
    return this._expedientes();
  }

  obtenerPorId(id: number): Expediente | undefined {
    return this._expedientes().find(e => e.id === id);
  }

  agregarExpediente(expediente: Expediente): void {
    const actualizados = [...this._expedientes(), expediente];
    this._expedientes.set(actualizados);
    this.guardarExpedientes(actualizados);
  }

  eliminarExpediente(id: number): void {
    const actualizados = this._expedientes().filter(e => e.id !== id);
    this._expedientes.set(actualizados);
    this.guardarExpedientes(actualizados);
  }

  actualizarExpediente(expedienteActualizado: Expediente): void {
    const actualizados = this._expedientes().map(e =>
      e.id === expedienteActualizado.id ? expedienteActualizado : e,
    );
    this._expedientes.set(actualizados);
    this.guardarExpedientes(actualizados);
  }

  contarTotal(): number {
    return this._expedientes().length;
  }

  contarPendientes(): number {
    return this._expedientes().filter(e => e.estado === 'Pendiente').length;
  }

  contarFinalizado(): number {
    return this._expedientes().filter(e => e.estado === 'Finalizado').length;
  }

  private guardarExpedientes(expedientes: Expediente[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(expedientes));
  }
}
