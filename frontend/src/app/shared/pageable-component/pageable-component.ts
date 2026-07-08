import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pageable-component',
  imports: [],
  templateUrl: './pageable-component.html',
  styleUrl: './pageable-component.css',
})
export class PageableComponent {

  paginaAtual = input<number>(0);
  totalPaginas = input<number>(0);
  totalItens = input<number>(0);
  mudarPagina = output<number>();

  proxima() {
    if (this.paginaAtual() < this.totalPaginas() - 1) {
      this.mudarPagina.emit(this.paginaAtual() + 1);
    }
  }

  anterior() {
    if (this.paginaAtual() > 0) {
      this.mudarPagina.emit(this.paginaAtual() - 1);
    }
  }

  irParaPagina(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let valor = parseInt(inputElement.value, 10);

    if (isNaN(valor)) {
      inputElement.value = (this.paginaAtual() + 1).toString();
      return;
    }

    if (valor < 1) valor = 1;
    if (valor > this.totalPaginas()) valor = this.totalPaginas();

    inputElement.value = valor.toString();

    if (valor - 1 !== this.paginaAtual()) {
      this.mudarPagina.emit(valor - 1);
    }
  }
}