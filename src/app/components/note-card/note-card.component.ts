import { Component, Input } from '@angular/core';
import { Note } from '../../note';
import { CommonModule, DatePipe} from '@angular/common';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-note-card',
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})

export class NoteCardComponent {
  @Input() note!: Note;

  constructor(
    private storageService: StorageService,
    private datePipe: DatePipe
  ) {}

  getFormattedDate(date: any): string {
    if (!date) {
      return 'N/A';
    }
    const parsedDate = date instanceof Date ? date : new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'N/A';
    }
    return this.datePipe.transform(parsedDate, 'EEEE, dd/MM/yyyy, HH:mm:ss') || 'N/A';
    
    // const options: Intl.DateTimeFormatOptions = {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   timeZone: 'Europe/Rome'
    // };
    // return new Intl.DateTimeFormat('it-IT', options).format(parsedDate);
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
    const editorDiv = document.getElementById('editroia');
    if (editorDiv) {
      editorDiv.innerHTML = this.note.desc;
    }
    this.storageService.notes.update(notes => {
      return notes.map(n => ({ ...n, isSelected: n.id === this.note.id }));
    });
    this.storageService.note.update(note => ({ ...note, isSelected: true }));
  }
}