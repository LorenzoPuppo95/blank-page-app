import { Component, Input } from '@angular/core';
import { Note } from '../../note';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-note-card',
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() note!: Note;

  constructor(private storageService: StorageService) {}

  getFormattedDate(date: any): string {
    if (!date) {
      return 'N/A';
    }
    const parsedDate = date instanceof Date ? date : new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'N/A';
    }
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Rome'
    };
    return new Intl.DateTimeFormat('it-IT', options).format(parsedDate);
  }

  getTruncatedDescription(description: any): string {
    if (!description || typeof description !== 'string') {
      return '';
    }
    const words = description.split(' ');
    const truncated = words.slice(0, 5).join(' ');
    return truncated.length > 50 ? truncated.slice(0, 50) + '...' : truncated;
  }

  selectNote(): void {
    this.storageService.note.set(this.note);
  }
}