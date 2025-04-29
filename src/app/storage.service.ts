import { Injectable, signal } from '@angular/core';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private localStorageKey = 'notes';
  notes = signal<Note[]>(this.getNotesFromLocalStorage());
  note = signal<Note>(this.getLatestNote());

  constructor() {
    setInterval(() => {
      this.saveNoteToLocalStorage(this.note());
    }, 5000);
  }

  saveNoteToLocalStorage(note: Note): void {
    const existingNoteIndex = this.notes().findIndex(n => n.id === note.id);
    if (existingNoteIndex !== -1) {
      const updatedNotes = [...this.notes()];
      updatedNotes[existingNoteIndex] = { ...note, modifyDate: new Date() };
      this.notes.set(updatedNotes);
    } else {
      this.notes.set([...this.notes(), { ...note, modifyDate: new Date() }]);
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.notes()));
  }

  getNotesFromLocalStorage(): Note[] {
    console.log('Fetching notes from local storage...');
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  }

  private getLatestNote(): Note {
    if (this.notes().length === 0) {
      return this.createNewNote();
    }
    return this.notes().reduce((latest, current) =>
      new Date(current.modifyDate || current.creationDate) > new Date(latest.modifyDate || latest.creationDate) ? current : latest
    );
  }

  createNewNote(): Note {
    const updatedNotes = this.notes().map(note => ({ ...note, isSelected: false }));
    const newNote: Note = {
      id: Date.now(),
      desc: '',
      creationDate: new Date(),
      modifyDate: new Date(),
      isSelected: true
    };
    updatedNotes.push(newNote);
    this.notes.set(updatedNotes);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedNotes));
    return newNote;
  }

  downloadCurrentNoteAsTxt() {
    const currentNote = this.note();
    if (!currentNote) {
      alert("No note selected to download.");
      return;
    }
  
    const noteContent = currentNote.desc;
    const noteTitle = `Note_${currentNote.id}.txt`;

    const blob = new Blob([noteContent], { type: 'text/plain' });
  
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = noteTitle;
  
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  
    console.log(`Downloaded: ${noteTitle}`);
  }
}