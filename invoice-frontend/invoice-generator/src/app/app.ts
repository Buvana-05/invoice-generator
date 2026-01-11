import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // Include RouterModule here
  templateUrl: './app.html',
  styleUrls: ['./app.css' ] // Corrected the typo from 'styleUrl' to 'styleUrls'
})
export class App {
  protected readonly title = signal('invoice-generator');
}
