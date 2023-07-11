import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { AdddepartmentComponent } from './adddepartment/adddepartment.component';
import { AddgradeComponent } from './addgrade/addgrade.component';
import { AddemployeegradedetailsComponent } from './addemployeegradedetails/addemployeegradedetails.component';
import { MonthlysalaryComponent } from './monthlysalary/monthlysalary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { AddnewgradeComponent } from './addnewgrade/addnewgrade.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

console.warn("admin module");

@NgModule({
  declarations: [
    EmployeedetailComponent,
    AdddepartmentComponent,
    AddgradeComponent,
    AddemployeegradedetailsComponent,
    MonthlysalaryComponent,
    AddnewgradeComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    // BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
     MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      SharedModule,
      ToastrModule.forRoot(
        
      )      
      
  ],  
  exports:[]
})
export class AdminModule { }
