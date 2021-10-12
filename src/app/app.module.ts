import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MaterialModule } from './material/material.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./services/interceptors/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
