import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesExampleComponent } from './pipes-example/pipes-example.component';
import { CamelCasePipe } from './camel-case.pipe';
import { SettingsService } from './settings.service';
import { ArrayFilterPipe } from './array-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ImpureArrayFilterPipe } from './impure-array-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PipesExampleComponent,
    CamelCasePipe,
    ArrayFilterPipe,
    ImpureArrayFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'pt-br'
    // }
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService:any) => settingsService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
