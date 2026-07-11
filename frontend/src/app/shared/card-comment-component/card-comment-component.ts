import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-comment-component',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-comment-component.html',
  styleUrl: './card-comment-component.css'
})
export class CardCommentComponent {

  comment = input<any>();
  dataAtual = input<Date>(new Date());
}