import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './home/components/sign-in/sign-in.component';

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "home", redirectTo: "appointments" },
  { path: "appointments", loadChildren: () => import('../app/appointments/appointments.module').then(r => r.AppointmentsModule) },
  { path: "owners", loadChildren: () => import('../app/owners/owners.module').then(r => r.OwnersModule) },
  { path: "owners/:ownerId/pets/:ownerName", loadChildren: () => import('../app/pets/pets.module').then(r => r.PetsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
