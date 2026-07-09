import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar-component',
  imports: [ReactiveFormsModule],
  templateUrl: './searchbar-component.html',
  styleUrl: './searchbar-component.css',
})
export class SearchbarComponent {

  termoBuscado = output<string>(); 
  
  campoBusca = new FormControl('');
  
  onSearch() {
    const termo = this.campoBusca.value || '';
    
    this.termoBuscado.emit(termo);
  }
}
