import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularMaterialsModule } from '../shared/resources/app.angular-material.module';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { Note } from '../shared/views/note.interface';
import { NoteService } from '../shared/services/note.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-notes-board',
  standalone: true,
  imports: [AngularMaterialsModule, HttpClientModule],
  providers: [NoteService, NgFor, NgIf],
  templateUrl: './notes-board.component.html',
  styleUrls: ['./notes-board.component.css']
})
export class NotesBoardComponent implements OnInit {
  existentNotes: Note[] = [];

  constructor(public dialog: MatDialog, private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.existentNotes, event);
    moveItemInArray(this.existentNotes, event.previousIndex, event.currentIndex);
    console.log(this.existentNotes);
  }

  getNotes() {
    this.noteService.getNotes().subscribe((notes) => {
      this.existentNotes = notes;
    });
  }

  openTextEditor(title: string | null, date: string | null, description: string | null, id: any) {
    let dialogRef = this.dialog.open(TextEditorComponent, {
      minWidth: '300px',
      data: { id, title, date, description }
    });

    dialogRef.afterClosed().subscribe((note) => {
      if (note) {
        if (note.status == "new") {
          this.existentNotes.push(note.response);
        } 
        else if (note.status == "updated") {
          const result = this.existentNotes.filter(s => s.id == note.response.id);
          let noteIndex = this.existentNotes.indexOf(result[0]);
          this.existentNotes[noteIndex] = note.response;
          console.log(this.existentNotes);
        }
      } else {
        console.log('Dialog was closed without saving changes');
      }
    });
  }

  deleteNote(id: string | null) {
    if (id) {
      this.existentNotes = this.existentNotes.filter(s => s.id != id);
      this.noteService.deleteNote(id).subscribe();
    }
  }
}
