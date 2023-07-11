import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeedetailComponent } from './admin/employeedetail/employeedetail.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: "", component: LoginComponent},
{path:"signup", component: SignupComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuard],
    data:{roles: ['admin']}
   },
   {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate:[AuthGuard],
    data:{roles: ['user']}
   },
// {path: "admin", component: AdminComponent},
// {path: "user", component: UserComponent},
// {path:'employeedetails', component: EmployeedetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
