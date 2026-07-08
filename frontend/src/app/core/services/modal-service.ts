import { Injectable, signal } from "@angular/core";
import { DataModal } from "../models/modal-model";

@Injectable({
  providedIn: 'root' // Torna o serviço global e exportável para qualquer lugar
})
export class ModalService {
  // Usando Angular Signals para controlar o estado (recurso moderno e limpo)
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