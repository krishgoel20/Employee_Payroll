import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  // { path: 'user', component: UserprofileComponent },
  // { path: '', redirectTo: '/user', pathMatch: 'full' }
  {path:"", component: UserprofileComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class UserRoutingModule { }
