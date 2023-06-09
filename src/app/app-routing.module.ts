import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { NetworkComponent } from './pages/network/network.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent,},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'network', component: NetworkComponent, canActivate: [AuthGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
