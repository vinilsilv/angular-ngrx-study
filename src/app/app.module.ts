import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayCounterComponent } from './components/display-counter/display-counter.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TodoComponent } from './components/todo/todo.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DisplayCounterComponent,
    UserDetailsComponent,
    TodoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
