import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Note } from '../views/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUrl = 'http://localhost:5279/api/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.get<Note[]>(this.baseUrl, httpOptions);
  }

  addNewNote(note: any): Observable<Note> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<any>(this.baseUrl, note, httpOptions)
      .pipe(
        catchError(err => { throw 'Add New note Error!' })
      );
  }

  updateNote(note: Note): Observable<Note> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.put<any>(`${this.baseUrl}/${note.id}`, note, httpOptions)
      .pipe(
        catchError(err => { throw 'Update note Error!' })
      );
  }

  deleteNote(noteId: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.delete(`${this.baseUrl}/${noteId}`, httpOptions)
      .pipe(
        catchError(err => { throw 'Delete note Error!' })
      );
  }
}
