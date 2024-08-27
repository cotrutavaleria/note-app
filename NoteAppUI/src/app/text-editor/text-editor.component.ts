import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialsModule } from '../shared/resources/app.angular-material.module';
import { NoteService } from '../shared/services/note.service';
import { NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Note } from '../shared/views/note.interface';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [AngularMaterialsModule],
  providers: [NoteService, NgFor, NgIf],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  noteEditingForm = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<TextEditorComponent>, private formBuilder: FormBuilder, private noteService: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(data: any, status: string | null) {
    this.dialogRef.close({ response: data, status: status });
  }

  onSubmit(formGroup: FormGroup) {
    if (!this.data.id) {
      const newNote = {
        title: formGroup.value.title,
        description: formGroup.value.description,
        lastChangeDate: new Date()
      };
      this.noteService.addNewNote(newNote).subscribe({
        next: (result) => {
          this.closeDialog(result, "new");
        },
        error: (err) => {
          console.error("Error adding new note:", err);
        }
      });
    } else {
      const updatedNote = {
        id: this.data.id,
        title: formGroup.value.title,
        description: formGroup.value.description,
        lastChangeDate: new Date()
      };
      this.noteService.updateNote(updatedNote).subscribe({
        next: (_) => {
          this.closeDialog(updatedNote, "updated");
        },
        error: (err) => {
          console.error("Error updating note:", err);
        }
      });
    }
  }


  updateErrorMessage(formControlName: AbstractControl): string | null {
    const formGroup = formControlName.parent?.controls as { [key: string]: AbstractControl<any, any> };
    let formName = formGroup ?
      Object.keys(formGroup).find(name => formGroup[name] === formControlName) : null;

    if (formControlName.hasError('required')) {
      return `A ${formName}` + ' is required';
    }
    return '';
  }
}
