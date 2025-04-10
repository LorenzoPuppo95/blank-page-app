import { Injectable, signal } from '@angular/core';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  note = signal<Note|{}>({});
  notes = this.getNotesFromLocalStorage();

  constructor() {
    setInterval(() => {
      this.saveNoteToLocalStorage(this.note());
    }, 5000);
  }

  saveNoteToLocalStorage(note: Note|{}) {
    console.log(note);
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  getNotesFromLocalStorage(): string[] {
    console.log('Fetching notes from local storage...');
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  }
}

// export class StorageService {
//   note = signal<Note>(this.createNewNote());
//   notes = this.getNotesFromLocalStorage();

//   constructor() {
//     setInterval(() => {
//       this.saveNoteToLocalStorage(this.note());
//     }, 5000);
//   }

//   saveNoteToLocalStorage(note: Note): void {
//     const existingNoteIndex = this.notes.findIndex(n => n.id === note.id);
//     if (existingNoteIndex !== -1) {
//       this.notes[existingNoteIndex] = { ...note, modifyDate: new Date() }; // Update modifyDate
//     } else {
//       this.notes.push(note);
//     }
//     localStorage.setItem('notes', JSON.stringify(this.notes));
//   }

//   getNotesFromLocalStorage(): Note[] {
//     console.log('Fetching notes from local storage...');
//     const notes = localStorage.getItem('notes');
//     return notes ? JSON.parse(notes) : [];
//   }

//   private createNewNote(): Note {
//     return {
//       id: Date.now(), // Use timestamp as unique ID
//       desc: '',
//       creationDate: new Date(),
//       modifyDate: undefined,
//       isSelected: false
//     };
//   }
// }