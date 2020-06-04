import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedCoreModule,
    FormsModule
  ]
})
export class HomeModule { }
