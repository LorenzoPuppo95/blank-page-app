import { Component, OnInit , effect } from '@angular/core';
import { Note } from '../../note';
import { StorageService } from '../../storage.service';
import { NoteCardComponent } from "../note-card/note-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule , NoteCardComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private storageService: StorageService) {
    effect(() => {
      console.log('Notes updated:', this.storageService.notes());
      this.notes = this.storageService.notes().sort((a, b) => {
        const dateA = new Date(a.modifyDate || a.creationDate).getTime();
        const dateB = new Date(b.modifyDate || b.creationDate).getTime();
        return dateB - dateA;
      });
    });
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes = this.storageService.getNotesFromLocalStorage().sort((a, b) => {
      const dateA = new Date(a.modifyDate || a.creationDate).getTime();
      const dateB = new Date(b.modifyDate || b.creationDate).getTime();
      return dateB - dateA;
    });
  }
}