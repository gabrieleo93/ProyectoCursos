import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { InicioComponent } from './componets/inicio/inicio.component';
import { FormularioComponent } from './componets/formulario/formulario.component';
import { ListadoComponent } from './componets/listado/listado.component';
import { FormularioAdminComponent } from './componets/formularioAdmin/formulario-admin/formulario-admin.component';
import { AuthGuard } from './guard/auth.guard';
import { ExportarListadoComponent } from './componets/exportar-listado/exportar-listado.component';
import { TopBarInicioComponent } from './layouts/top-bar-inicio/top-bar-inicio.component';




export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/top-bar/top-bar.component').then(m => m.TopBarComponent),
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },
  {
    path: 'home',
    component: TopBarInicioComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'formulario/:id', // Coloca esta ruta antes de la ruta sin parámetro
        component: FormularioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'listado',
        component: ListadoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'formulario',
        component: FormularioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'formularioAdmin',
        component: FormularioAdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'export',
        component: ExportarListadoComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
