import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrComponent } from './toastr/toastr.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ToastrComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports:[HeaderComponent]
})
export class SharedModule { }
