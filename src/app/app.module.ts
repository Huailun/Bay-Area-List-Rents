import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { HighlightPipe } from './lists/HighlightPipe';
import { MatSortModule } from '@angular/material/sort';
import {MatSliderModule} from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { CityMapComponent } from './city-map/city-map.component';
import { AppService } from './app.service';
import { ShellComponent } from './shell/shell.component';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';

import { AgmCoreModule } from '@agm/core';

const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
     path: 'lists',
     component: ListsComponent
   },
   {
     path: 'login',
     component: LoginComponent
   }
];

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoginComponent,
    ListsComponent,
    HighlightPipe,
    CityMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDU-g0pdYjL9l78JraBsk6FoL9OMpd7o64',
      libraries: ['places']
    })

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
