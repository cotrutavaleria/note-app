import { Routes } from '@angular/router';
import { NotesBoardComponent } from './notes-board/notes-board.component';

export const routes: Routes = [
    { path: 'notes', component: NotesBoardComponent},
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
  
];
