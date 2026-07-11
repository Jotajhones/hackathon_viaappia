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

  exibirErro(err: any, tituloPersonalizado?: string, mensagemPersonalizada?: string) {
    this.exibir({
      tipo: "erro",
      titulo: err.error?.type || tituloPersonalizado || "Erro",
      mensagem: err.error?.message || mensagemPersonalizada || "Ocorreu um erro inesperado."
    });
    console.error(err);
  }
}