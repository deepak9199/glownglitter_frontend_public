import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './system/home/home.component';
// import { AboutUsComponent } from './system/about-us/about-us.component';
const routes: Routes = [

];

;
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
