import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AdressComponent } from './form/adress/adress.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, FormComponent, AdressComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
