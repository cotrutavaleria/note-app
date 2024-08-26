import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AngularMaterialsModule } from './shared/app.angular-material.module';
import { NotesBoardComponent } from '../app/notes-board/notes-board.component'

@NgModule({
  declarations: [
    AppComponent,
    NotesBoardComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AngularMaterialsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line

})
export class AppModule { }