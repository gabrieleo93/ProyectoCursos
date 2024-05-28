import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { InicioComponent } from './componets/inicio/inicio.component';
import { FormularioComponent } from './componets/formulario/formulario.component';
import { ListadoComponent } from './componets/listado/listado.component';
import { FormularioAdminComponent } from './componets/formularioAdmin/formulario-admin/formulario-admin.component';
import { AuthGuard } from './guard/auth.guard';
import { ExportarListadoComponent } from './componets/exportar-listado/exportar-listado.component';




export const routes: Routes = [
  {
    path:"",
    loadComponent:()=> import("./layouts/top-bar/top-bar.component").then(m=>m.TopBarComponent),
    children:[
      {
      path: "",
      component: LoginComponent,


      }

    ]
  },
  {
    path:'home',
    title:'home',
    loadComponent: ()=> import("./layouts/top-bar-inicio/top-bar-inicio.component").then(m=>m.TopBarInicioComponent),
    children:[
      {
        path:'inicio',
        component:InicioComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path:"home",
    title:"HOME",
    loadComponent: ()=> import("./layouts/top-bar-inicio/top-bar-inicio.component").then(m=>m.TopBarInicioComponent),
    children:[
        {
            path:"formulario",
            component: FormularioComponent,
            canActivate: [AuthGuard]
        }

    ]
  },
  {
    path:"home",
    title:"HOME",
    loadComponent: ()=> import("./layouts/top-bar-inicio/top-bar-inicio.component").then(m=>m.TopBarInicioComponent),
    children:[
        {
            path:"listado",
            component: ListadoComponent,
            canActivate: [AuthGuard]
        }
    ]
  },
  {
    path:"home",
    title:"HOME",
    loadComponent: ()=> import("./layouts/top-bar-inicio/top-bar-inicio.component").then(m=>m.TopBarInicioComponent),
    children:[
        {
            path:"formularioAdmin",
            component: FormularioAdminComponent,
            canActivate: [AuthGuard]
        }

    ]
  },
  {
    path:"home",
    title:"HOME",
    loadComponent: ()=> import("./layouts/top-bar-inicio/top-bar-inicio.component").then(m=>m.TopBarInicioComponent),
    children:[
        {
            path:"export",
            component: ExportarListadoComponent,
            canActivate: [AuthGuard]
        }

    ]
  },




];
