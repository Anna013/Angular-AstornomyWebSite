import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { EventItemComponent } from './event/event-item/event-item.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { Guard } from './guard/guard';
import { EventService } from './services/event.service';
import { TokenInterceptor } from './services/token.interceptor';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { HomeComponent } from './home/home/home.component';
import { AdminLoginComponent } from './user/admin-login/admin-login.component';
import { AdminGuard } from './guard/adminGuard';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    AddEventComponent,
    EventItemComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HomeComponent,
    AdminLoginComponent,
    EventDetailsComponent,
    GalleryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EventService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}, Guard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
