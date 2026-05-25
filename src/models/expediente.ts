export interface HistorialEntry {
  fecha: string;
  estadoAnterior: string;
  estadoNuevo: string;
  observacion: string;
}

export interface Expediente {
  id: number;
  nombre: string;
  estado: string;
  prioridad: string;
  fechaCreacion: string;
  fechaVencimiento?: string;
  observaciones?: string;
  historial: HistorialEntry[];
}
