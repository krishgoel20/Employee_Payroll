import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
// import { UserComponent } from './user/user.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { AddgradeComponent } from './addgrade/addgrade.component';
import { AdddepartmentComponent } from './adddepartment/adddepartment.component';
import { AddnewgradeComponent } from './addnewgrade/addnewgrade.component';
import { MonthlysalaryComponent } from './monthlysalary/monthlysalary.component';

const routes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  //  },
{path: "", component: AdminComponent},
// {path: "admin", component: AdminComponent},
// {path: "user", component: UserComponent},
{path:'employeedetails', component: EmployeedetailComponent},
{path: "addgradedetail", component: AddgradeComponent},
{path:"adddepartment", component: AdddepartmentComponent},
{path:"addgrade", component: AddnewgradeComponent},
{path:"monthlysalary", component: MonthlysalaryComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
