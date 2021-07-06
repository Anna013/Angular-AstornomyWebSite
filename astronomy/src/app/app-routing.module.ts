import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './event/add-event/add-event.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminGuard } from './guard/adminGuard';
import { Guard } from './guard/guard';
import { HomeComponent } from './home/home/home.component';
import { AdminLoginComponent } from './user/admin-login/admin-login.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'login', component: UserLoginComponent },
{ path: 'register', component: UserRegisterComponent },
{ path: 'event/list', component: EventListComponent },
{ path: 'event/add', component: AddEventComponent, canActivate:[AdminGuard]},
{path: 'admin', component: AdminLoginComponent},
{path: 'event/:name', component:EventDetailsComponent},
{path:'gallery', component: GalleryComponent},
{ path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
