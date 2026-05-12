import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Bandeja } from './bandeja/bandeja';
import { Acerca } from './pages/acerca/acerca';
import { Reportes } from './pages/reportes/reportes';
import { DetalleExpediente } from './pages/detalle-expediente/detalle-expediente';

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
        path: '**',
        redirectTo: ''
    }
];
