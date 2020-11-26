import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { LoginComponent } from './components/login/login.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: CalendarComponent,
    children: [
      {path: 'new', component: NewEventComponent},
      {path: 'edit/:id', component: EditEventComponent}
    ],
    canActivate:[AuthGuard]
  },
  {path: '', component: AuthenticationComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
