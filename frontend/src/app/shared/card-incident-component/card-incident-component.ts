import { Component, input, output } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { getAwaistTime } from '../../core/utils/tratamento-datas';
import { capitalize } from '../../core/utils/capitalize';

@Component({
  selector: 'app-card-incident-component',
  imports: [DatePipe, NgClass],
  templateUrl: './card-incident-component.html',
  styleUrl: './card-incident-component.css',
})
export class CardIncidentComponent {

  incident = input<any>(); 
  dataAtual = input<Date>(new Date());

  cardClick = output<any>();
  cardDoubleClick = output<string>();

  onClick() {
    const currentIncident = this.incident();
    if (currentIncident) {
      this.cardClick.emit(currentIncident);
    }
  }

  onDoubleClick() {
    const currentIncident = this.incident();
    if (currentIncident) {
      this.cardDoubleClick.emit(currentIncident.id);
    }
  }

  beautyTime(data: Date): string {
    return getAwaistTime(data);
  }

  beautyString(palavra: string): string {
    return capitalize(palavra);
  }
}