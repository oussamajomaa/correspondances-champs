import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'
import { NgxEchartsModule } from 'ngx-echarts';
import { NavsideComponent } from './navside/navside.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MousePositionDirective } from './mouse-position.directive';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavsideComponent,
    MousePositionDirective,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxSliderModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
