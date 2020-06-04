import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './home/components/sign-in/sign-in.component';
import { HomeComponent } from './home/components/home/home.component';

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "home", component: HomeComponent },
  { path: "appointments", loadChildren: () => import('../app/appointments/appointments.module').then(r => r.AppointmentsModule) },
  { path: "owners", loadChildren: () => import('../app/owners/owners.module').then(r => r.OwnersModule) },
  { path: "owners/:ownerId/pets", loadChildren: () => import('../app/pets/pets.module').then(r => r.PetsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
