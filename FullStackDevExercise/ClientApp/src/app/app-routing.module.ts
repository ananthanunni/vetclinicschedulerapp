import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './home/components/sign-in/sign-in.component';
import { HomeComponent } from './home/components/home/home.component';


const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "home", component: HomeComponent },
  { path: "pets", loadChildren: () => import('../app/pets/pets.module').then(r => r.PetsModule) },
  { path: "owners", loadChildren: () => import('../app/owners/owners.module').then(r => r.OwnersModule) },
  { path: "appointments", loadChildren: () => import('../app/appointments/appointments.module').then(r => r.AppointmentsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
