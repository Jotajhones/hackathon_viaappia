import { Injectable, signal } from "@angular/core";
import { DataModal } from "../models/modal-model";

@Injectable({
  providedIn: 'root' 
})
export class ModalService {

  modalData = signal<DataModal | null>(null);
  isOpen = signal<boolean>(false);

  exibir(config: DataModal) {
    this.modalData.set(config);
    this.isOpen.set(true);
  }

  fechar() {
    this.isOpen.set(false);
    this.modalData.set(null);
  }
}