import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [
 
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
  { path: '', component: LoginAdminComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
