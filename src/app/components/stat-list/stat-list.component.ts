import { Component, Signal, signal, effect, OnInit, AfterViewInit } from '@angular/core';
import { Note } from '../../note';

@Component({
  selector: 'app-stat-list',
  imports: [],
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent implements AfterViewInit{
  characterCount: number = 0;
  wordCount: number = 0;
  noteCount: number = 0;

  constructor() {
    this.updateStats();
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  updateStats(): void {
    const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
    this.noteCount = notes.length;

    const currentNote = notes.find((note: Note) => note.isSelected);

    if (currentNote) {
      this.characterCount = currentNote.desc.length;
      this.wordCount = currentNote.desc.trim().split(/\s+/).length;
    } else {
      this.characterCount = 0;
      this.wordCount = 0;
    }
  }
}