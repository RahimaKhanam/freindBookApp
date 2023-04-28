import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './pages/users/users.component';
import { InterceptorInterceptor } from './helpers/interceptor.interceptor';
import { MaterialModule } from './material/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { SideProfileComponent } from './common/side-profile/side-profile.component';
import { NetworkComponent } from './pages/network/network.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    SideProfileComponent,
    NetworkComponent,
    FriendsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FormsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
