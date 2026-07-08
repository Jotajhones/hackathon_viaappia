export type TipoModal = 'sucesso' | 'erro' | 'aviso' | 'loading' 

export interface DataModal {
  tipo: TipoModal;
  titulo: string;
  mensagem: string;
}