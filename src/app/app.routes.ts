import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Bandeja } from './bandeja/bandeja';
import { Acerca } from './pages/acerca/acerca';
import { Reportes } from './pages/reportes/reportes';
import { DetalleExpediente } from './pages/detalle-expediente/detalle-expediente';
import { EditarExpediente } from './pages/editar-expediente/editar-expediente';
import { Pendientes } from './pages/pendientes/pendientes';
import { ProximosVencer } from './pages/proximos-vencer/proximos-vencer';

export const routes: Routes = [
    {
        path: '',
        component: Inicio
    },
    {
        path: 'bandeja',
        component: Bandeja
    },
    {
        path: 'pendientes',
        component: Pendientes
    },
    {
        path: 'proximos-vencer',
        component: ProximosVencer
    },
    {
        path: 'acerca',
        component: Acerca
    },
    {
        path: 'reportes',
        component: Reportes
    },
    {
        path: 'expediente/:id',
        component: DetalleExpediente
    },
    {
        path: 'expedientes/editar/:id',
        component: EditarExpediente
    },
    {
        path: '**',
        redirectTo: ''
    }
];
