import { Component, input } from '@angular/core';


@Component({
  selector: 'app-stats-conteiner',
  standalone: true,
  imports: [],
  templateUrl: './stats-conteiner-component.html',
  styleUrl: './stats-conteiner-component.css'
})
export class StatsConteinerComponent {

  stats = input<any>();
}

