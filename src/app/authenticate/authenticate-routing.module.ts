import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch:'full'},
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'signup', component: LoginComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticateRoutingModule { }
