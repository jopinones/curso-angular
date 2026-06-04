import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expediente, HistorialEntry } from '../../models/expediente';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  private readonly apiUrl = 'http://localhost:3000/expedientes';

  constructor(private http: HttpClient) {}

  obtenerExpedientes(): Observable<Expediente[]> {
    return this.http
      .get<Expediente[]>(this.apiUrl)
      .pipe(map(items => items.map(e => ({ ...e, historial: e.historial ?? [] }))));
  }

  obtenerPorId(id: number): Observable<Expediente> {
    return this.http.get<Expediente>(`${this.apiUrl}/${id}`);
  }

  agregarExpediente(expediente: Expediente): Observable<Expediente> {
    return this.http.post<Expediente>(this.apiUrl, expediente);
  }

  eliminarExpediente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarExpediente(expediente: Expediente): Observable<Expediente> {
    return this.http.put<Expediente>(`${this.apiUrl}/${expediente.id}`, expediente);
  }

  agregarHistorial(
    expediente: Expediente,
    estadoAnterior: string,
    estadoNuevo: string,
    observacion: string,
  ): void {
    const entrada: HistorialEntry = {
      fecha: new Date().toISOString().split('T')[0],
      estadoAnterior,
      estadoNuevo,
      observacion,
    };
    if (!expediente.historial) expediente.historial = [];
    expediente.historial.push(entrada);
  }
}
