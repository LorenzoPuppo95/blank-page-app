import { Component, inject, effect } from '@angular/core';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-stat-list',
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent {
  characterCount: number = 0;
  wordCount: number = 0;
  noteCount: number = 0;

  private service = inject(StorageService);

  constructor() {
    effect(() => {
      const currentNote = this.service.note();
      if (currentNote) {
        const text = currentNote.desc || '';
        this.characterCount = text.length;
        this.wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      } else {
        this.characterCount = 0;
        this.wordCount = 0;
      }
    });
  
    effect(() => {
      const notes = this.service.notes();
      this.noteCount = notes.length;
    });
  }
}