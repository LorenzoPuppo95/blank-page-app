import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from "./components/mainpage/mainpage.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MainpageComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'blank-page-app';
}
