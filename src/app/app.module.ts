import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule  } from '@angular/fire/firestore';


import { AppComponent } from './app.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { TodosComponent } from './todos/todos.component';
import { AboutComponent } from './about/about.component';
import { TodoComponent } from './todo/todo.component';
import {TodoResolverService} from './services/todo-resolver.service';
import {TodosService} from './services/todos.service';
import {environment} from '../environments/environment';
import {TodoFirebaseResolverService} from './services/todo-firebase-resolver.service';
import {TodosFirebaseService} from './services/todos-firebase.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './core/auth.guard';
import { StopPropagationDirective } from './stop-propagation.directive';

const appRoutes: Routes = [
  { path: '', component: TodosComponent, resolve: {todos: TodoResolverService} },
  { path: 'firebase', component: TodosComponent, canActivate: [AuthGuard], resolve: {todos: TodoFirebaseResolverService}  },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterSectionComponent,
    TodosComponent,
    AboutComponent,
    TodoComponent,
    StopPropagationDirective
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthModule,
    // FormsModule
  ],
  providers: [TodoResolverService, TodosService, TodoFirebaseResolverService, TodosFirebaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
