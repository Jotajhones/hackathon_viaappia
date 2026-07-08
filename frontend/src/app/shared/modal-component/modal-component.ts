import { Component, inject } from '@angular/core';
import { ModalService } from '../../core/services/modal-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-component.html',
  styleUrls: ['./modal-component.css']
})
export class ModalComponent {

  modalService = inject(ModalService);
}