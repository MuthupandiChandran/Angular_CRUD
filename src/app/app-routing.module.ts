import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

const routes: Routes = [
 {path:'',redirectTo:'/nav-bar',pathMatch:'full'},
 {path:'nav-bar',component:NavBarComponent},
 {path:'dashboard',component:DashboardComponent},
 {path:'users',component:UserListComponent},
 {path:'users/new',component:UserFormComponent},
 {path:'users/edit/:id',component:UserFormComponent},
 {path:'**',redirectTo:'/dashboard',pathMatch:'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
