import { Component } from '@angular/core';
import { EditorComponent } from "../../editor/editor.component";
import { CommonModule } from '@angular/common';
import { NoteListComponent } from "../note-list/note-list.component";
import { StatListComponent } from "../stat-list/stat-list.component";

@Component({
  selector: 'app-mainpage',
  imports: [CommonModule, EditorComponent, NoteListComponent, StatListComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {

}
