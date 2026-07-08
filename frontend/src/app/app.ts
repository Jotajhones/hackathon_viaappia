import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPage } from "./features/login-page/login-page";
import { ModalComponent } from "./shared/modal-component/modal-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPage, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
