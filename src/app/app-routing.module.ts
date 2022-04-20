import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavsideComponent } from './navside/navside.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'chart', component:NavsideComponent, canActivate:[AuthGuard] },
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
