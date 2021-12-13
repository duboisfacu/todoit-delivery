import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BlockGuard } from './guards/block.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent
  , canActivate: [BlockGuard]
},
  {path: 'home', loadChildren:() => import('./home/home.module').then(m => m.HomeModule)
  , canActivate: [AuthGuard]
},
{path: '**', component: LoginComponent
, canActivate: [BlockGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
